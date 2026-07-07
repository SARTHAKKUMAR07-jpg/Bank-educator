import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { courses } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "All Courses — Bank Educator" },
      { name: "description", content: "Browse premium banking exam courses: SBI PO, IBPS PO, RBI Grade B, SBI Clerk and more." },
    ],
  }),
  component: CoursesPage,
});

const categories = ["All", "SBI PO", "IBPS PO", "SBI Clerk", "IBPS Clerk", "RBI Grade B", "Insurance"] as const;

function CoursesPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = courses.filter(c =>
    (cat === "All" || c.category === cat) &&
    c.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <MarketingShell>
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h1 className="font-display text-4xl md:text-5xl">Courses that <span className="text-gold">get results</span></h1>
          <p className="mt-3 text-white/85 max-w-2xl">Live + recorded classes, structured DPPs, mocks and mentor support — for every major banking exam.</p>
          <div className="mt-6 max-w-md relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search a course…" className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${cat === c ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(c => (
            <Card key={c.id} className="overflow-hidden group py-0">
              <div className="aspect-[16/9] overflow-hidden relative">
                <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                <Badge className="absolute top-3 left-3 bg-gold text-[color:var(--navy)]">{c.category}</Badge>
              </div>
              <CardContent className="p-5">
                <h3 className="font-display text-lg leading-snug line-clamp-2 h-14">{c.title}</h3>
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                  <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-gold text-gold" /> {c.rating}</span>
                  <span>· {c.students.toLocaleString()} students</span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="font-display text-2xl text-primary">₹{c.price}</div>
                    <div className="text-xs text-muted-foreground line-through">₹{c.mrp}</div>
                  </div>
                  <Button size="sm" asChild><Link to="/courses/$slug" params={{ slug: c.slug }}>Details <ChevronRight className="h-4 w-4 ml-1" /></Link></Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-14 text-muted-foreground">No courses match your filters.</div>
          )}
        </div>
      </section>
    </MarketingShell>
  );
}
