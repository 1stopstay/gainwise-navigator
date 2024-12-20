import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface Milestone {
  step: number;
  priceMultiple: string;
  targetPrice: string;
  sellPercentage: string;
  sellAmount: string;
  remainingTokens: string;
  profitUSD: string;
  isProfitTaking?: boolean;
}

interface MilestoneTableProps {
  milestones: Milestone[];
}

export const MilestoneTable = ({ milestones }: MilestoneTableProps) => {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
        <ChevronDown className="h-4 w-4" />
        View Step-by-Step Strategy
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Step</TableHead>
              <TableHead>Price Multiple</TableHead>
              <TableHead>Target Price</TableHead>
              <TableHead>Sell %</TableHead>
              <TableHead>Sell Amount ($)</TableHead>
              <TableHead>Remaining %</TableHead>
              <TableHead>Total Profit ($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {milestones.map((milestone) => (
              <TableRow 
                key={milestone.step}
                className={milestone.isProfitTaking ? "bg-primary/5" : undefined}
              >
                <TableCell>{milestone.step}</TableCell>
                <TableCell>{milestone.priceMultiple}</TableCell>
                <TableCell>${milestone.targetPrice}</TableCell>
                <TableCell>{milestone.sellPercentage}%</TableCell>
                <TableCell>${milestone.sellAmount}</TableCell>
                <TableCell>{milestone.remainingTokens}%</TableCell>
                <TableCell>${milestone.profitUSD}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CollapsibleContent>
    </Collapsible>
  );
};