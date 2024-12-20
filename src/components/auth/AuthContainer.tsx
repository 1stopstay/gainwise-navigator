import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from "@/components/ParticlesBackground";

interface AuthContainerProps {
  title: string;
  children: React.ReactNode;
}

export const AuthContainer = ({ title, children }: AuthContainerProps) => {
  const navigate = useNavigate();

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
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};