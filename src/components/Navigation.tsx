import { LogIn, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavigationLinks } from "./NavigationLinks";
import { MobileMenu } from "./MobileMenu";

export default function Navigation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu after clicking
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo/Name */}
          <div 
            className="flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleLogoClick()}
          >
            <span className="text-xl font-bold font-exo gradient-text">GainWise</span>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <NavigationMenu className="hidden md:flex">
            <NavigationLinks onItemClick={scrollToSection} />
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
            <MobileMenu 
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              onNavigate={navigate}
              onSectionClick={scrollToSection}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}