import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-dark/50 border-t border-white/10 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-exo gradient-text">GainWise</h3>
            <p className="text-gray-400">
              Your trusted companion for smart crypto trading and profit-taking strategies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Swap Feature Highlight */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Need to Swap Tokens Instantly?</h4>
            <p className="text-gray-400">
              Experience seamless token swaps with our built-in DEX integration.
            </p>
            <Button 
              className="bg-accent hover:bg-accent-dark text-dark font-semibold glow w-full sm:w-auto"
              size="sm"
            >
              Try Our Built-In Swap
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}