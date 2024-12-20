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
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-primary" />
        <span className="font-semibold">{tokenSymbol}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>${purchasePrice.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <Target className="h-4 w-4 text-primary" />
        <span>{profitGoal}x</span>
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