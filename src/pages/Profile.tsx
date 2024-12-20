import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileOverview from "@/components/profile/ProfileOverview";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please login to access your profile",
          variant: "destructive",
        });
        navigate("/login");
      } else {
        setUserId(session.user.id);
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  const { data: profile, isLoading } = useProfile(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-dark">
      <ProfileSidebar profile={profile} />
      <main className="flex-1 p-8 ml-[250px]">
        <ProfileOverview />
      </main>
    </div>
  );
};

export default Profile;