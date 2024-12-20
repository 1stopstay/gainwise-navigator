import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAlerts } from "@/hooks/useAlerts";
import { Slider } from "@/components/ui/slider";
import { TrendSelection } from "./TrendSelection";
import { NotificationPreferences } from "./NotificationPreferences";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertFormHeader } from "./AlertFormHeader";
import { TokenSelection } from "./TokenSelection";
import { AlertPreview } from "./AlertPreview";
import { FrequencySelection } from "./FrequencySelection";

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="glass-card max-w-lg h-[90vh] flex flex-col overflow-hidden"
        aria-describedby="alert-dialog-description"
      >
        <AlertFormHeader />

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {/* Token Selection */}
            <TokenSelection symbol={symbol} onSymbolChange={setSymbol} />

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
            <FrequencySelection 
              frequency={frequency}
              onFrequencyChange={setFrequency}
            />

            {/* Preview */}
            <AlertPreview 
              symbol={symbol}
              selectedTrends={selectedTrends}
              value={value}
            />
          </div>
        </ScrollArea>

        <div className="mt-6 pt-4 border-t border-gray-800 flex-shrink-0">
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