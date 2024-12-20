import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PauseCircle, Pencil, Trash2 } from "lucide-react";
import { ProfitMilestones } from "./ProfitMilestones";

interface Strategy {
  id: string;
  token_symbol: string;
  purchase_price: number;
  profit_goal: number;
}

interface StrategyCardProps {
  strategy: Strategy;
  onDelete: (id: string) => void;
  onEdit: (strategy: Strategy) => void;
  onPause: (id: string) => void;
}

export const StrategyCard = ({
  strategy,
  onDelete,
  onEdit,
  onPause,
}: StrategyCardProps) => {
  return (
    <Card className="glass-card p-6 border-white/10 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{strategy.token_symbol}</h3>
          <p className="text-sm text-muted-foreground">
            Investment: ${strategy.purchase_price.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            Target: {strategy.profit_goal}x
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPause(strategy.id)}
            className="h-8 w-8"
          >
            <PauseCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(strategy)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(strategy.id)}
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ProfitMilestones 
        strategy={strategy}
        recoupInvestment={true}
        recoupSteps={4}
      />
    </Card>
  );
};