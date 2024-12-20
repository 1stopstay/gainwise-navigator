import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PauseCircle, Pencil, Trash2 } from "lucide-react";
import { ProfitMilestones } from "./ProfitMilestones";
import { useDeleteTradingStrategy, useUpdateTradingStrategy } from "@/hooks/useTradingStrategies";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

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
  onEdit,
  onPause,
}: StrategyCardProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const deleteStrategy = useDeleteTradingStrategy();
  const updateStrategy = useUpdateTradingStrategy();

  const handleDelete = async () => {
    try {
      await deleteStrategy.mutateAsync(strategy.id);
      setShowDeleteAlert(false);
    } catch (error) {
      console.error('Error deleting strategy:', error);
    }
  };

  const handleEdit = () => {
    onEdit(strategy);
  };

  const handlePause = async () => {
    try {
      await updateStrategy.mutateAsync({
        ...strategy,
        status: 'paused',
      } as any);
      onPause(strategy.id);
    } catch (error) {
      console.error('Error pausing strategy:', error);
    }
  };

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
            onClick={handlePause}
            className="h-8 w-8"
          >
            <PauseCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEdit}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Strategy</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this strategy? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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