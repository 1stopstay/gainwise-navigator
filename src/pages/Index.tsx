import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { SCROLL_IDS } from "@/lib/constants";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Location state changed:", location.state);
    const state = location.state as { scrollTo?: string } | undefined;

    if (state?.scrollTo) {
      const element = document.getElementById(state.scrollTo);
      if (element) {
        console.log(`Scrolling to element: ${state.scrollTo}`);
        element.scrollIntoView({ behavior: "smooth" });
        // Clear the state after scrolling
        navigate(location.pathname, { replace: true });
      } else {
        console.warn(`Element with ID '${state.scrollTo}' not found`);
      }
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-dark">
      <div id={SCROLL_IDS.HOME}>
        <Hero />
      </div>
      <Benefits />
      <div id={SCROLL_IDS.HOW_IT_WORKS}>
        <HowItWorks />
      </div>
      <div id={SCROLL_IDS.FEATURES}>
        <Features />
      </div>
      <Testimonials />
      <div id={SCROLL_IDS.PRICING}>
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default Index;