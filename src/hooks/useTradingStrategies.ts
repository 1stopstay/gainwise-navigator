import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

type TradingStrategy = Database['public']['Tables']['trading_strategies']['Row'];
type NewTradingStrategy = Omit<TradingStrategy, 'id' | 'created_at' | 'updated_at'>;

interface CreateTradingStrategyInput {
  purchase_price: number;
  profit_goal: number;
  token_symbol: string;
}

export const useTradingStrategies = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['trading-strategies', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from('trading_strategies')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as TradingStrategy[];
    },
    enabled: !!userId,
  });
};

export const useCreateTradingStrategy = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (strategy: CreateTradingStrategyInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const newStrategy: NewTradingStrategy = {
        ...strategy,
        user_id: user.id,
      };
      
      const { data, error } = await supabase
        .from('trading_strategies')
        .insert(newStrategy)
        .select()
        .single();
        
      if (error) throw error;
      return data as TradingStrategy;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['trading-strategies', data.user_id] });
        toast({
          title: "Strategy Created",
          description: "Your trading strategy has been created successfully.",
        });
      }
    },
  });
};

export const useDeleteTradingStrategy = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('trading_strategies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['trading-strategies'] });
      toast({
        title: "Strategy Deleted",
        description: "Your trading strategy has been deleted successfully.",
      });
      console.log('Strategy deleted:', id);
    },
  });
};

export const useUpdateTradingStrategy = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (strategy: TradingStrategy) => {
      const { data, error } = await supabase
        .from('trading_strategies')
        .update({
          purchase_price: strategy.purchase_price,
          profit_goal: strategy.profit_goal,
          token_symbol: strategy.token_symbol,
          updated_at: new Date().toISOString(),
        })
        .eq('id', strategy.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['trading-strategies'] });
        toast({
          title: "Strategy Updated",
          description: "Your trading strategy has been updated successfully.",
        });
      }
    },
  });
};