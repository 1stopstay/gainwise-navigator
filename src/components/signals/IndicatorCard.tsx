import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

type IndicatorCardProps = {
  name: string;
  value: number;
  status: string;
  type: "success" | "warning" | "danger" | "neutral";
};

const statusColors = {
  success: "text-green-400",
  warning: "text-yellow-400",
  danger: "text-red-400",
  neutral: "text-gray-400",
};

export const IndicatorCard = ({ name, value, status, type }: IndicatorCardProps) => {
  return (
    <Card className="glass-card p-4 glow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">{name}</h3>
        </div>
        <Switch />
      </div>
      <div className="mt-4">
        <p className={`text-sm ${statusColors[type]}`}>{status}</p>
        <p className="text-2xl font-mono mt-1">{value}</p>
      </div>
    </Card>
  );
};