import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
  onSuccess: () => void;
}

const LoginForm = ({ isSignUp, onToggleMode, onSuccess }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Email validation
      if (!validateEmail(email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive"
        });
        return;
      }

      // Password validation
      if (!validatePassword(password)) {
        toast({
          title: "Weak Password",
          description: "Password must be at least 8 characters long and include uppercase, lowercase, and numbers.",
          variant: "destructive"
        });
        return;
      }

      console.log(`Attempting to ${isSignUp ? 'sign up' : 'login'} with:`, { email });

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Successfully logged in!",
        });
        onSuccess();
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 bg-black/50 border-white/10 focus:border-primary glow"
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="relative">
        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-primary" />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pl-10 pr-10 bg-black/50 border-white/10 focus:border-primary glow"
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-primary hover:text-primary/80"
          disabled={isLoading}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark transition-all duration-300 glow"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : (isSignUp ? "Sign Up" : "Log In")}
      </Button>

      <div className="text-sm text-center space-y-2">
        <div className="text-white/60">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="text-primary hover:underline transition-all duration-200"
            disabled={isLoading}
          >
            {isSignUp ? "Log in" : "Register now"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;