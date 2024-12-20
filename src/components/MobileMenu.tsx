import { Menu, LogIn, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationLinks } from "./NavigationLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (path: string) => void;
  onSectionClick: (sectionId: string) => void;
}

export const MobileMenu = ({ isOpen, onOpenChange, onNavigate, onSectionClick }: MobileMenuProps) => {
  const handleLoginClick = () => {
    onNavigate('/login');
    onOpenChange(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:w-96 bg-dark/95 backdrop-blur-xl border-white/10">
        <SheetHeader>
          <SheetTitle className="text-left font-exo gradient-text">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-6">
          <NavigationLinks 
            onItemClick={onSectionClick}
            className="flex-col items-start gap-6"
          />
          <div className="flex flex-col gap-4 mt-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full justify-start hover:text-accent transition-colors duration-300"
              onClick={handleLoginClick}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button 
              size="sm"
              className="w-full justify-start bg-primary hover:bg-primary-dark text-dark font-semibold"
              onClick={() => {
                // Trigger the install prompt through the browser event
                const event = new Event('beforeinstallprompt');
                window.dispatchEvent(event);
              }}
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