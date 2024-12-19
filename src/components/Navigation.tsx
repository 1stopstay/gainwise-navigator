import { ArrowLeftRight, LogIn, Download } from "lucide-react";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo/Name */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold font-exo gradient-text">GainWise</span>
          </div>

          {/* Center: Navigation Links */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection('home')}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection('how-it-works')}
                >
                  How It Works
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection('features')}
                >
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  onClick={() => scrollToSection('pricing')}
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full",
                    "bg-accent/10 text-accent hover:bg-accent/20",
                    "transition-all duration-300",
                    "hover:shadow-[0_0_20px_rgba(0,255,115,0.3)]"
                  )}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  <span>Swap</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right: CTA Buttons */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
            <Button 
              size="sm"
              className="bg-primary hover:bg-primary-dark text-dark font-semibold hidden md:flex items-center gap-2 glow"
            >
              <Download className="w-4 h-4" />
              Install App
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}