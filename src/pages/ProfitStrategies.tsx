import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { Card } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTradingStrategies } from "@/hooks/useTradingStrategies";
import { CreateStrategyForm } from "@/components/profit-strategies/CreateStrategyForm";
import { StrategyCard } from "@/components/profit-strategies/StrategyCard";
import { StrategyHistory } from "@/components/profit-strategies/StrategyHistory";

const ProfitStrategies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [profile, setProfile] = useState<any>(null);
  const [showNewStrategy, setShowNewStrategy] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please login to access your strategies",
          variant: "destructive",
        });
        navigate("/login");
      } else {
        setUserId(session.user.id);
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profileData);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const { data: strategies, isLoading } = useTradingStrategies(userId);

  if (isLoading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark">
      <ProfileSidebar profile={profile} />
      <main className="flex-1 p-8 ml-[250px]">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold font-exo">
              Profit <span className="gradient-text">Strategies</span>
            </h1>
            <Button 
              onClick={() => setShowNewStrategy(true)} 
              className="glow"
            >
              Create New Strategy
            </Button>
          </div>

          {/* New Strategy Form */}
          {showNewStrategy && <CreateStrategyForm />}

          {/* Active Strategies */}
          {strategies && strategies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategies.map((strategy) => (
                <StrategyCard 
                  key={strategy.id} 
                  strategy={strategy}
                  onDelete={(id) => console.log('Delete strategy:', id)}
                  onEdit={(strategy) => console.log('Edit strategy:', strategy)}
                  onPause={(id) => console.log('Pause strategy:', id)}
                />
              ))}
            </div>
          ) : (
            <Card className="glass-card p-8 text-center">
              <LineChart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Strategies Yet</h3>
              <p className="text-gray-400 mb-4">
                Create your first profit strategy to start tracking your investments
              </p>
              <Button 
                onClick={() => setShowNewStrategy(true)} 
                className="glow"
              >
                Create Your First Strategy
              </Button>
            </Card>
          )}

          {/* Strategy History */}
          {strategies && strategies.length > 0 && (
            <StrategyHistory strategies={strategies} />
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfitStrategies;