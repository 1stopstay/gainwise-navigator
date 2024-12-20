import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthUI } from "@/components/auth/AuthUI";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Login component mounted"); // Debug log
    
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session); // Debug log
      if (session) {
        navigate('/profile');
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session); // Debug log
      if (session) {
        navigate('/profile');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <AuthContainer title="Welcome Back">
      <AuthUI />
    </AuthContainer>
  );
};

export default Login;