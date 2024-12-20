import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { Card } from "@/components/ui/card";
import { useTradingStrategies } from "@/hooks/useTradingStrategies";
import { LineChart, ArrowUpRight, ArrowDownRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProfitStrategies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | undefined>(undefined);

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
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const { data: strategies, isLoading } = useTradingStrategies(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  const calculateCurrentProfit = (purchasePrice: number) => {
    // Placeholder: In a real app, this would fetch current price from an API
    const mockCurrentPrice = purchasePrice * 1.15; // Simulating 15% increase
    return ((mockCurrentPrice - purchasePrice) / purchasePrice) * 100;
  };

  return (
    <div className="flex min-h-screen bg-dark">
      <ProfileSidebar />
      <main className="flex-1 p-8 ml-[250px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-exo">
              Profit <span className="gradient-text">Strategies</span>
            </h1>
            <Button 
              onClick={() => navigate("/")} 
              className="glow"
            >
              Create New Strategy
            </Button>
          </div>

          {strategies && strategies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategies.map((strategy) => {
                const profit = calculateCurrentProfit(Number(strategy.purchase_price));
                const isPositive = profit > 0;

                return (
                  <Card 
                    key={strategy.id} 
                    className={cn(
                      "glass-card p-6 border-white/10",
                      "hover:border-primary/30 transition-all duration-300",
                      "group"
                    )}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <LineChart className="w-6 h-6 text-primary" />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{strategy.token_symbol}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex justify-between">
                        <span>Purchase Price:</span>
                        <span className="font-medium text-white">
                          ${Number(strategy.purchase_price).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit Goal:</span>
                        <span className="font-medium text-white">
                          {Number(strategy.profit_goal)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Profit:</span>
                        <span className={cn(
                          "flex items-center gap-1 font-medium",
                          isPositive ? "text-green-400" : "text-red-400"
                        )}>
                          {isPositive ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {Math.abs(profit).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="glass-card p-8 text-center">
              <LineChart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Strategies Yet</h3>
              <p className="text-gray-400 mb-4">
                Create your first profit strategy to start tracking your investments
              </p>
              <Button 
                onClick={() => navigate("/")} 
                className="glow"
              >
                Create Your First Strategy
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfitStrategies;