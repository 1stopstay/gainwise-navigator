import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import type { Database } from "@/integrations/supabase/types";

type UserSettings = Database["public"]["Tables"]["user_settings"]["Row"];

interface NotificationPreferences {
  signals: boolean;
  profit_alerts: boolean;
  general_updates: boolean;
}

const defaultNotificationPreferences: NotificationPreferences = {
  signals: true,
  profit_alerts: true,
  general_updates: true
};

export default function Settings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates: Partial<UserSettings>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, ...updates } : null);
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  const getNotificationPreferences = (): NotificationPreferences => {
    if (!settings?.notification_preferences) {
      return defaultNotificationPreferences;
    }
    
    // Handle the case where notification_preferences is a string
    if (typeof settings.notification_preferences === 'string') {
      try {
        const parsed = JSON.parse(settings.notification_preferences);
        if (typeof parsed === 'object' && parsed !== null) {
          return {
            signals: Boolean(parsed.signals),
            profit_alerts: Boolean(parsed.profit_alerts),
            general_updates: Boolean(parsed.general_updates)
          };
        }
      } catch {
        return defaultNotificationPreferences;
      }
    }
    
    // Handle the case where notification_preferences is already an object
    if (typeof settings.notification_preferences === 'object' && settings.notification_preferences !== null) {
      const prefs = settings.notification_preferences as Record<string, unknown>;
      return {
        signals: Boolean(prefs.signals),
        profit_alerts: Boolean(prefs.profit_alerts),
        general_updates: Boolean(prefs.general_updates)
      };
    }
    
    return defaultNotificationPreferences;
  };

  const handleNotificationToggle = (type: keyof NotificationPreferences) => {
    const currentPreferences = getNotificationPreferences();
    const newPreferences = {
      ...currentPreferences,
      [type]: !currentPreferences[type]
    };
    
    updateSettings({ notification_preferences: newPreferences });
  };

  const handleThemeChange = (theme: 'dark' | 'light') => {
    updateSettings({ theme });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const preferences = getNotificationPreferences();

  return (
    <div className="min-h-screen bg-dark flex">
      <ProfileSidebar profile={null} />
      
      <div className="flex-1 pl-[250px]">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Settings
            </h1>
            <p className="text-gray-400">
              Manage your notification preferences and app settings
            </p>
          </div>

          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Signals</Label>
                    <p className="text-sm text-gray-400">
                      Receive notifications about new trading signals
                    </p>
                  </div>
                  <Switch
                    checked={preferences.signals}
                    onCheckedChange={() => handleNotificationToggle('signals')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profit Alerts</Label>
                    <p className="text-sm text-gray-400">
                      Get notified when your profit goals are reached
                    </p>
                  </div>
                  <Switch
                    checked={preferences.profit_alerts}
                    onCheckedChange={() => handleNotificationToggle('profit_alerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>General Updates</Label>
                    <p className="text-sm text-gray-400">
                      Stay informed about platform updates and news
                    </p>
                  </div>
                  <Switch
                    checked={preferences.general_updates}
                    onCheckedChange={() => handleNotificationToggle('general_updates')}
                  />
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Theme</h2>
              <div className="flex gap-4">
                <Button
                  variant={settings?.theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={settings?.theme === 'light' ? 'default' : 'outline'}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}