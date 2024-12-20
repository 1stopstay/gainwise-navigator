import { ExternalLink, DollarSign, Target } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface StrategyHeaderProps {
  strategy: {
    token_symbol: string;
    purchase_price: number;
    profit_goal: number;
  };
  progress: number;
  onTradeClick: () => void;
}

export const StrategyHeader = ({ strategy, progress, onTradeClick }: StrategyHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-semibold">{strategy.token_symbol}</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-2">
            <span>${strategy.purchase_price.toLocaleString()}</span>
          </div>
          <span className="text-muted-foreground">|</span>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span>{strategy.profit_goal}x</span>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ExternalLink 
                className="h-4 w-4 text-muted-foreground cursor-pointer" 
                onClick={onTradeClick}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to trade on exchange</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground text-right">{progress.toFixed(1)}% to target</p>
      </div>
    </div>
  );
};