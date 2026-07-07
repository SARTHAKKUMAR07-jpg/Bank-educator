import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { mockTests } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Clock, Users } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/mock-tests/")({
  head: () => ({ meta: [
    { title: "Free & Premium Mock Tests — Bank Educator" },
    { name: "description", content: "1,200+ mock tests for SBI PO, IBPS PO, RBI Grade B, SBI Clerk with detailed solutions and analytics." },
  ] }),
  component: MockTestsPage,
});

const tabs = ["All", "SBI PO", "IBPS PO", "SBI Clerk", "IBPS Clerk", "RBI Grade B", "LIC AAO"] as const;

function MockTestsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = mockTests.filter(m => tab === "All" || m.exam === tab);

  return (
    <MarketingShell>
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-4xl md:text-5xl">Mock Tests · <span className="text-gold">practice like exam day</span></h1>
          <p className="mt-3 text-white/85 max-w-2xl">Sectional, full-length and PYQ mocks with detailed solutions and topic-wise analysis.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex gap-2 flex-wrap">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${tab === t ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary"}`}
            >{t}</button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {list.map(m => (
            <Card key={m.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="outline">{m.type}</Badge>
                  <h3 className="mt-2 font-display text-lg">{m.title}</h3>
                  <div className="mt-2 text-xs text-muted-foreground flex flex-wrap gap-3">
                    <span className="flex items-center gap-1"><ClipboardCheck className="h-3 w-3" /> {m.questions} questions</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {m.duration} min</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {m.attempts.toLocaleString()} attempts</span>
                  </div>
                </div>
                {m.isFree ? <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Free</Badge> : <Badge className="bg-gold text-[color:var(--navy)]">Premium</Badge>}
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild className="flex-1"><Link to="/mock-tests/$slug" params={{ slug: m.slug }}>{m.isFree ? "Start Test" : "Preview"}</Link></Button>
                <Button variant="outline" asChild>
                  <Link to="/mock-tests/$slug" params={{ slug: m.slug }}>Instructions</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
