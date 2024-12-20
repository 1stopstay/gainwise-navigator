import { Activity, TrendingUp, TrendingDown } from "lucide-react";
import { useSignals } from "@/hooks/useSignals";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SignalsFeed = () => {
  const { signals, isLoading } = useSignals();

  if (isLoading) {
    return <div>Loading signals...</div>;
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-4 pr-4">
        {signals.map((signal) => (
          <div
            key={signal.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            {signal.condition.includes("ABOVE") ? (
              <TrendingUp className="w-5 h-5 text-green-400 shrink-0" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-sm">
                {signal.name} - {signal.condition.replace("_", " ")} {signal.value}
              </p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Confidence Score</span>
                  <span>{signal.confidence_score}%</span>
                </div>
                <Progress value={signal.confidence_score} className="h-1" />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(signal.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {signals.length === 0 && (
          <div className="text-center text-gray-400 py-4">
            No signals yet. Create one to get started!
          </div>
        )}
      </div>
    </ScrollArea>
  );
};