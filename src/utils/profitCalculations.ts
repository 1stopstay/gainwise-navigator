export interface TokenInvestment {
  tokenCost: number;
  numberOfTokens: number;
  profitStrategy: "recoup" | "recoup10" | "recoup20" | "custom";
  customProfitPercentage?: number;
  recoupSteps: number;
  targetMultiple: number;
}

export const calculateAmountInvested = (tokenCost: number, numberOfTokens: number): number => {
  return tokenCost * numberOfTokens;
};

export const calculateProfitPercentage = (strategy: string, customPercentage?: number): number => {
  switch (strategy) {
    case "recoup10":
      return 10;
    case "recoup20":
      return 20;
    case "custom":
      return customPercentage || 0;
    default:
      return 0;
  }
};

export const calculateTokensToSell = (
  investment: TokenInvestment,
  step: number
): {
  tokensToSell: number;
  remainingTokens: number;
  profitAtStep: number;
} => {
  const { tokenCost, numberOfTokens, profitStrategy, recoupSteps } = investment;
  const totalInvestment = calculateAmountInvested(tokenCost, numberOfTokens);
  const profitPercentage = calculateProfitPercentage(profitStrategy, investment.customProfitPercentage);
  
  // Calculate total amount to recoup including profit
  const totalToRecoup = totalInvestment * (1 + profitPercentage / 100);
  
  // Calculate amount to recoup at this step
  const amountPerStep = totalToRecoup / recoupSteps;
  const priceMultiple = Math.pow(2, step);
  const priceAtStep = tokenCost * priceMultiple;
  
  // Calculate tokens needed to sell at this step
  const tokensToSell = amountPerStep / priceAtStep;
  const remainingTokens = numberOfTokens - tokensToSell;
  const profitAtStep = (priceAtStep - tokenCost) * tokensToSell;

  return {
    tokensToSell,
    remainingTokens,
    profitAtStep,
  };
};

export const calculateTargetX = (
  investment: TokenInvestment,
  remainingTokens: number
): {
  targetPrice: number;
  futureValue: number;
} => {
  const { tokenCost, targetMultiple } = investment;
  const targetPrice = tokenCost * targetMultiple;
  const futureValue = targetPrice * remainingTokens;

  return {
    targetPrice,
    futureValue,
  };
};