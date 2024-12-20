import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

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
      }
    },
  });
};