import { Target, Users, BookOpen, BarChart3, Clock, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Exam-Focused Approach",
    description: "Our curriculum is strictly aligned with the latest exam patterns of IBPS, SBI, and RBI."
  },
  {
    icon: Users,
    title: "Top 1% Faculty",
    description: "Learn from ex-bankers and educators with 10+ years of proven selection records."
  },
  {
    icon: BookOpen,
    title: "Premium Study Material",
    description: "Get access to crisp, updated notes, formula sheets, and daily GK capsules."
  },
  {
    icon: BarChart3,
    title: "AI-Powered Analytics",
    description: "Identify your weak areas instantly with our advanced mock test analysis system."
  },
  {
    icon: Clock,
    title: "24/7 Doubt Resolution",
    description: "Stuck on a problem? Get your doubts cleared by experts anytime, anywhere."
  },
  {
    icon: ShieldCheck,
    title: "Guaranteed Interview Prep",
    description: "Special personality development and mock interview sessions by panel experts."
  }
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Why Aspirants Trust <span className="text-primary">Bank Educator</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We don't just teach; we mentor you until you get your final selection letter. 
            Discover what makes us the best choice for banking exams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-background rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div className="h-14 w-14 rounded-xl hero-gradient flex items-center justify-center mb-6 text-gold shadow-inner">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
