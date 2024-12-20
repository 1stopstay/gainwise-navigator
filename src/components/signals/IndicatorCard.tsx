import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useSignals } from "@/hooks/useSignals";

type IndicatorCardProps = {
  name: string;
  value: number;
  status: string;
  type: "success" | "warning" | "danger" | "neutral";
  confidenceScore: number;
  isActive: boolean;
  onToggle: () => void;
};

const statusColors = {
  success: "text-green-400",
  warning: "text-yellow-400",
  danger: "text-red-400",
  neutral: "text-gray-400",
};

export const IndicatorCard = ({
  name,
  value,
  status,
  type,
  confidenceScore,
  isActive,
  onToggle,
}: IndicatorCardProps) => {
  const { updateSignal } = useSignals();

  const handleToggle = async () => {
    try {
      console.log(`Toggling ${name} indicator to ${!isActive}`);
      onToggle();
    } catch (error) {
      console.error(`Error toggling ${name} indicator:`, error);
    }
  };

  return (
    <Card className="glass-card p-4 glow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">{name}</h3>
        </div>
        <Switch 
          checked={isActive} 
          onCheckedChange={handleToggle}
          aria-label={`Toggle ${name} indicator`}
        />
      </div>
      <div className="mt-4">
        <p className={`text-sm ${statusColors[type]}`}>{status}</p>
        <p className="text-2xl font-mono mt-1">{value}</p>
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Confidence</span>
            <span>{confidenceScore}%</span>
          </div>
          <Progress value={confidenceScore} className="h-1" />
        </div>
      </div>
    </Card>
  );
};