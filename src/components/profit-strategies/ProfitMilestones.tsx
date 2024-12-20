import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    let totalProfit = 0;
    
    if (recoupInvestment) {
      const sellPerStep = 100 / recoupSteps;
      for (let i = 1; i <= recoupSteps; i++) {
        const priceMultiple = Math.pow(2, i);
        const sellAmount = sellPerStep;
        remainingTokens -= sellAmount;
        totalProfit += (strategy.purchase_price * sellAmount / 100) * priceMultiple;
        
        milestones.push({
          step: i,
          priceMultiple: `${priceMultiple}x`,
          sellPercentage: sellAmount.toFixed(1),
          remainingTokens: remainingTokens.toFixed(1),
          profitUSD: totalProfit.toFixed(2),
        });
      }
    }

    // Final profit goal milestone
    if (remainingTokens > 0) {
      totalProfit += (strategy.purchase_price * remainingTokens / 100) * strategy.profit_goal;
      milestones.push({
        step: milestones.length + 1,
        priceMultiple: `${strategy.profit_goal}x`,
        sellPercentage: remainingTokens.toFixed(1),
        remainingTokens: "0.0",
        profitUSD: totalProfit.toFixed(2),
      });
    }

    return milestones;
  };

  const milestones = calculateMilestones();
  const getTradingPlatformUrl = (symbol: string) => {
    switch (symbol) {
      case 'BTC':
      case 'ETH':
        return 'https://www.binance.com/en/trade';
      case 'SOL':
        return 'https://raydium.io/swap';
      default:
        return 'https://www.binance.com/en/trade';
    }
  };

  return (
    <Card className="glass-card p-6 border-white/10">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Profit Milestones</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Click the trade button to execute your strategy on an exchange</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Step</TableHead>
              <TableHead>Price Multiple</TableHead>
              <TableHead>Sell %</TableHead>
              <TableHead>Remaining %</TableHead>
              <TableHead>Total Profit ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((milestone) => (
              <TableRow key={milestone.step}>
                <TableCell>{milestone.step}</TableCell>
                <TableCell>{milestone.priceMultiple}</TableCell>
                <TableCell>{milestone.sellPercentage}%</TableCell>
                <TableCell>{milestone.remainingTokens}%</TableCell>
                <TableCell>${milestone.profitUSD}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end space-x-4 mt-4">
          <Button 
            variant="outline" 
            className="space-x-2"
            onClick={() => window.open(getTradingPlatformUrl(strategy.token_symbol), '_blank')}
          >
            <span>Trade {strategy.token_symbol}</span>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};