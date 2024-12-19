import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Coin3D from "./Coin3D";

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
          
          <div className="lg:block animate-float">
            <Coin3D />
          </div>
        </div>
      </div>
    </div>
  );
}