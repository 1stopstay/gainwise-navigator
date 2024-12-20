import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings, LogOut, Home, Wallet, LineChart, Bell } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ProfileSidebarProps {
  profile: Profile | null;
}

const ProfileSidebar = ({ profile }: ProfileSidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState("");

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

  return (
    <aside className="fixed left-0 top-0 h-screen w-[250px] bg-dark/50 backdrop-blur-xl border-r border-white/10 flex flex-col">
      <div className="p-6 text-center border-b border-white/10">
        <Avatar className="w-20 h-20 mx-auto mb-4 glow">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.username || 'default'}`} />
          <AvatarFallback>
            <User className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold gradient-text">{profile?.username || "User"}</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isHovered === item.label ? "bg-primary/10 text-primary" : "hover:bg-primary/10 hover:text-primary"
                }`}
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
          className="w-full bg-red-500 hover:bg-red-600 text-white gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;