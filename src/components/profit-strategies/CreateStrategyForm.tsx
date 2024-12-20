import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateTradingStrategy } from "@/hooks/useTradingStrategies";
import { useToast } from "@/components/ui/use-toast";

export const CreateStrategyForm = () => {
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [profitGoal, setProfitGoal] = useState("");
  const { mutate: createStrategy } = useCreateTradingStrategy();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Token Symbol</label>
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
            <label className="text-sm font-medium">Purchase Price ($)</label>
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
            <label className="text-sm font-medium">Profit Goal (%)</label>
            <Input
              type="number"
              value={profitGoal}
              onChange={(e) => setProfitGoal(e.target.value)}
              placeholder="e.g., 100"
              className="bg-dark/50"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full glow">
          Create Strategy
        </Button>
      </form>
    </Card>
  );
};