import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useSignals } from "@/hooks/useSignals";
import { useToast } from "@/hooks/use-toast";

type IndicatorCardProps = {
  id: string;
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
  id,
  name,
  value,
  status,
  type,
  confidenceScore,
  isActive,
  onToggle,
}: IndicatorCardProps) => {
  const { updateSignal } = useSignals();
  const { toast } = useToast();

  const handleToggle = async () => {
    try {
      console.log(`Toggling ${name} indicator to ${!isActive}`);
      await updateSignal.mutateAsync({
        id,
        is_active: !isActive
      });
      onToggle();
      toast({
        title: `${name} indicator ${!isActive ? 'enabled' : 'disabled'}`,
        description: `The ${name} indicator has been ${!isActive ? 'enabled' : 'disabled'} successfully.`,
      });
    } catch (error) {
      console.error(`Error toggling ${name} indicator:`, error);
      toast({
        title: "Error",
        description: `Failed to toggle ${name} indicator. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="glass-card p-4 glow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Activity className="w-5 h-5 text-primary shrink-0" />
          <h3 className="font-semibold truncate">{name}</h3>
        </div>
        <Switch 
          checked={isActive} 
          onCheckedChange={handleToggle}
          aria-label={`Toggle ${name} indicator`}
          className="shrink-0"
        />
      </div>
      <div className="mt-4">
        <p className={`text-sm ${statusColors[type]} break-words`}>{status}</p>
        <p className="text-xl md:text-2xl font-mono mt-1">{value}</p>
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