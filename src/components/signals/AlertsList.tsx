import { Bell, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: 1,
    indicator: "RSI",
    condition: "Above",
    value: 70,
    status: "Active",
  },
  {
    id: 2,
    indicator: "MACD",
    condition: "Crossover",
    value: 0,
    status: "Triggered",
  },
];

export const AlertsList = () => {
  return (
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
                {alert.indicator} {alert.condition} {alert.value}
              </p>
              <p
                className={`text-xs ${
                  alert.status === "Triggered"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {alert.status}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};