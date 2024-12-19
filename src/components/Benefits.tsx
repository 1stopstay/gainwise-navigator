import { Brain, TrendingUp, Wallet } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "AI-Powered Signals",
    description: "Stay ahead with intelligent buy and sell signals backed by advanced algorithms.",
  },
  {
    icon: TrendingUp,
    title: "Profit Guidance",
    description: "Never miss the perfect moment to take profits with our smart alerts.",
  },
  {
    icon: Wallet,
    title: "Integrated DEX",
    description: "Swap tokens directly within the app—secure, fast, and convenient.",
  },
];

export default function Benefits() {
  return (
    <section className="py-24 bg-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold font-exo text-center mb-16">
          Why Choose <span className="gradient-text">CryptoProfit</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="glass-card p-8 glow">
              <benefit.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}