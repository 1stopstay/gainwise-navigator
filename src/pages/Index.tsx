import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Index page mounted"); // Debug log
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  console.log("Rendering Index page"); // Debug log

  return (
    <main className="flex flex-col min-h-screen bg-dark">
      <Hero />
      <Benefits />
      <HowItWorks />
      <Features />
      <div className="container mx-auto px-4">
        <Testimonials />
      </div>
      <div className="container mx-auto px-4 py-16">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
};

export default Index;