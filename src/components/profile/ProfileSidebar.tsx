import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings, LogOut, Home, Wallet, LineChart, Bell, Copy } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ProfileSidebarProps {
  profile: Profile | null;
}

const ProfileSidebar = ({ profile }: ProfileSidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
      return;
    }
    navigate("/");
  };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/profile" },
    { icon: Wallet, label: "Swap", path: "/profile/swap" },
    { icon: LineChart, label: "Profit Strategies", path: "/profile/strategies" },
    { icon: Bell, label: "Signals & Alerts", path: "/profile/signals" },
    { icon: Settings, label: "Settings", path: "/profile/settings" },
  ];

  // Mock wallet address - in real app, get this from your wallet connection
  const walletAddress = "0x1234...5678";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "Wallet address copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy address",
        variant: "destructive",
      });
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] bg-dark/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
      <div className="p-6 text-center border-b border-white/10">
        <Avatar className="w-20 h-20 mx-auto mb-4 ring-2 ring-primary ring-offset-2 ring-offset-dark transition-all duration-300 hover:ring-4">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.username || 'default'}`} />
          <AvatarFallback>
            <User className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold gradient-text mb-2">{profile?.username || "User"}</h2>
        
        {/* Wallet Address */}
        <div 
          className="flex items-center justify-center gap-2 px-3 py-1.5 bg-white/5 rounded-full text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"
          onClick={copyToClipboard}
        >
          <span>{walletAddress}</span>
          <Copy className={cn(
            "w-4 h-4 transition-all",
            isCopied ? "text-primary" : "text-gray-400"
          )} />
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                  "hover:bg-primary/10 hover:text-primary hover:translate-x-1",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  isHovered === item.label ? "bg-primary/10 text-primary" : "text-gray-300"
                )}
                onMouseEnter={() => setIsHovered(item.label)}
                onMouseLeave={() => setIsHovered("")}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button
          onClick={handleLogout}
          className={cn(
            "w-full bg-red-500/10 hover:bg-red-500/20 text-red-500",
            "border border-red-500/20 hover:border-red-500/30",
            "transition-all duration-300 gap-2"
          )}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;