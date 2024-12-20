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
      <div className="text-center text-gray-400 py-4">
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
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm">
                  {alert.name} - {alert.indicator} {alert.condition} {alert.value}
                </p>
                <p
                  className={`text-xs ${
                    alert.is_active ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {alert.is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleEdit(alert)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
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