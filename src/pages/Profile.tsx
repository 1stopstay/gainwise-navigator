import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileOverview from "@/components/profile/ProfileOverview";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { AlertsList } from "@/components/signals/AlertsList";

const Profile = () => {
  const [userId, setUserId] = useState<string | undefined>();
  const { data: profile } = useProfile(userId);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);
    };

    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-dark flex">
      <ProfileSidebar profile={profile} />
      
      {/* Main Content */}
      <div className="flex-1 pl-[250px]">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">
              View and manage your profile settings and trading activity
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="glass-card p-6">
              <div className="space-y-4">
                {profile && <ProfileOverview profile={profile} />}
              </div>
            </Card>
            <Card className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Active Alerts</h2>
              <AlertsList />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;