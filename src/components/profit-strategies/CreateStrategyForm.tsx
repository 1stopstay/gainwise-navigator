import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateTradingStrategy } from "@/hooks/useTradingStrategies";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Info, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CreateStrategyForm = () => {
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [profitGoal, setProfitGoal] = useState("");
  const [recoupInvestment, setRecoupInvestment] = useState(false);
  const [recoupSteps, setRecoupSteps] = useState("4");
  const { mutate: createStrategy, isPending } = useCreateTradingStrategy();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting strategy form:", {
      tokenSymbol,
      purchasePrice,
      profitGoal,
      recoupInvestment,
      recoupSteps
    });

    if (!tokenSymbol || !purchasePrice || !profitGoal) {
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
        purchase_price: Number(purchasePrice),
        profit_goal: Number(profitGoal),
      },
      {
        onSuccess: () => {
          toast({
            title: "Strategy Created",
            description: "Your profit strategy has been created successfully",
          });
          setTokenSymbol("");
          setPurchasePrice("");
          setProfitGoal("");
          setRecoupInvestment(false);
          setRecoupSteps("4");
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
      <h2 className="text-xl font-bold mb-4">Create New Strategy</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Token</label>
            <Select value={tokenSymbol} onValueChange={setTokenSymbol}>
              <SelectTrigger>
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                <SelectItem value="SOL">Solana (SOL)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Amount Invested ($)</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter the total amount you invested in USD</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="number"
              step="0.000001"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="0.00"
              className="bg-dark/50"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Target (X)</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter your target multiple (e.g., 10 for 10x)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              type="number"
              value={profitGoal}
              onChange={(e) => setProfitGoal(e.target.value)}
              placeholder="e.g., 10 for 10x"
              className="bg-dark/50"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="recoupInvestment"
              checked={recoupInvestment}
              onCheckedChange={(checked) => setRecoupInvestment(checked as boolean)}
            />
            <Label htmlFor="recoupInvestment" className="text-sm font-medium cursor-pointer">
              Recoup Initial Investment
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Automatically calculate steps to recover your initial investment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {recoupInvestment && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Recovery Steps</label>
              <Select value={recoupSteps} onValueChange={setRecoupSteps}>
                <SelectTrigger>
                  <SelectValue placeholder="Select steps" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 steps (50% each)</SelectItem>
                  <SelectItem value="3">3 steps (33% each)</SelectItem>
                  <SelectItem value="4">4 steps (25% each)</SelectItem>
                  <SelectItem value="5">5 steps (20% each)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <Button type="submit" className="w-full glow" disabled={isPending}>
          {isPending ? "Creating Strategy..." : "Create Strategy"}
        </Button>
      </form>
    </Card>
  );
};