import { Card } from "@/components/ui/card";
import { History } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type TradingStrategy = Database["public"]["Tables"]["trading_strategies"]["Row"];

interface StrategyHistoryProps {
  strategies: TradingStrategy[];
}

export const StrategyHistory = ({ strategies }: StrategyHistoryProps) => {
  const calculateCurrentProfit = (purchasePrice: number) => {
    const mockCurrentPrice = purchasePrice * 1.15;
    return ((mockCurrentPrice - purchasePrice) / purchasePrice) * 100;
  };

  return (
    <Card className="glass-card p-6 border-white/10">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-bold">Strategy History</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-white/10">
              <th className="pb-4">Token</th>
              <th className="pb-4">Created</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Profit</th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy) => (
              <tr key={strategy.id} className="border-b border-white/5">
                <td className="py-4">{strategy.token_symbol}</td>
                <td className="py-4">
                  {new Date(strategy.created_at).toLocaleDateString()}
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-sm">
                    Active
                  </span>
                </td>
                <td className="py-4 text-green-400">
                  +{calculateCurrentProfit(Number(strategy.purchase_price)).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};