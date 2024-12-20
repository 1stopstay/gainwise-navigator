import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";

interface NavigationLinksProps {
  onItemClick?: (sectionId: string) => void;
  className?: string;
}

export const NavigationLinks = ({ onItemClick, className }: NavigationLinksProps) => {
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
              "text-sm font-medium text-gray-300 hover:text-white transition-all duration-300",
              "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0",
              "after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            )}
            onClick={() => onItemClick?.(item.id)}
          >
            {item.label}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
      <NavigationMenuItem>
        <NavigationMenuLink 
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full",
            "bg-accent/10 text-accent hover:bg-accent/20",
            "transition-all duration-300",
            "hover:shadow-[0_0_20px_rgba(0,255,115,0.3)]",
            "scale-100 hover:scale-105"
          )}
        >
          <ArrowLeftRight className="w-4 h-4" />
          <span>Swap</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};