import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Alert } from "@/hooks/useAlerts";
import { AlertFormHeader } from "./AlertFormHeader";
import { TokenSelection } from "./TokenSelection";
import { TrendSelection } from "./TrendSelection";
import { NotificationPreferences } from "./NotificationPreferences";
import { AlertPreview } from "./AlertPreview";
import { useAlerts } from "@/hooks/useAlerts";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreateAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingAlert?: Alert | null;
  onEditComplete?: () => void;
}

export const CreateAlertDialog = ({
  open,
  onOpenChange,
  editingAlert,
  onEditComplete,
}: CreateAlertDialogProps) => {
  const { createAlert, updateAlert } = useAlerts();
  const { toast } = useToast();
  const [symbol, setSymbol] = useState("");
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
  });

  // Load editing alert data
  useEffect(() => {
    if (editingAlert) {
      setSymbol(editingAlert.symbol);
      setSelectedTrends([editingAlert.indicator]);
      setValue(editingAlert.value.toString());
      setNotificationPreferences(editingAlert.notification_preferences);
    }
  }, [editingAlert]);

  const handleSubmit = async () => {
    try {
      const alertData = {
        symbol,
        name: `${symbol} Alert`,
        is_active: true,
        indicator: selectedTrends[0] || "",
        condition: "ABOVE",
        value: parseFloat(value) || 0,
        notification_preferences: notificationPreferences,
      };

      if (editingAlert) {
        await updateAlert.mutateAsync({
          id: editingAlert.id,
          ...alertData,
        });
        toast({
          title: "Alert Updated",
          description: "Your alert has been updated successfully.",
        });
        onEditComplete?.();
      } else {
        await createAlert.mutateAsync(alertData);
        toast({
          title: "Alert Created",
          description: "Your alert has been created successfully.",
        });
      }

      onOpenChange(false);
      // Reset form
      setSymbol("");
      setSelectedTrends([]);
      setValue("");
      setNotificationPreferences({ email: true, push: true });
    } catch (error) {
      console.error("Error saving alert:", error);
      toast({
        title: "Error",
        description: "There was an error saving your alert. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0">
        <AlertFormHeader
          title={editingAlert ? "Edit Alert" : "Create Alert"}
          description="Set up your alert preferences"
        />
        <ScrollArea className="p-6 max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            <TokenSelection symbol={symbol} onSymbolChange={setSymbol} />
            <TrendSelection
              selectedTrends={selectedTrends}
              onTrendChange={setSelectedTrends}
            />
            <NotificationPreferences
              preferences={notificationPreferences}
              onPreferencesChange={setNotificationPreferences}
            />
            <AlertPreview
              symbol={symbol}
              selectedTrends={selectedTrends}
              value={value}
            />
            <Button 
              onClick={handleSubmit} 
              className="w-full"
              disabled={!symbol || selectedTrends.length === 0}
            >
              Start Tracking
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};