import { Link } from "react-router-dom";
import { Scan, Signal, LineChart } from "lucide-react";

export const NavigationLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        to="/scanner"
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <Scan className="h-4 w-4" />
        <span>Scanner</span>
      </Link>
      <Link
        to="/signals"
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <Signal className="h-4 w-4" />
        <span>Signals</span>
      </Link>
      <Link
        to="/profit-strategies"
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <LineChart className="h-4 w-4" />
        <span>Profit</span>
      </Link>
    </div>
  );
};