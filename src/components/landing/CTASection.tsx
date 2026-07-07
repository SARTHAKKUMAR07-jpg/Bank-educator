import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[color:var(--navy)]"></div>
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-4xl px-6 relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
          Ready to Start Your Banking Career?
        </h2>
        <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
          Join India's most trusted exam preparation platform. Get access to expert-led classes, 
          premium mock tests, and personalized mentorship today.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-14 px-8 text-lg bg-gold text-[color:var(--navy)] hover:bg-gold/90 font-semibold rounded-full w-full sm:w-auto transition-transform hover:-translate-y-1">
            <Link to="/signup">
              Enroll Now for Free
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg text-white rounded-full w-full sm:w-auto transition-transform hover:-translate-y-1">
            <Link to="/contact">
              Talk to an Expert
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
