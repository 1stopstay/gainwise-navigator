import { ArrowRight, Zap, Shield, Coins } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-primary/10" />
      
      <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-exo">
              Take Control of Your
              <span className="gradient-text block">Crypto Profits</span>
            </h1>
            <p className="text-xl text-gray-300">
              Smarter decisions. Simple tools. Secure profits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-dark font-semibold">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 animate-fade-up">
            <Card className="glass-card glow">
              <CardContent className="p-6 space-y-4">
                <Zap className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold font-exo">AI-Powered Signals</h3>
                <p className="text-gray-300">Get real-time market insights backed by advanced AI algorithms</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card glow">
              <CardContent className="p-6 space-y-4">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold font-exo">Secure Trading</h3>
                <p className="text-gray-300">Trade with confidence using our secure DEX integration</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card glow">
              <CardContent className="p-6 space-y-4">
                <Coins className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold font-exo">Profit Tracking</h3>
                <p className="text-gray-300">Never miss a profitable exit with smart notifications</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card glow">
              <CardContent className="p-6 space-y-4">
                <ArrowRight className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold font-exo">Easy to Use</h3>
                <p className="text-gray-300">Intuitive interface designed for both beginners and pros</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}