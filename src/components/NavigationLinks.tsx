import { Link } from "react-router-dom";
import { Scan, Signal, LineChart } from "lucide-react";

interface NavigationLinksProps {
  className?: string;
  onItemClick?: (sectionId: string) => void;
}

export const NavigationLinks = ({ className, onItemClick }: NavigationLinksProps) => {
  return (
    <div className={`flex items-center gap-4 ${className || ''}`}>
      <Link
        to="/scanner"
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        onClick={() => onItemClick?.('scanner')}
      >
        <Scan className="h-4 w-4" />
        <span>Scanner</span>
      </Link>
      <Link
        to="/signals"
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        onClick={() => onItemClick?.('signals')}
      >
        <Signal className="h-4 w-4" />
        <span>Signals</span>
      </Link>
      <Link
        to="/profit-strategies"
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        onClick={() => onItemClick?.('profit-strategies')}
      >
        <LineChart className="h-4 w-4" />
        <span>Profit</span>
      </Link>
    </div>
  );
};