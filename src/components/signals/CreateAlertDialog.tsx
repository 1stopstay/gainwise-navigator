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
import { Bell, Coins, LineChart, Mail, BellRing } from "lucide-react";
import { Slider } from "@/components/ui/slider";

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
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
  });
  const [frequency, setFrequency] = useState("5min");

  const handleSubmit = async () => {
    await createAlert.mutateAsync({
      name,
      symbol: symbol.toUpperCase(),
      indicator,
      condition,
      value: Number(value),
      is_active: isEnabled,
      notification_preferences: notificationPreferences,
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

  const getAlertPreview = () => {
    if (!symbol || !indicator) return null;
    
    const previewText = `We'll notify you when ${symbol.toUpperCase()} ${
      condition === "ABOVE" ? "goes above" : "falls below"
    } ${value || "your target"}`;
    
    return previewText;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            Track Your Tokens & Get Alerts
          </DialogTitle>
          <p className="text-gray-400 mt-2">
            Get real-time updates about your favorite coins
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Token Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-primary" />
              <Label className="text-lg font-medium">Select Token</Label>
            </div>
            <Input
              placeholder="Enter token symbol (e.g., BTC, ETH)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="bg-background/50"
            />
          </div>

          {/* Alert Type */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary" />
              <Label className="text-lg font-medium">What do you want to track?</Label>
            </div>
            <Select value={indicator} onValueChange={setIndicator}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Choose tracking type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRICE_UP">Price Up</SelectItem>
                <SelectItem value="PRICE_DOWN">Price Down</SelectItem>
                <SelectItem value="BULLISH">Bullish Signal</SelectItem>
                <SelectItem value="BEARISH">Bearish Signal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Threshold */}
          {(indicator === "PRICE_UP" || indicator === "PRICE_DOWN") && (
            <div className="space-y-4">
              <Label className="text-lg font-medium">Set Price Target</Label>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Enter target price"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-background/50"
                />
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  className="mt-2"
                  onValueChange={(vals) => setValue(String(vals[0]))}
                />
              </div>
            </div>
          )}

          {/* Notification Preferences */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-primary" />
              <Label className="text-lg font-medium">How should we alert you?</Label>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <Label>Email Notifications</Label>
                </div>
                <Switch
                  checked={notificationPreferences.email}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences((prev) => ({ ...prev, email: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  <Label>Push Notifications</Label>
                </div>
                <Switch
                  checked={notificationPreferences.push}
                  onCheckedChange={(checked) =>
                    setNotificationPreferences((prev) => ({ ...prev, push: checked }))
                  }
                />
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-4">
            <Label className="text-lg font-medium">Update Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
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

          {/* Preview */}
          {getAlertPreview() && (
            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h3 className="font-medium mb-2">Preview</h3>
              <p className="text-sm text-gray-400">{getAlertPreview()}</p>
            </div>
          )}

          <Button 
            className="w-full" 
            onClick={handleSubmit}
            disabled={createAlert.isPending || !symbol || !indicator}
          >
            {createAlert.isPending ? "Creating..." : "Start Tracking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};