import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if we have a section to scroll to from navigation
    const state = location.state as { scrollTo?: string };
    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Small delay to ensure components are rendered
      }
    }
  }, [location]);

  console.log("Rendering Index page"); // Debug log

  return (
    <main className="min-h-screen bg-dark">
      <Hero />
      <Benefits />
      <HowItWorks />
      <div id="features">
        <Features />
      </div>
      <Testimonials />
      <div id="pricing">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
};

export default Index;