import { DollarSign, Target, ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MilestoneHeaderProps {
  tokenSymbol: string;
  purchasePrice: number;
  profitGoal: number;
}

export const MilestoneHeader = ({ tokenSymbol, purchasePrice, profitGoal }: MilestoneHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="font-semibold">{tokenSymbol}</span>
        </div>
        <span className="text-muted-foreground">|</span>
        <div className="flex items-center gap-2">
          <span>${purchasePrice.toLocaleString()}</span>
        </div>
        <span className="text-muted-foreground">|</span>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Target className="h-4 w-4 text-primary" />
          <span>{profitGoal}x</span>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to trade on exchange</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};