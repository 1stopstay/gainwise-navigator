import { Coins } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TokenSelectionProps {
  symbol: string;
  onSymbolChange: (value: string) => void;
}

export const TokenSelection = ({ symbol, onSymbolChange }: TokenSelectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Coins className="w-5 h-5 text-primary" />
        <Label className="text-lg font-medium">Select Token</Label>
      </div>
      <Input
        placeholder="Enter token symbol (e.g., BTC, ETH)"
        value={symbol}
        onChange={(e) => onSymbolChange(e.target.value.toUpperCase())}
        className="bg-background/50"
      />
    </div>
  );
};