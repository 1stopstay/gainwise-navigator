import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfitMilestonesProps {
  strategy: {
    purchase_price: number;
    profit_goal: number;
    token_symbol: string;
  };
  recoupInvestment?: boolean;
  recoupSteps?: number;
}

export const ProfitMilestones = ({ strategy, recoupInvestment = false, recoupSteps = 4 }: ProfitMilestonesProps) => {
  const calculateMilestones = () => {
    const milestones = [];
    let remainingTokens = 100;
    
    if (recoupInvestment) {
      const sellPerStep = 100 / recoupSteps;
      for (let i = 1; i <= recoupSteps; i++) {
        const priceMultiple = Math.pow(2, i);
        remainingTokens -= sellPerStep;
        milestones.push({
          step: i,
          priceMultiple: `${priceMultiple}x`,
          sellPercentage: sellPerStep.toFixed(1),
          remainingTokens: remainingTokens.toFixed(1),
        });
      }
    }

    // Final profit goal milestone
    if (remainingTokens > 0) {
      milestones.push({
        step: milestones.length + 1,
        priceMultiple: `${strategy.profit_goal}x`,
        sellPercentage: remainingTokens.toFixed(1),
        remainingTokens: "0.0",
      });
    }

    return milestones;
  };

  const milestones = calculateMilestones();

  return (
    <Card className="glass-card p-6 border-white/10">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profit Milestones</h3>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Step</TableHead>
              <TableHead>Price Multiple</TableHead>
              <TableHead>Sell %</TableHead>
              <TableHead>Remaining Tokens %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((milestone) => (
              <TableRow key={milestone.step}>
                <TableCell>{milestone.step}</TableCell>
                <TableCell>{milestone.priceMultiple}</TableCell>
                <TableCell>{milestone.sellPercentage}%</TableCell>
                <TableCell>{milestone.remainingTokens}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" className="space-x-2">
            <span>Trade on Binance</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};