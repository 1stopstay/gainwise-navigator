import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

const data = [
  { time: "00:00", value: 3400 },
  { time: "04:00", value: 3200 },
  { time: "08:00", value: 3800 },
  { time: "12:00", value: 3600 },
  { time: "16:00", value: 3900 },
  { time: "20:00", value: 3700 },
];

const timeframes = ["1H", "4H", "1D", "1W"];

export const SignalsChart = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("4H");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Price Action</h3>
        <div className="flex gap-2">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={activeTimeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FFAB" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FFAB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="time" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00FFAB"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};