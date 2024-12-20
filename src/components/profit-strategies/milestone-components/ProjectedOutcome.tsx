import { BarChart3 } from "lucide-react";

interface ProjectedOutcomeProps {
  projectedProfit: string;
  profitPercentage: string;
}

export const ProjectedOutcome = ({ projectedProfit, profitPercentage }: ProjectedOutcomeProps) => {
  return (
    <div className="flex items-center gap-2 text-primary">
      <BarChart3 className="h-4 w-4" />
      <span>
        Projected Profit: ${projectedProfit} ({profitPercentage}% return)
      </span>
    </div>
  );
};