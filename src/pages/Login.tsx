import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/profile');
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/profile');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLoginSuccess = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 mix-blend-overlay" />
      <ParticlesBackground />
      
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBackToHome}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </div>
      
      <Card className="w-full max-w-md mx-4 animate-fade-up glass-card backdrop-blur-md bg-white/5 border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center gradient-text">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm 
            isSignUp={isSignUp}
            onToggleMode={() => setIsSignUp(!isSignUp)}
            onSuccess={handleLoginSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;