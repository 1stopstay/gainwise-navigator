import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: [
      "Basic profit tracking",
      "Market overview",
      "Limited signals",
      "Basic wallet integration"
    ]
  },
  {
    name: "Premium",
    price: "$29/month",
    features: [
      "Advanced profit strategies",
      "Real-time AI signals",
      "Unlimited trading pairs",
      "Priority support",
      "Custom alerts",
      "Advanced analytics"
    ]
  }
];

export default function Pricing() {
  return (
    <section className="py-24 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold font-exo text-center mb-16">
          Choose Your <span className="gradient-text">Plan</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <Card key={index} className="glass-card glow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold mb-6 gradient-text">{tier.price}</p>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary hover:bg-primary-dark text-dark font-semibold glow">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center space-y-8">
          <h3 className="text-2xl font-bold mb-8">Download Our App</h3>
          <div className="flex justify-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                 alt="Download on App Store" 
                 className="h-12 glow cursor-pointer" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                 alt="Get it on Google Play" 
                 className="h-12 glow cursor-pointer" />
          </div>
        </div>
      </div>
    </section>
  );
}