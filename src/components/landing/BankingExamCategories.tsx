import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Building, Landmark, ShieldCheck, TrendingUp, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: "SBI Exams",
    description: "SBI PO, SBI Clerk, SBI CBO",
    icon: Landmark,
    color: "bg-blue-500/10 text-blue-600",
    hover: "hover:border-blue-500/50 hover:shadow-blue-500/10",
  },
  {
    title: "IBPS Exams",
    description: "IBPS PO, Clerk, RRB PO, RRB Clerk",
    icon: Building2,
    color: "bg-indigo-500/10 text-indigo-600",
    hover: "hover:border-indigo-500/50 hover:shadow-indigo-500/10",
  },
  {
    title: "RBI Exams",
    description: "RBI Grade B, RBI Assistant",
    icon: TrendingUp,
    color: "bg-emerald-500/10 text-emerald-600",
    hover: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
  },
  {
    title: "Insurance",
    description: "LIC AAO, LIC ADO, NIACL AO",
    icon: ShieldCheck,
    color: "bg-rose-500/10 text-rose-600",
    hover: "hover:border-rose-500/50 hover:shadow-rose-500/10",
  },
  {
    title: "Regulatory Bodies",
    description: "NABARD Grade A, SEBI Grade A",
    icon: Building,
    color: "bg-amber-500/10 text-amber-600",
    hover: "hover:border-amber-500/50 hover:shadow-amber-500/10",
  },
  {
    title: "Other Exams",
    description: "SSC CGL, SSC CHSL, Railways",
    icon: Briefcase,
    color: "bg-purple-500/10 text-purple-600",
    hover: "hover:border-purple-500/50 hover:shadow-purple-500/10",
  },
];

export function BankingExamCategories() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Explore <span className="text-primary">Exam Categories</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose your target exam and find the perfect learning path tailored specifically for it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <Link key={i} to="/courses" className="group">
                <Card className={`h-full border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${cat.hover}`}>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-5 ${cat.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold font-display mb-2">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm flex-1">{cat.description}</p>
                    <div className="mt-6 flex items-center text-primary font-medium text-sm group-hover:text-gold transition-colors">
                      View Courses <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
