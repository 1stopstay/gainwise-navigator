import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { useToast } from '@/components/ui/use-toast';

type TradingStrategy = Database['public']['Tables']['trading_strategies']['Row'];
type CreateTradingStrategyInput = {
  purchase_price: number;
  profit_goal: number;
  token_symbol: string;
};

export const useTradingStrategies = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['trading-strategies', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      console.log('Fetching trading strategies for user:', userId);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No session found');
      }

      const response = await supabase.functions.invoke('trading-strategies', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: { user_id: userId } // Changed to use body instead of queryParams
      });

      if (response.error) {
        throw response.error;
      }

      console.log('Fetched strategies:', response.data);
      return response.data as TradingStrategy[];
    },
    enabled: !!userId,
  });
};

export const useCreateTradingStrategy = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (strategy: CreateTradingStrategyInput) => {
      console.log('Creating trading strategy:', strategy);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const response = await supabase.functions.invoke('trading-strategies', {
        method: 'POST',
        body: {
          ...strategy,
          user_id: user.id,
        },
      });

      if (response.error) {
        throw response.error;
      }

      return response.data as TradingStrategy;
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
      console.log('Deleting trading strategy:', id);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const response = await supabase.functions.invoke('trading-strategies', {
        method: 'DELETE',
        body: { id, user_id: user.id },
      });

      if (response.error) {
        throw response.error;
      }

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
      console.log('Updating trading strategy:', strategy);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const response = await supabase.functions.invoke('trading-strategies', {
        method: 'PUT',
        body: { ...strategy, user_id: user.id },
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
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