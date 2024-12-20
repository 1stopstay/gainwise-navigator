import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, PauseCircle, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type TradingStrategy = Database["public"]["Tables"]["trading_strategies"]["Row"];

interface StrategyCardProps {
  strategy: TradingStrategy;
  onDelete?: (id: string) => void;
  onEdit?: (strategy: TradingStrategy) => void;
  onPause?: (id: string) => void;
}

export const StrategyCard = ({ strategy, onDelete, onEdit, onPause }: StrategyCardProps) => {
  // Simulated current profit calculation
  const calculateCurrentProfit = (purchasePrice: number) => {
    const mockCurrentPrice = purchasePrice * 1.15; // Simulating 15% increase
    return ((mockCurrentPrice - purchasePrice) / purchasePrice) * 100;
  };

  const profit = calculateCurrentProfit(Number(strategy.purchase_price));
  const isPositive = profit > 0;
  const progress = Math.min((profit / Number(strategy.profit_goal)) * 100, 100);

  return (
    <Card className={cn(
      "glass-card p-6 border-white/10",
      "hover:border-primary/30 transition-all duration-300",
      "group"
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <ArrowUpRight className="w-6 h-6 text-primary" />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-yellow-400"
            onClick={() => onPause?.(strategy.id)}
          >
            <PauseCircle className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-blue-400"
            onClick={() => onEdit?.(strategy)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-400 hover:text-red-400"
            onClick={() => onDelete?.(strategy.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2">{strategy.token_symbol}</h3>
      
      <div className="space-y-4">
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex justify-between">
            <span>Purchase Price:</span>
            <span className="font-medium text-white">
              ${Number(strategy.purchase_price).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Profit Goal:</span>
            <span className="font-medium text-white">
              {Number(strategy.profit_goal)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Current Profit:</span>
            <span className={cn(
              "flex items-center gap-1 font-medium",
              isPositive ? "text-green-400" : "text-red-400"
            )}>
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {Math.abs(profit).toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>
    </Card>
  );
};