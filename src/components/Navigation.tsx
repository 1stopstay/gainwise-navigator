import { LogIn, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavigationLinks } from "./NavigationLinks";
import { MobileMenu } from "./MobileMenu";
import { useToast } from "@/hooks/use-toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Installation not available",
        description: "The app is either already installed or cannot be installed on this device.",
        variant: "destructive",
      });
      return;
    }

    // Show the install prompt
    await deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      toast({
        title: "Installation successful",
        description: "The app has been installed successfully!",
      });
    } else {
      toast({
        title: "Installation cancelled",
        description: "You can install the app later from the same button.",
      });
    }
    
    // Clear the deferredPrompt for the next time
    setDeferredPrompt(null);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
              onClick={handleInstallClick}
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