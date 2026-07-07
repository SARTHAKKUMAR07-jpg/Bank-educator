import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";

const stories = [
  {
    name: "Priya Sharma",
    exam: "SBI PO 2023",
    quote: "Bank Educator's live classes and especially the interview batch played a huge role in my selection. The faculty is incredibly supportive.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Rohan Patel",
    exam: "IBPS PO 2023",
    quote: "The mock test analysis helped me identify my weak areas in Reasoning. I improved my score by 20 marks in just 2 months.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Anjali Desai",
    exam: "RBI Grade B 2022",
    quote: "For RBI Grade B phase 2, the descriptive writing evaluation by expert faculty was the game changer for me. Highly recommended!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];

export function SuccessStories() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Hear from our <span className="text-primary">Selected Candidates</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Over 50,000 students have realized their dream of becoming a banker with us. 
            Here is what some of them have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="bg-background rounded-2xl p-8 border border-border shadow-sm relative mt-8">
              <div className="absolute -top-10 left-8">
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-20 h-20 rounded-full border-4 border-background object-cover bg-secondary"
                />
              </div>
              <div className="mt-8">
                <div className="text-gold text-4xl font-serif leading-none mb-4">"</div>
                <p className="text-muted-foreground italic mb-6 leading-relaxed">
                  {story.quote}
                </p>
                <div>
                  <h4 className="font-bold text-foreground">{story.name}</h4>
                  <p className="text-sm text-primary font-medium">{story.exam}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
