import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings, LogOut, Home, Wallet, LineChart, Bell, Copy, Menu, X, Scan } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileSidebarProps {
  profile: Profile;
}

const ProfileSidebar = ({ profile }: ProfileSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/profile" },
    { icon: Scan, label: "Scanner", path: "/scanner" },
    { icon: Wallet, label: "Swap", path: "/swap" },
    { icon: LineChart, label: "Profit Strategies", path: "/profit-strategies" },
    { icon: Bell, label: "Signals & Alerts", path: "/signals" },
    { icon: Settings, label: "Settings", path: "/profile/settings" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform bg-dark border-r border-white/10 transition-transform duration-200 ease-in-out",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
          }
        )}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center p-6 border-b border-white/10">
          <div className="relative">
            <User className="w-16 h-16 text-primary" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">{profile.username || 'Anonymous'}</h2>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 text-xs text-muted-foreground hover:text-primary"
            onClick={() => {
              navigator.clipboard.writeText(profile.id);
              toast({
                title: "Copied!",
                description: "User ID copied to clipboard",
              });
            }}
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy ID
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                    onClick={() => {
                      navigate(item.path);
                      if (isMobile) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sign Out Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-500/10"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>
    </>
  );
};

export default ProfileSidebar;