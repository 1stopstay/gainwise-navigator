import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BellRing, Mail, Bell } from "lucide-react";

interface NotificationPreferencesProps {
  preferences: {
    email: boolean;
    push: boolean;
  };
  onPreferencesChange: (preferences: { email: boolean; push: boolean }) => void;
}

export const NotificationPreferences = ({
  preferences,
  onPreferencesChange,
}: NotificationPreferencesProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BellRing className="w-5 h-5 text-primary" />
        <Label className="text-lg font-medium">How should we alert you?</Label>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <Label>Email Notifications</Label>
          </div>
          <Switch
            checked={preferences.email}
            onCheckedChange={(checked) =>
              onPreferencesChange({ ...preferences, email: checked })
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <Label>Push Notifications</Label>
          </div>
          <Switch
            checked={preferences.push}
            onCheckedChange={(checked) =>
              onPreferencesChange({ ...preferences, push: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};