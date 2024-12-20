import { Bell, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAlerts } from "@/hooks/useAlerts";
import { useState } from "react";
import { CreateAlertDialog } from "./CreateAlertDialog";
import { Alert } from "@/hooks/useAlerts";

export const AlertsList = () => {
  const { alerts, deleteAlert } = useAlerts();
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);

  if (!alerts?.length) {
    return (
      <div className="text-center text-gray-400 py-4 text-sm md:text-base">
        No alerts yet. Create one to get started!
      </div>
    );
  }

  const handleEdit = (alert: Alert) => {
    console.log('Editing alert:', alert);
    setEditingAlert(alert);
  };

  const handleEditComplete = () => {
    setEditingAlert(null);
  };

  return (
    <>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white/5 gap-3"
          >
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-sm break-words">
                  {alert.name} - {alert.indicator} {alert.condition} {alert.value}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    alert.is_active ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {alert.is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
            <div className="flex gap-2 ml-8 sm:ml-0">
              <Button 
                variant="outline" 
                size="icon"
                className="h-9 w-9"
                onClick={() => handleEdit(alert)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="h-9 w-9"
                onClick={() => deleteAlert.mutate(alert.id)}
                disabled={deleteAlert.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreateAlertDialog
        open={!!editingAlert}
        onOpenChange={(open) => !open && setEditingAlert(null)}
        editingAlert={editingAlert}
        onEditComplete={handleEditComplete}
      />
    </>
  );
};