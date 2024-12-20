import { useState } from 'react';
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Bell, ArrowRightLeft, Wallet } from "lucide-react";
import { useCreateTradingStrategy } from '@/hooks/useTradingStrategies';
import { useToast } from '@/hooks/use-toast';

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [purchasePrice, setPurchasePrice] = useState('');
  const [profitGoal, setProfitGoal] = useState('');
  const createStrategy = useCreateTradingStrategy();
  const { toast } = useToast();

  const handleCreateStrategy = async () => {
    try {
      await createStrategy.mutateAsync({
        purchase_price: Number(purchasePrice),
        profit_goal: Number(profitGoal),
        token_symbol: 'ETH', // Default to ETH for now
      });
      
      toast({
        title: "Strategy created!",
        description: "Your trading strategy has been saved.",
      });
      
      setPurchasePrice('');
      setProfitGoal('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Please make sure you're logged in and try again.",
        variant: "destructive",
      });
    }
  };

  const steps = [
    {
      title: "Enter your purchase price and profit goal",
      icon: Wallet,
      preview: (
        <div className="space-y-4">
          <Input 
            type="number" 
            placeholder="Purchase Price (USD)" 
            className="bg-dark/50"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
          <Input 
            type="number" 
            placeholder="Profit Goal (%)" 
            className="bg-dark/50"
            value={profitGoal}
            onChange={(e) => setProfitGoal(e.target.value)}
          />
          <Button 
            className="w-full"
            onClick={handleCreateStrategy}
            disabled={createStrategy.isPending}
          >
            {createStrategy.isPending ? 'Saving...' : 'Calculate Strategy'}
          </Button>
        </div>
      )
    },
    {
      title: "Get personalized alerts and signals",
      icon: Bell,
      preview: (
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 text-primary">
            <Bell className="h-5 w-5" />
            <p>Alert: Sell 50% of your tokens now to recover your investment!</p>
          </div>
        </div>
      )
    },
    {
      title: "Swap directly within the app",
      icon: ArrowRightLeft,
      preview: (
        <div className="space-y-4">
          <div className="glass-card p-4">
            <div className="flex justify-between items-center">
              <span>From: ETH</span>
              <Input type="number" className="w-32 bg-dark/50" placeholder="0.0" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex justify-between items-center">
              <span>To: USDT</span>
              <Input type="number" className="w-32 bg-dark/50" placeholder="0.0" />
            </div>
          </div>
          <Button className="w-full">Connect Wallet</Button>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold font-exo text-center mb-16">
          How It <span className="gradient-text">Works</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="glass-card glow relative overflow-hidden group"
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <CardContent className="p-8">
                <step.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                
                <div className={`transition-all duration-300 ${
                  hoveredStep === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {step.preview}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
