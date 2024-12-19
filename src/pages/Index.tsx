import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Hero />
      <Benefits />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
    </div>
  );
};

export default Index;