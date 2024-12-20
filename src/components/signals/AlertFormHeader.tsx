import { Bell } from "lucide-react";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const AlertFormHeader = () => {
  return (
    <DialogHeader className="flex-shrink-0">
      <DialogTitle className="text-2xl font-bold flex items-center gap-2">
        <Bell className="w-6 h-6 text-primary" />
        Track Your Tokens & Get Alerts
      </DialogTitle>
      <DialogDescription id="alert-dialog-description" className="text-gray-400 mt-2">
        Get real-time updates about your favorite coins
      </DialogDescription>
    </DialogHeader>
  );
};