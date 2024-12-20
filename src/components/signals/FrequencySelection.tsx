import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FrequencySelectionProps {
  frequency: string;
  onFrequencyChange: (value: string) => void;
}

export const FrequencySelection = ({ frequency, onFrequencyChange }: FrequencySelectionProps) => {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium">Update Frequency</Label>
      <Select value={frequency} onValueChange={onFrequencyChange}>
        <SelectTrigger className="bg-background/50">
          <SelectValue placeholder="Select frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5min">Every 5 Minutes</SelectItem>
          <SelectItem value="15min">Every 15 Minutes</SelectItem>
          <SelectItem value="1h">Hourly</SelectItem>
          <SelectItem value="1d">Daily</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};