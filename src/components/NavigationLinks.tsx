import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Scan } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface NavigationLinksProps {
  onItemClick?: (sectionId: string) => void;
  className?: string;
}

export const NavigationLinks = ({ onItemClick, className }: NavigationLinksProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If we're not on the home page, navigate there first
      navigate('/', { state: { scrollTo: sectionId } });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If we're already on the home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onItemClick?.(sectionId);
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
  ];

  return (
    <NavigationMenuList className={cn("flex gap-6", className)}>
      {menuItems.map((item) => (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuLink 
            className={cn(
              "text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 cursor-pointer",
              "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0",
              "after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            )}
            onClick={() => handleNavigation(item.id)}
            onKeyPress={(e) => e.key === 'Enter' && handleNavigation(item.id)}
            tabIndex={0}
          >
            {item.label}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
      <NavigationMenuItem>
        <NavigationMenuLink 
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer",
            "bg-accent/10 text-accent hover:bg-accent/20",
            "transition-all duration-300",
            "hover:shadow-[0_0_20px_rgba(0,255,115,0.3)]",
            "scale-100 hover:scale-105"
          )}
          onClick={() => navigate('/swap')}
          onKeyPress={(e) => e.key === 'Enter' && navigate('/swap')}
          tabIndex={0}
        >
          <Scan className="w-4 h-4" />
          <span>Crypto Scanner</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};