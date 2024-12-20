import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateTradingStrategy } from "@/hooks/useTradingStrategies";
import { useToast } from "@/components/ui/use-toast";
import { Calculator } from "lucide-react";
import { TokenDetailsInput } from "./form/TokenDetailsInput";
import { ProfitStrategyInput } from "./form/ProfitStrategyInput";
import { calculateAmountInvested } from "@/utils/profitCalculations";

export const CreateStrategyForm = () => {
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenCost, setTokenCost] = useState("");
  const [numberOfTokens, setNumberOfTokens] = useState("");
  const [recoupSteps, setRecoupSteps] = useState("4");
  const [profitStrategy, setProfitStrategy] = useState("recoup");
  const [customProfitPercentage, setCustomProfitPercentage] = useState("");
  const [targetMultiple, setTargetMultiple] = useState("");
  
  const { mutate: createStrategy, isPending } = useCreateTradingStrategy();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting strategy form:", {
      tokenSymbol,
      tokenCost,
      numberOfTokens,
      amountInvested: calculateAmountInvested(Number(tokenCost), Number(numberOfTokens)),
      recoupSteps,
      profitStrategy,
      customProfitPercentage,
      targetMultiple
    });

    if (!tokenSymbol || !tokenCost || !numberOfTokens || !targetMultiple) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    createStrategy(
      {
        token_symbol: tokenSymbol,
        purchase_price: calculateAmountInvested(Number(tokenCost), Number(numberOfTokens)),
        profit_goal: Number(targetMultiple),
      },
      {
        onSuccess: () => {
          toast({
            title: "Strategy Created",
            description: "Your profit strategy has been created successfully",
          });
          setTokenSymbol("");
          setTokenCost("");
          setNumberOfTokens("");
          setRecoupSteps("4");
          setProfitStrategy("recoup");
          setCustomProfitPercentage("");
          setTargetMultiple("");
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to create strategy. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Card className="glass-card p-6 border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Create New Strategy</h2>
        <Calculator className="h-6 w-6 text-primary" />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <TokenDetailsInput
          tokenSymbol={tokenSymbol}
          tokenCost={tokenCost}
          numberOfTokens={numberOfTokens}
          onTokenSymbolChange={setTokenSymbol}
          onTokenCostChange={setTokenCost}
          onNumberOfTokensChange={setNumberOfTokens}
        />

        <ProfitStrategyInput
          recoupSteps={recoupSteps}
          profitStrategy={profitStrategy}
          customProfitPercentage={customProfitPercentage}
          targetMultiple={targetMultiple}
          onRecoupStepsChange={setRecoupSteps}
          onProfitStrategyChange={setProfitStrategy}
          onCustomProfitPercentageChange={setCustomProfitPercentage}
          onTargetMultipleChange={setTargetMultiple}
        />
        
        <Button type="submit" className="w-full glow" disabled={isPending}>
          {isPending ? "Creating Strategy..." : "Calculate Strategy"}
        </Button>
      </form>
    </Card>
  );
};