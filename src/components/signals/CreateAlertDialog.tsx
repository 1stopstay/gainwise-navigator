import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAlerts } from "@/hooks/useAlerts";

type CreateAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateAlertDialog = ({
  open,
  onOpenChange,
}: CreateAlertDialogProps) => {
  const { createAlert } = useAlerts();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [indicator, setIndicator] = useState("");
  const [condition, setCondition] = useState("");
  const [value, setValue] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);

  const handleSubmit = async () => {
    await createAlert.mutateAsync({
      name,
      symbol: symbol.toUpperCase(),
      indicator,
      condition,
      value: Number(value),
      is_active: isEnabled,
      notification_preferences: {
        email: true,
        push: true,
      },
    });
    
    onOpenChange(false);
    // Reset form
    setName("");
    setSymbol("");
    setIndicator("");
    setCondition("");
    setValue("");
    setIsEnabled(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle>Create New Alert</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Alert Name</Label>
            <Input
              placeholder="Enter alert name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Token Symbol</Label>
            <Input
              placeholder="Enter token symbol (e.g., BTC)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
          </div>
          <div className="space-y-2">
            <Label>Indicator</Label>
            <Select value={indicator} onValueChange={setIndicator}>
              <SelectTrigger>
                <SelectValue placeholder="Select indicator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RSI">RSI</SelectItem>
                <SelectItem value="MACD">MACD</SelectItem>
                <SelectItem value="BOLLINGER_BANDS">Bollinger Bands</SelectItem>
                <SelectItem value="EMA">EMA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ABOVE">Above</SelectItem>
                <SelectItem value="BELOW">Below</SelectItem>
                <SelectItem value="CROSS_ABOVE">Crosses Above</SelectItem>
                <SelectItem value="CROSS_BELOW">Crosses Below</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Value</Label>
            <Input
              type="number"
              placeholder="Enter threshold value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable Alert</Label>
            <Switch
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={createAlert.isPending || !name || !indicator || !condition || !value || !symbol}
          >
            {createAlert.isPending ? "Creating..." : "Create Alert"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};