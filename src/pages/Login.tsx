import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthUI } from "@/components/auth/AuthUI";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/profile');
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/profile');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  console.log("Rendering Login page"); // Debug log

  return (
    <div className="min-h-screen w-full">
      <AuthContainer title="Welcome Back">
        <AuthUI />
      </AuthContainer>
    </div>
  );
};

export default Login;