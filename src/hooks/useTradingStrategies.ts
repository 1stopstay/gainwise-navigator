import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface TradingStrategy {
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
      return data;
    },
    enabled: !!userId,
  });
};

export const useCreateTradingStrategy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (strategy: TradingStrategy) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');
      
      const { data, error } = await supabase
        .from('trading_strategies')
        .insert({
          ...strategy,
          user_id: user.id,
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trading-strategies', data.user_id] });
    },
  });
};