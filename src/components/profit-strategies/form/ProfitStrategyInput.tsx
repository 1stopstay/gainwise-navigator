import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfitStrategyInputProps {
  recoupSteps: string;
  profitStrategy: string;
  customProfitPercentage: string;
  targetMultiple: string;
  onRecoupStepsChange: (value: string) => void;
  onProfitStrategyChange: (value: string) => void;
  onCustomProfitPercentageChange: (value: string) => void;
  onTargetMultipleChange: (value: string) => void;
}

export const ProfitStrategyInput = ({
  recoupSteps,
  profitStrategy,
  customProfitPercentage,
  targetMultiple,
  onRecoupStepsChange,
  onProfitStrategyChange,
  onCustomProfitPercentageChange,
  onTargetMultipleChange,
}: ProfitStrategyInputProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Investment Recovery Steps</Label>
        <Select value={recoupSteps} onValueChange={onRecoupStepsChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select recovery steps" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">In 1 Step</SelectItem>
            <SelectItem value="2">In 2 Steps</SelectItem>
            <SelectItem value="3">In 3 Steps</SelectItem>
            <SelectItem value="4">In 4 Steps</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Profit Strategy</Label>
        <Select value={profitStrategy} onValueChange={onProfitStrategyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select profit strategy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recoup">Recoup Initial Investment Only</SelectItem>
            <SelectItem value="recoup10">Recoup + 10% Profit</SelectItem>
            <SelectItem value="recoup20">Recoup + 20% Profit</SelectItem>
            <SelectItem value="custom">Custom Profit Percentage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {profitStrategy === 'custom' && (
        <div className="space-y-2">
          <Label>Custom Profit Percentage</Label>
          <Input
            type="number"
            value={customProfitPercentage}
            onChange={(e) => onCustomProfitPercentageChange(e.target.value)}
            placeholder="Enter percentage"
            className="bg-dark/50"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          Target Multiple (X)
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Enter your target price multiple (e.g., 10 for 10x)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Input
          type="number"
          value={targetMultiple}
          onChange={(e) => onTargetMultipleChange(e.target.value)}
          placeholder="e.g., 10 for 10x"
          className="bg-dark/50"
        />
      </div>
    </div>
  );
};