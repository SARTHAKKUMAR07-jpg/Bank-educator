import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, TrendingUp, Award, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tests = [
  {
    title: "SBI PO Prelims 2024",
    totalTests: 150,
    freeTests: 2,
    users: "45k+",
  },
  {
    title: "IBPS PO Prelims 2024",
    totalTests: 120,
    freeTests: 2,
    users: "38k+",
  },
  {
    title: "RBI Grade B Phase 1",
    totalTests: 80,
    freeTests: 1,
    users: "22k+",
  },
  {
    title: "IBPS Clerk Prelims",
    totalTests: 100,
    freeTests: 3,
    users: "55k+",
  },
];

export function MockTestsSection() {
  return (
    <section className="py-24 bg-[color:var(--navy)] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold mb-6">
              <TrendingUp className="h-4 w-4" /> Exam-level Difficulty
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Test your preparation with <span className="text-gold">Real Exam Experience</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
              Our mock tests are designed by subject matter experts to exactly match the latest pattern and difficulty level of actual bank exams.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Detailed AI-driven performance analysis",
                "All India Ranking and percentile score",
                "Video solutions for difficult questions",
                "Bilingual format (English & Hindi)"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <CheckCircle2 className="h-6 w-6 text-gold shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-gold text-[color:var(--navy)] hover:bg-gold/90 font-semibold rounded-full w-full sm:w-auto transition-transform hover:-translate-y-1">
              <Link to="/mock-tests">
                Explore Test Series <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {tests.map((test, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group/card">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/30 flex items-center justify-center mb-4 text-gold group-hover/card:scale-110 transition-transform">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{test.title}</h3>
                  <div className="flex flex-col gap-1 text-sm text-white/70 mb-4">
                    <span>{test.totalTests} Total Tests</span>
                    <span>{test.users} Aspirants Enrolled</span>
                  </div>
                  <Button asChild variant="outline" className="w-full text-white group/btn">
                    <Link to="/mock-tests">
                      Attempt Free Test <ArrowRight className="h-4 w-4 ml-0 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:ml-2 group-hover/btn:translate-x-0 transition-all" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
