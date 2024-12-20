import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";

const Swap = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDT");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please login to access the swap feature",
          variant: "destructive",
        });
        navigate("/login");
      } else {
        setUserId(session.user.id);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const { data: profile, isLoading } = useProfile(userId);

  const handleSwap = () => {
    // Implement swap functionality here
    toast({
      title: "Coming Soon",
      description: "Swap functionality will be available soon!",
    });
  };

  if (isLoading) {
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
        <div className="max-w-xl mx-auto">
          <Card className="glass-card p-6 space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              Swap <span className="gradient-text">Tokens</span>
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">From</label>
                <div className="flex gap-4">
                  <Select value={fromToken} onValueChange={setFromToken}>
                    <SelectTrigger className="w-[120px] bg-dark/50">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark border border-white/10">
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.0"
                    className="flex-1 bg-dark/50"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/20"
                  onClick={() => {
                    setFromToken(toToken);
                    setToToken(fromToken);
                  }}
                >
                  <ArrowDownUp className="h-6 w-6 text-primary" />
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">To</label>
                <div className="flex gap-4">
                  <Select value={toToken} onValueChange={setToToken}>
                    <SelectTrigger className="w-[120px] bg-dark/50">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark border border-white/10">
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="USDT">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.0"
                    className="flex-1 bg-dark/50"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={handleSwap}
              >
                Swap Tokens
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Swap;