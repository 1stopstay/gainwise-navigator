import { useState } from "react";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignalsChart } from "@/components/signals/SignalsChart";
import { SignalsFeed } from "@/components/signals/SignalsFeed";
import { AlertsList } from "@/components/signals/AlertsList";
import { CreateAlertDialog } from "@/components/signals/CreateAlertDialog";
import { IndicatorCard } from "@/components/signals/IndicatorCard";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";

const SignalsAndAlerts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = useProfile(user?.id);

  return (
    <div className="min-h-screen bg-dark flex">
      <ProfileSidebar profile={profile} />
      
      {/* Main Content */}
      <div className="flex-1 pl-[250px]">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">
                  Signals & Alerts
                </h1>
                <p className="text-gray-400">
                  Stay ahead with real-time trading signals and trend alerts
                </p>
              </div>
              <Button
                onClick={() => setShowCreateAlert(true)}
                className="flex items-center gap-2"
              >
                <Bell className="w-4 h-4" />
                Create Alert
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="mt-6 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by coin (e.g., BTC, ETH)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <HelpCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Indicators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <IndicatorCard
              name="RSI"
              value={75}
              status="Overbought"
              type="warning"
              confidenceScore={85}
              isActive={true}
              onToggle={() => {}}
            />
            <IndicatorCard
              name="MACD"
              value={0.0023}
              status="Bullish Crossover"
              type="success"
              confidenceScore={92}
              isActive={true}
              onToggle={() => {}}
            />
            <IndicatorCard
              name="Bollinger Bands"
              value={32450}
              status="Upper Band Break"
              type="warning"
              confidenceScore={78}
              isActive={true}
              onToggle={() => {}}
            />
          </div>

          {/* Chart Section */}
          <Card className="glass-card p-4 mb-8">
            <SignalsChart />
          </Card>

          {/* Alerts and Feed Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="glass-card p-4">
              <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
              <AlertsList />
            </Card>
            <Card className="glass-card p-4">
              <h2 className="text-xl font-semibold mb-4">Signals Feed</h2>
              <SignalsFeed />
            </Card>
          </div>
        </div>
      </div>

      <CreateAlertDialog
        open={showCreateAlert}
        onOpenChange={setShowCreateAlert}
      />
    </div>
  );
};

export default SignalsAndAlerts;