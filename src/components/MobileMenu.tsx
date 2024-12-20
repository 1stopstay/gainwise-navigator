import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, LogIn, Download } from "lucide-react";
import { NavigationMenu } from "./ui/navigation-menu";
import { NavigationLinks } from "./NavigationLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (path: string) => void;
  onSectionClick: (sectionId: string) => void;
}

export const MobileMenu = ({ isOpen, onOpenChange, onNavigate, onSectionClick }: MobileMenuProps) => {
  // Get the install handler from the parent Navigation component
  const handleInstallClick = async () => {
    // This will trigger the beforeinstallprompt event in the Navigation component
    const installEvent = new Event('beforeinstallprompt');
    window.dispatchEvent(installEvent);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-dark/95 border-white/10">
        <div className="flex flex-col gap-6 mt-6">
          <NavigationMenu className="flex">
            <NavigationLinks 
              className="flex-col gap-4" 
              onItemClick={(sectionId) => {
                onSectionClick(sectionId);
                onOpenChange(false);
              }}
            />
          </NavigationMenu>
          <div className="flex flex-col gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => onNavigate('/login')}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button 
              size="sm"
              className="w-full justify-start bg-primary hover:bg-primary-dark text-dark font-semibold"
              onClick={handleInstallClick}
            >
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};