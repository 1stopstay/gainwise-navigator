import { Bell } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AlertFormHeaderProps {
  title?: string;
  description?: string;
}

export const AlertFormHeader = ({ 
  title = "Track Your Tokens & Get Alerts", 
  description = "Get real-time updates about your favorite coins" 
}: AlertFormHeaderProps) => {
  return (
    <DialogHeader className="flex-shrink-0">
      <DialogTitle className="text-2xl font-bold flex items-center gap-2">
        <Bell className="w-6 h-6 text-primary" />
        {title}
      </DialogTitle>
      <DialogDescription id="alert-dialog-description" className="text-gray-400 mt-2">
        {description}
      </DialogDescription>
    </DialogHeader>
  );
};