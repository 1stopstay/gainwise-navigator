import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface ProfitTakingPoint {
  percentage: string;
  priceMultiple: string;
}

interface ProfitTakingPointsProps {
  points: ProfitTakingPoint[];
  onAddPoint: (point: ProfitTakingPoint) => void;
  disabled?: boolean;
}

export const ProfitTakingPoints = ({ points, onAddPoint, disabled }: ProfitTakingPointsProps) => {
  const handleAddPoint = () => {
    onAddPoint({
      percentage: "",
      priceMultiple: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Take Profits Along the Way</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddPoint}
          disabled={disabled}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Point
        </Button>
      </div>
      
      {points.map((point, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Sell Percentage</Label>
            <Input
              type="number"
              placeholder="e.g., 5"
              value={point.percentage}
              onChange={(e) => {
                const newPoints = [...points];
                newPoints[index].percentage = e.target.value;
                onAddPoint(newPoints[index]);
              }}
              className="bg-dark/50"
            />
          </div>
          <div className="space-y-2">
            <Label>Price Multiple (x)</Label>
            <Input
              type="number"
              placeholder="e.g., 1.5"
              value={point.priceMultiple}
              onChange={(e) => {
                const newPoints = [...points];
                newPoints[index].priceMultiple = e.target.value;
                onAddPoint(newPoints[index]);
              }}
              className="bg-dark/50"
            />
          </div>
        </div>
      ))}
    </div>
  );
};