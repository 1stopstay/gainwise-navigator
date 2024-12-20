import { useState, useEffect } from "react";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignalsFeed } from "@/components/signals/SignalsFeed";
import { AlertsList } from "@/components/signals/AlertsList";
import { CreateAlertDialog } from "@/components/signals/CreateAlertDialog";
import { IndicatorCard } from "@/components/signals/IndicatorCard";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { useProfile } from "@/hooks/useProfile";
import { useSignals } from "@/hooks/useSignals";
import { supabase } from "@/integrations/supabase/client";

const SignalsAndAlerts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [userId, setUserId] = useState<string | undefined>();
  const { data: profile } = useProfile(userId);
  const { signals, isLoading } = useSignals();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);
    };

    getUser();
  }, []);

  // Find specific signals by indicator type
  const rsiSignal = signals.find(s => s.indicator === "RSI");
  const macdSignal = signals.find(s => s.indicator === "MACD");
  const bbSignal = signals.find(s => s.indicator === "BOLLINGER_BANDS");

  return (
    <div className="min-h-screen bg-dark flex">
      <ProfileSidebar profile={profile} />
      
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
            {rsiSignal && (
              <IndicatorCard
                id={rsiSignal.id}
                name="RSI"
                value={rsiSignal.value || 0}
                status={rsiSignal.condition}
                type={rsiSignal.condition.includes("ABOVE") ? "warning" : "success"}
                confidenceScore={rsiSignal.confidence_score || 0}
                isActive={rsiSignal.is_active || false}
                onToggle={() => {}}
              />
            )}
            {macdSignal && (
              <IndicatorCard
                id={macdSignal.id}
                name="MACD"
                value={macdSignal.value || 0}
                status={macdSignal.condition}
                type={macdSignal.condition.includes("ABOVE") ? "success" : "warning"}
                confidenceScore={macdSignal.confidence_score || 0}
                isActive={macdSignal.is_active || false}
                onToggle={() => {}}
              />
            )}
            {bbSignal && (
              <IndicatorCard
                id={bbSignal.id}
                name="Bollinger Bands"
                value={bbSignal.value || 0}
                status={bbSignal.condition}
                type={bbSignal.condition.includes("ABOVE") ? "warning" : "success"}
                confidenceScore={bbSignal.confidence_score || 0}
                isActive={bbSignal.is_active || false}
                onToggle={() => {}}
              />
            )}
          </div>

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