import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LineChart } from "lucide-react";

interface TrendSelectionProps {
  selectedTrends: string[];
  onTrendChange: (trends: string[]) => void;
}

export const TrendSelection = ({
  selectedTrends = [],
  onTrendChange,
}: TrendSelectionProps) => {
  const handleTrendChange = (trend: string, checked: boolean) => {
    if (checked) {
      onTrendChange([...selectedTrends, trend]);
    } else {
      onTrendChange(selectedTrends.filter((t) => t !== trend));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LineChart className="w-5 h-5 text-primary" />
        <Label className="text-lg font-medium">What do you want to track?</Label>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="price-up"
            checked={selectedTrends.includes("PRICE_UP")}
            onCheckedChange={(checked) =>
              handleTrendChange("PRICE_UP", checked as boolean)
            }
          />
          <Label htmlFor="price-up">Price Up</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="price-down"
            checked={selectedTrends.includes("PRICE_DOWN")}
            onCheckedChange={(checked) =>
              handleTrendChange("PRICE_DOWN", checked as boolean)
            }
          />
          <Label htmlFor="price-down">Price Down</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="bullish"
            checked={selectedTrends.includes("BULLISH")}
            onCheckedChange={(checked) =>
              handleTrendChange("BULLISH", checked as boolean)
            }
          />
          <Label htmlFor="bullish">Bullish Signal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="bearish"
            checked={selectedTrends.includes("BEARISH")}
            onCheckedChange={(checked) =>
              handleTrendChange("BEARISH", checked as boolean)
            }
          />
          <Label htmlFor="bearish">Bearish Signal</Label>
        </div>
      </div>
    </div>
  );
};