import { Card } from "@/components/ui/card";
import { LineChart, Wallet, Bell } from "lucide-react";

const ProfileOverview = () => {
  const stats = [
    {
      icon: Wallet,
      label: "Portfolio Value",
      value: "$0.00",
    },
    {
      icon: Bell,
      label: "Active Signals",
      value: "0",
    },
    {
      icon: LineChart,
      label: "Profit Goals",
      value: "0",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <h3 className="text-2xl font-bold gradient-text">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="glass-card p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <p className="text-gray-400">No recent activity</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4">Profit Overview</h2>
          <p className="text-gray-400">No active profit goals</p>
        </Card>

        <Card className="glass-card p-6">
          <h2 className="text-xl font-bold mb-4">Signal Alerts</h2>
          <p className="text-gray-400">No active signals</p>
        </Card>
      </div>
    </div>
  );
};

export default ProfileOverview;