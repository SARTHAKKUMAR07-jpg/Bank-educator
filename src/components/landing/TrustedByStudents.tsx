import { Trophy, Star, Users, ShieldCheck } from "lucide-react";

export function TrustedByStudents() {
  return (
    <section className="py-12 border-b border-border/40 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
          Trusted by 5 Lakh+ Banking Aspirants Across India
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
          <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-default">
            <Trophy className="h-8 w-8 text-gold" />
            <span className="font-display font-bold text-lg text-foreground">42,000+ Selections</span>
          </div>
          <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-default">
            <Star className="h-8 w-8 text-gold fill-gold" />
            <span className="font-display font-bold text-lg text-foreground">4.9/5 Average Rating</span>
          </div>
          <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-default">
            <Users className="h-8 w-8 text-gold" />
            <span className="font-display font-bold text-lg text-foreground">Top 1% Educators</span>
          </div>
          <div className="flex flex-col items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-default">
            <ShieldCheck className="h-8 w-8 text-gold" />
            <span className="font-display font-bold text-lg text-foreground">100% Updated Content</span>
          </div>
        </div>
      </div>
    </section>
  );
}
