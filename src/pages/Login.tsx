import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log("Login attempt with:", { email, password });
  };

  const handleBackToHome = () => {
    navigate('/');
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
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-primary hover:text-primary/80"
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
            >
              Log In
            </Button>

            <div className="text-sm text-center space-y-2">
              <a
                href="#"
                className="text-white/60 hover:text-primary transition-colors duration-200"
              >
                Forgot password?
              </a>
              <div className="text-white/60">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-primary hover:underline transition-all duration-200"
                >
                  Register now
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-dark px-2 text-white/60">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full border-white/10 hover:bg-primary/10 glow"
            >
              Connect Wallet
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;