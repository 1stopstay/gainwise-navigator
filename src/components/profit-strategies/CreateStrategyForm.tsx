import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateTradingStrategy } from "@/hooks/useTradingStrategies";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info, HelpCircle, Calculator } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const calculateAmountInvested = () => {
    if (!tokenCost || !numberOfTokens) return 0;
    return Number(tokenCost) * Number(numberOfTokens);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting strategy form:", {
      tokenSymbol,
      tokenCost,
      numberOfTokens,
      amountInvested: calculateAmountInvested(),
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
        purchase_price: calculateAmountInvested(),
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Token Name
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the token symbol (e.g., BTC, ETH)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Select value={tokenSymbol} onValueChange={setTokenSymbol}>
              <SelectTrigger>
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="SOL">Solana (SOL)</SelectItem>
                <SelectItem value="CUSTOM">Custom Token</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Token Cost (USD)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the price per token in USD</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              type="number"
              step="0.000001"
              value={tokenCost}
              onChange={(e) => setTokenCost(e.target.value)}
              placeholder="0.00"
              className="bg-dark/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Number of Tokens
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the total number of tokens you own</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              type="number"
              value={numberOfTokens}
              onChange={(e) => setNumberOfTokens(e.target.value)}
              placeholder="0"
              className="bg-dark/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Amount Invested (USD)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Automatically calculated based on token cost and quantity</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              type="number"
              value={calculateAmountInvested()}
              readOnly
              className="bg-dark/50 opacity-75"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Investment Recovery Steps</Label>
            <Select value={recoupSteps} onValueChange={setRecoupSteps}>
              <SelectTrigger>
                <SelectValue placeholder="Select recovery steps" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">In 1 Step</SelectItem>
                <SelectItem value="2">In 2 Steps</SelectItem>
                <SelectItem value="3">In 3 Steps</SelectItem>
                <SelectItem value="4">In 4 Steps</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Profit Strategy</Label>
            <Select value={profitStrategy} onValueChange={setProfitStrategy}>
              <SelectTrigger>
                <SelectValue placeholder="Select profit strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recoup">Recoup Initial Investment Only</SelectItem>
                <SelectItem value="recoup10">Recoup + 10% Profit</SelectItem>
                <SelectItem value="recoup20">Recoup + 20% Profit</SelectItem>
                <SelectItem value="custom">Custom Profit Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {profitStrategy === 'custom' && (
            <div className="space-y-2">
              <Label>Custom Profit Percentage</Label>
              <Input
                type="number"
                value={customProfitPercentage}
                onChange={(e) => setCustomProfitPercentage(e.target.value)}
                placeholder="Enter percentage"
                className="bg-dark/50"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              Target Multiple (X)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter your target price multiple (e.g., 10 for 10x)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              type="number"
              value={targetMultiple}
              onChange={(e) => setTargetMultiple(e.target.value)}
              placeholder="e.g., 10 for 10x"
              className="bg-dark/50"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full glow" disabled={isPending}>
          {isPending ? "Creating Strategy..." : "Calculate Strategy"}
        </Button>
      </form>
    </Card>
  );
};