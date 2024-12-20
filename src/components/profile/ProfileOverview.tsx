import { Card } from "@/components/ui/card";
import { LineChart, Wallet, Bell, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileOverviewProps {
  profile: Profile;
}

const ProfileOverview = ({ profile }: ProfileOverviewProps) => {
  const stats = [
    {
      icon: Wallet,
      label: "Portfolio Value",
      value: "$0.00",
      change: { value: "+0%", isPositive: true }
    },
    {
      icon: Bell,
      label: "Active Signals",
      value: "0",
      change: { value: "0 new", isPositive: true }
    },
    {
      icon: LineChart,
      label: "Profit Goals",
      value: "0",
      change: { value: "No change", isPositive: true }
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            className={cn(
              "glass-card p-6 border-white/10",
              "hover:border-primary/30 transition-all duration-300",
              "group"
            )}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold gradient-text">{stat.value}</h3>
                  <span className={cn(
                    "flex items-center text-xs",
                    stat.change.isPositive ? "text-green-400" : "text-red-400"
                  )}>
                    {stat.change.isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change.value}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6 col-span-full lg:col-span-1">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <LineChart className="w-5 h-5 text-primary" />
            Profit Overview
          </h2>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            No active profit goals
          </div>
        </Card>

        <Card className="glass-card p-6 col-span-full lg:col-span-1">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Signal Alerts
          </h2>
          <div className="h-[300px] flex items-center justify-center text-gray-400">
            No active signals
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="text-gray-400">No recent activity</div>
      </Card>
    </div>
  );
};

export default ProfileOverview;