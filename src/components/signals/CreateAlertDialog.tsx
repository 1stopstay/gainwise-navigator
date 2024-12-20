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
import { useAlerts } from "@/hooks/useAlerts";
import { Bell, Coins } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { TrendSelection } from "./TrendSelection";
import { NotificationPreferences } from "./NotificationPreferences";

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
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
  });
  const [frequency, setFrequency] = useState("5min");

  const handleSubmit = async () => {
    // Create an alert for each selected trend
    await Promise.all(
      selectedTrends.map((trend) =>
        createAlert.mutateAsync({
          name,
          symbol: symbol.toUpperCase(),
          indicator: trend,
          condition: trend.includes("UP") || trend === "BULLISH" ? "ABOVE" : "BELOW",
          value: Number(value),
          is_active: isEnabled,
          notification_preferences: notificationPreferences,
        })
      )
    );
    
    onOpenChange(false);
    // Reset form
    setName("");
    setSymbol("");
    setSelectedTrends([]);
    setValue("");
    setIsEnabled(true);
  };

  const getAlertPreview = () => {
    if (!symbol || selectedTrends.length === 0) return null;
    
    const trendDescriptions = selectedTrends.map(trend => {
      const direction = trend.includes("UP") || trend === "BULLISH" ? "goes up" : "goes down";
      return `${symbol.toUpperCase()} ${direction}${value ? ` past ${value}` : ''}`;
    });
    
    return `We'll notify you when ${trendDescriptions.join(" or ")}`;
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

          {/* Trend Selection */}
          <TrendSelection
            selectedTrends={selectedTrends}
            onTrendChange={setSelectedTrends}
          />

          {/* Threshold */}
          {selectedTrends.some(trend => 
            trend === "PRICE_UP" || trend === "PRICE_DOWN"
          ) && (
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
          <NotificationPreferences
            preferences={notificationPreferences}
            onPreferencesChange={setNotificationPreferences}
          />

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
            disabled={createAlert.isPending || !symbol || selectedTrends.length === 0}
          >
            {createAlert.isPending ? "Creating..." : "Start Tracking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};