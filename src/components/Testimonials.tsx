import { Card, CardContent } from "./ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "This app helped me recover my investments without overthinking!",
    author: "User A",
    role: "Crypto Trader"
  },
  {
    quote: "The signals are on point and make decision-making stress-free.",
    author: "User B",
    role: "DeFi Enthusiast"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold font-exo text-center mb-16">
          What Our <span className="gradient-text">Users Say</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glass-card glow">
              <CardContent className="p-8">
                <Quote className="h-8 w-8 text-primary mb-6" />
                <p className="text-xl mb-6 text-gray-300">{testimonial.quote}</p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-primary">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}