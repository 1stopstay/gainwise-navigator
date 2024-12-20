import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NextMilestoneProps {
  milestone: {
    sellPercentage: string;
    targetPrice: string;
    sellAmount: string;
  };
}

export const NextMilestone = ({ milestone }: NextMilestoneProps) => {
  return (
    <Alert className="bg-primary/10 border-primary">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Next Milestone</AlertTitle>
      <AlertDescription className="font-semibold">
        Sell {milestone.sellPercentage}% when price reaches ${milestone.targetPrice} (${milestone.sellAmount})
      </AlertDescription>
    </Alert>
  );
};