import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StrategyHeader } from "./milestone-components/StrategyHeader";
import { NextMilestone } from "./milestone-components/NextMilestone";
import { ProjectedOutcome } from "./milestone-components/ProjectedOutcome";
import { MilestoneTable } from "./milestone-components/MilestoneTable";
import { ProfitTakingPoints, ProfitTakingPoint } from "./milestone-components/ProfitTakingPoints";
import { calculateTokensToSell, calculateTargetX, TokenInvestment } from "@/utils/profitCalculations";

interface ProfitMilestonesProps {
  strategy: {
    purchase_price: number;
    profit_goal: number;
    token_symbol: string;
  };
  recoupInvestment?: boolean;
  recoupSteps?: number;
}

export const ProfitMilestones = ({ 
  strategy, 
  recoupInvestment = false, 
  recoupSteps = 4 
}: ProfitMilestonesProps) => {
  const [profitTakingPoints, setProfitTakingPoints] = useState<ProfitTakingPoint[]>([]);

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

  const calculateMilestones = () => {
    const milestones = [];
    let remainingTokens = 100;
    let totalProfit = 0;
    
    const investment: TokenInvestment = {
      tokenCost: strategy.purchase_price / 100,
      numberOfTokens: 100,
      profitStrategy: "recoup",
      recoupSteps,
      targetMultiple: strategy.profit_goal,
    };

    // Add profit-taking points first
    profitTakingPoints.forEach((point, index) => {
      if (point.percentage && point.priceMultiple) {
        const priceMultiple = Number(point.priceMultiple);
        const sellPercentage = Number(point.percentage);
        const targetPrice = (strategy.purchase_price / 100 * priceMultiple).toFixed(2);
        const sellAmount = (strategy.purchase_price * sellPercentage / 100 * priceMultiple).toFixed(2);
        
        remainingTokens -= sellPercentage;
        totalProfit += Number(sellAmount) - (strategy.purchase_price * sellPercentage / 100);
        
        milestones.push({
          step: index + 1,
          priceMultiple: `${priceMultiple}x`,
          targetPrice,
          sellPercentage: sellPercentage.toFixed(1),
          remainingTokens: remainingTokens.toFixed(1),
          profitUSD: totalProfit.toFixed(2),
          sellAmount,
          isProfitTaking: true,
        });
      }
    });

    // Add recoup investment steps
    if (recoupInvestment) {
      for (let step = 1; step <= recoupSteps; step++) {
        const { tokensToSell, remainingTokens: newRemaining, profitAtStep } = calculateTokensToSell(investment, step);
        remainingTokens = newRemaining;
        totalProfit += profitAtStep;
        
        const priceMultiple = Math.pow(2, step);
        milestones.push({
          step: milestones.length + 1,
          priceMultiple: `${priceMultiple}x`,
          targetPrice: (strategy.purchase_price / 100 * priceMultiple).toFixed(2),
          sellPercentage: tokensToSell.toFixed(1),
          remainingTokens: remainingTokens.toFixed(1),
          profitUSD: totalProfit.toFixed(2),
          sellAmount: (strategy.purchase_price * tokensToSell / 100 * priceMultiple).toFixed(2),
        });
      }
    }

    // Final target X milestone
    if (remainingTokens > 0) {
      const { targetPrice, futureValue, projectedProfit, profitPercentage } = calculateTargetX(investment, remainingTokens);
      totalProfit += projectedProfit;
      
      milestones.push({
        step: milestones.length + 1,
        priceMultiple: `${strategy.profit_goal}x`,
        targetPrice: targetPrice.toFixed(2),
        sellPercentage: remainingTokens.toFixed(1),
        remainingTokens: "0.0",
        profitUSD: totalProfit.toFixed(2),
        sellAmount: futureValue.toFixed(2),
      });
    }

    return milestones;
  };

  const milestones = calculateMilestones();
  const nextMilestone = milestones[0];
  const finalMilestone = milestones[milestones.length - 1];
  const progress = Math.min((strategy.purchase_price / (strategy.purchase_price * strategy.profit_goal)) * 100, 100);

  return (
    <Card className="glass-card p-6 border-white/10">
      <div className="space-y-6">
        <StrategyHeader
          strategy={strategy}
          progress={progress}
          onTradeClick={() => window.open(getTradingPlatformUrl(strategy.token_symbol), '_blank')}
        />

        <ProfitTakingPoints
          points={profitTakingPoints}
          onAddPoint={(point) => setProfitTakingPoints([...profitTakingPoints, point])}
          disabled={profitTakingPoints.length >= 3}
        />

        {nextMilestone && (
          <NextMilestone milestone={nextMilestone} />
        )}

        {finalMilestone && finalMilestone.profitUSD && (
          <ProjectedOutcome
            projectedProfit={finalMilestone.profitUSD}
            profitPercentage={(Number(finalMilestone.profitUSD) / strategy.purchase_price * 100).toFixed(2)}
          />
        )}

        <MilestoneTable milestones={milestones} />

        <div className="flex justify-end space-x-4 mt-4">
          <Button 
            variant="outline" 
            className="space-x-2"
            onClick={() => window.open(getTradingPlatformUrl(strategy.token_symbol), '_blank')}
          >
            <span>Trade {strategy.token_symbol}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};