import { Activity, TrendingUp, TrendingDown } from "lucide-react";

const signals = [
  {
    id: 1,
    type: "buy",
    message: "Buy Signal - MACD Bullish Crossover detected on BTC/USD",
    time: "10:45 AM",
  },
  {
    id: 2,
    type: "sell",
    message: "Sell Signal - RSI Overbought (75) on ETH/USD",
    time: "10:50 AM",
  },
];

export const SignalsFeed = () => {
  return (
    <div className="space-y-4">
      {signals.map((signal) => (
        <div
          key={signal.id}
          className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
        >
          {signal.type === "buy" ? (
            <TrendingUp className="w-5 h-5 text-green-400 shrink-0" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <div>
            <p className="text-sm">{signal.message}</p>
            <p className="text-xs text-gray-400 mt-1">{signal.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};