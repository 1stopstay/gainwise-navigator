import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target, Brain, Wallet } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Profit Planner",
    description: "Set goals and let us calculate the ideal strategy. Our advanced algorithms help you determine the perfect entry and exit points for maximum profits."
  },
  {
    icon: Brain,
    title: "AI Signals",
    description: "Get real-time market insights backed by technical indicators. Our AI analyzes multiple data points to provide you with accurate trading signals."
  },
  {
    icon: Wallet,
    title: "Wallet & DEX Integration",
    description: "Securely connect your wallet and trade seamlessly. Execute trades directly from our platform with the best rates across multiple DEXes."
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold font-exo text-center mb-16">
          Features Designed for <span className="gradient-text">Crypto Traders</span>
        </h2>
        
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="glass-card glow mb-4 border-none">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">{feature.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-gray-300">
                {feature.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}