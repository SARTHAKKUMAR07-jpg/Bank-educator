import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { currentAffairs } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/current-affairs")({
  head: () => ({ meta: [
    { title: "Daily Current Affairs — Bank Educator" },
    { name: "description", content: "Curated daily current affairs for banking, insurance and government exam aspirants." },
  ] }),
  component: CurrentAffairsPage,
});

const cats = ["All", "Banking", "Economy", "International", "National", "Awards", "Sports"] as const;

function CurrentAffairsPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = currentAffairs.filter(a =>
    (cat === "All" || a.category === cat) &&
    (a.title + a.summary).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <MarketingShell>
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-4xl md:text-5xl">Daily <span className="text-gold">Current Affairs</span></h1>
          <p className="mt-3 text-white/85 max-w-2xl">Curated banking, economy, international and awards news — exam-ready every morning.</p>
          <div className="mt-6 max-w-md relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
            <Input placeholder="Search current affairs…" value={q} onChange={e => setQ(e.target.value)} className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/60" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex gap-2 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm border transition ${cat === c ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary"}`}>{c}</button>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          {filtered.map(a => (
            <Card key={a.id} className="p-5">
              <div className="flex items-center gap-3 text-xs">
                <Badge variant="secondary">{a.category}</Badge>
                <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-3 w-3" /> {a.date}</span>
                <span className="text-muted-foreground">· Source: {a.source}</span>
              </div>
              <h2 className="mt-2 font-display text-xl">{a.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{a.summary}</p>
            </Card>
          ))}
          {filtered.length === 0 && <div className="text-center py-10 text-muted-foreground">No news matches your search.</div>}
        </div>
      </section>
    </MarketingShell>
  );
}
