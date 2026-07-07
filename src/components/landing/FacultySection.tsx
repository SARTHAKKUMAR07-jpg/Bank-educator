import { Linkedin, Twitter } from "lucide-react";

const faculty = [
  {
    name: "Rahul Sharma",
    subject: "Quantitative Aptitude",
    experience: "12+ Years Exp.",
    description: "Ex-SBI PO. Mentored 10,000+ selected students. Known for his short tricks and DI mastery.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Priya Singh",
    subject: "Reasoning Ability",
    experience: "8+ Years Exp.",
    description: "Expert in puzzles and seating arrangements. Her logical approach makes reasoning the highest scoring section.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Vikram Aditya",
    subject: "English & General Awareness",
    experience: "10+ Years Exp.",
    description: "Simplifies Hindu editorials and banking awareness. His daily GK capsules are highly rated.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
  }
];

export function FacultySection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Learn from <span className="text-primary">India's Best Faculty</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our educators have cleared multiple banking exams and bring years of teaching experience to guide you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {faculty.map((member, i) => (
            <div key={i} className="bg-background rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-all text-center pb-8">
              <div className="h-32 bg-primary/5 w-full relative mb-12">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full border-4 border-background object-cover absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                />
              </div>
              <div className="px-6">
                <h3 className="text-xl font-bold font-display mb-1">{member.name}</h3>
                <p className="text-gold font-medium text-sm mb-2">{member.subject} • {member.experience}</p>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  {member.description}
                </p>
                <div className="flex justify-center gap-3">
                  <a href="#" className="h-8 w-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" className="h-8 w-8 rounded-full bg-secondary text-muted-foreground flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
