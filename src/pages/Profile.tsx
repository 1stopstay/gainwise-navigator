import { useState, useEffect } from "react";
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
    <div className="min-h-screen bg-dark">
      <ProfileSidebar profile={profile} />
      
      {/* Main Content */}
      <div className="pl-[250px] w-full">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">
              View and manage your profile settings and trading activity
            </p>
          </div>

          {profile && <ProfileOverview profile={profile} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;