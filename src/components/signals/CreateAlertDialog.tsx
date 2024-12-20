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
  const [indicator, setIndicator] = useState("");
  const [condition, setCondition] = useState("");
  const [value, setValue] = useState<number>(0);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
  });

  // Load editing alert data
  useEffect(() => {
    if (editingAlert) {
      setSymbol(editingAlert.symbol);
      setIndicator(editingAlert.indicator);
      setCondition(editingAlert.condition);
      setValue(editingAlert.value);
      setNotificationPreferences(editingAlert.notification_preferences);
    }
  }, [editingAlert]);

  const handleSubmit = async () => {
    try {
      const alertData = {
        symbol,
        indicator,
        condition,
        value,
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
      setIndicator("");
      setCondition("");
      setValue(0);
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
      <DialogContent>
        <AlertFormHeader
          onSubmit={handleSubmit}
          onCancel={() => {
            onOpenChange(false);
            setSymbol("");
            setIndicator("");
            setCondition("");
            setValue(0);
            setNotificationPreferences({ email: true, push: true });
          }}
        />
        <TokenSelection symbol={symbol} setSymbol={setSymbol} />
        <TrendSelection
          indicator={indicator}
          setIndicator={setIndicator}
          condition={condition}
          setCondition={setCondition}
          value={value}
          setValue={setValue}
        />
        <NotificationPreferences
          preferences={notificationPreferences}
          setPreferences={setNotificationPreferences}
        />
        <AlertPreview
          symbol={symbol}
          indicator={indicator}
          condition={condition}
          value={value}
        />
      </DialogContent>
    </Dialog>
  );
};
