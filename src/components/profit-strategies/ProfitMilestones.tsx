import { Card } from "@/components/ui/card";
import { ExternalLink, AlertCircle, ChevronDown, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { calculateTokensToSell, calculateTargetX, TokenInvestment } from "@/utils/profitCalculations";
import { MilestoneHeader } from "./milestone-components/MilestoneHeader";
import { MilestoneTable } from "./milestone-components/MilestoneTable";

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
    let remainingTokens = 100; // Start with 100% of tokens
    let totalProfit = 0;
    
    const investment: TokenInvestment = {
      tokenCost: strategy.purchase_price / 100, // Convert to per-token cost
      numberOfTokens: 100, // Using percentages
      profitStrategy: "recoup",
      recoupSteps,
      targetMultiple: strategy.profit_goal,
    };

    if (recoupInvestment) {
      for (let step = 1; step <= recoupSteps; step++) {
        const { tokensToSell, remainingTokens: newRemaining, profitAtStep } = calculateTokensToSell(investment, step);
        remainingTokens = newRemaining;
        totalProfit += profitAtStep;
        
        const priceMultiple = Math.pow(2, step);
        milestones.push({
          step,
          priceMultiple: `${priceMultiple}x`,
          sellPercentage: tokensToSell.toFixed(1),
          remainingTokens: remainingTokens.toFixed(1),
          profitUSD: totalProfit.toFixed(2),
          sellAmount: (strategy.purchase_price * tokensToSell / 100 * priceMultiple).toFixed(2),
          targetPrice: (strategy.purchase_price / 100 * priceMultiple).toFixed(2),
        });
      }
    }

    // Final target X milestone with projected profit and percentage
    if (remainingTokens > 0) {
      const { targetPrice, futureValue, projectedProfit, profitPercentage } = calculateTargetX(investment, remainingTokens);
      totalProfit += projectedProfit;
      
      milestones.push({
        step: milestones.length + 1,
        priceMultiple: `${strategy.profit_goal}x`,
        sellPercentage: remainingTokens.toFixed(1),
        remainingTokens: "0.0",
        profitUSD: totalProfit.toFixed(2),
        sellAmount: futureValue.toFixed(2),
        targetPrice: targetPrice.toFixed(2),
        projectedProfit: projectedProfit.toFixed(2),
        profitPercentage: profitPercentage.toFixed(2),
      });
    }

    return milestones;
  };

  const getTradingPlatformUrl = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case 'BTC':
      case 'ETH':
        return 'https://www.binance.com/en/trade';
      case 'SOL':
        return 'https://raydium.io/swap';
      default:
        return 'https://www.binance.com/en/trade';
    }
  };

  const milestones = calculateMilestones();
  const nextMilestone = milestones[0];
  const finalMilestone = milestones[milestones.length - 1];
  const progress = Math.min((strategy.purchase_price / (strategy.purchase_price * strategy.profit_goal)) * 100, 100);

  return (
    <Card className="glass-card p-6 border-white/10">
      <div className="space-y-6">
        <MilestoneHeader 
          tokenSymbol={strategy.token_symbol}
          purchasePrice={strategy.purchase_price}
          profitGoal={strategy.profit_goal}
        />

        {/* Progress bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">{progress.toFixed(1)}% to target</p>
        </div>

        {/* Next Milestone Alert */}
        {nextMilestone && (
          <Alert className="bg-primary/10 border-primary">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Next Milestone</AlertTitle>
            <AlertDescription className="font-semibold">
              Sell {nextMilestone.sellPercentage}% when {strategy.token_symbol} reaches ${nextMilestone.targetPrice} (${nextMilestone.sellAmount})
            </AlertDescription>
          </Alert>
        )}

        {/* Projected Outcome */}
        {finalMilestone && finalMilestone.projectedProfit && (
          <div className="flex items-center gap-2 text-primary">
            <BarChart3 className="h-4 w-4" />
            <span>
              Projected Profit: ${finalMilestone.projectedProfit} ({finalMilestone.profitPercentage}% return)
            </span>
          </div>
        )}

        {/* Expandable Strategy Steps */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
            <ChevronDown className="h-4 w-4" />
            View Step-by-Step Strategy
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <MilestoneTable milestones={milestones} />
          </CollapsibleContent>
        </Collapsible>

        {/* Trade Button */}
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
