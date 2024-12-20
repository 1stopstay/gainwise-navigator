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
  console.log("Rendering AuthContainer with title:", title); // Debug log

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 mix-blend-overlay" />
      <ParticlesBackground />
      
      <div className="absolute top-4 left-4 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBackToHome}
          className="text-white/70 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </div>
      
      <Card className="w-full max-w-md mx-4 z-10 animate-fade-up bg-black/30 backdrop-blur-md border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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