import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculateAmountInvested } from "@/utils/profitCalculations";

interface TokenDetailsInputProps {
  tokenSymbol: string;
  tokenCost: string;
  numberOfTokens: string;
  onTokenSymbolChange: (value: string) => void;
  onTokenCostChange: (value: string) => void;
  onNumberOfTokensChange: (value: string) => void;
}

export const TokenDetailsInput = ({
  tokenSymbol,
  tokenCost,
  numberOfTokens,
  onTokenSymbolChange,
  onTokenCostChange,
  onNumberOfTokensChange,
}: TokenDetailsInputProps) => {
  const amountInvested = tokenCost && numberOfTokens 
    ? calculateAmountInvested(Number(tokenCost), Number(numberOfTokens))
    : 0;

  return (
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
        <Select value={tokenSymbol} onValueChange={onTokenSymbolChange}>
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
          onChange={(e) => onTokenCostChange(e.target.value)}
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
          onChange={(e) => onNumberOfTokensChange(e.target.value)}
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
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Total amount invested (Token Cost × Number of Tokens)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Input
          type="number"
          value={amountInvested.toFixed(2)}
          readOnly
          className="bg-dark/50 cursor-not-allowed"
        />
      </div>
    </div>
  );
};