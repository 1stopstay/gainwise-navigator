import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Milestone {
  step: number;
  priceMultiple: string;
  targetPrice: string;
  sellPercentage: string;
  sellAmount: string;
  remainingTokens: string;
  profitUSD: string;
}

interface MilestoneTableProps {
  milestones: Milestone[];
}

export const MilestoneTable = ({ milestones }: MilestoneTableProps) => {
  return (
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
          <TableRow key={milestone.step}>
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
  );
};