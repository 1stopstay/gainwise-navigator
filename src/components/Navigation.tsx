import { ArrowLeftRight, LogIn, Download, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navigation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
  ];

  const NavLinks = () => (
    <NavigationMenuList className="flex gap-6">
      {menuItems.map((item) => (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuLink 
            className={cn(
              "text-sm font-medium text-gray-300 hover:text-white transition-all duration-300",
              "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0",
              "after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
            )}
            onClick={() => scrollToSection(item.id)}
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo/Name */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold font-exo gradient-text">GainWise</span>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <NavigationMenu className="hidden md:flex">
            <NavLinks />
          </NavigationMenu>

          {/* Right: CTA Buttons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex items-center gap-2 hover:text-accent transition-colors duration-300"
              onClick={handleLoginClick}
            >
              <LogIn className="w-4 h-4" />
              Login
            </Button>
            <Button 
              size="sm"
              className={cn(
                "bg-primary hover:bg-primary-dark text-dark font-semibold hidden md:flex items-center gap-2 glow",
                "transition-all duration-300 hover:scale-105"
              )}
            >
              <Download className="w-4 h-4" />
              Install App
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-dark/95 border-white/10">
                <div className="flex flex-col gap-6 mt-6">
                  <NavigationMenu className="flex">
                    <NavigationMenuList className="flex flex-col gap-4">
                      {menuItems.map((item) => (
                        <NavigationMenuItem key={item.id}>
                          <NavigationMenuLink 
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            onClick={() => scrollToSection(item.id)}
                          >
                            {item.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                  <div className="flex flex-col gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={handleLoginClick}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                    <Button 
                      size="sm"
                      className="w-full justify-start bg-primary hover:bg-primary-dark text-dark font-semibold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Install App
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}