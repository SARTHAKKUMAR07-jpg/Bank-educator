import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { quizzes } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

export const Route = createFileRoute("/quizzes/")({
  head: () => ({ meta: [
    { title: "Free Daily Quizzes — Bank Educator" },
    { name: "description", content: "Sharpen your skills with daily banking awareness, quant, reasoning and English quizzes." },
  ] }),
  component: QuizzesPage,
});

function QuizzesPage() {
  return (
    <MarketingShell>
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-4xl md:text-5xl">Free Daily <span className="text-gold">Quizzes</span></h1>
          <p className="mt-3 text-white/85 max-w-2xl">Bite-sized quizzes to keep your basics sharp — every single day.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map(q => (
          <Card key={q.id} className="p-5">
            <div className="h-11 w-11 rounded-lg gold-gradient grid place-items-center">
              <Brain className="h-5 w-5 text-[color:var(--navy)]" />
            </div>
            <Badge variant="outline" className="mt-4">{q.topic}</Badge>
            <h3 className="mt-2 font-display text-lg">{q.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{q.questions.length} questions · Free</p>
            <Button className="mt-4 w-full" asChild><Link to="/quizzes/$slug" params={{ slug: q.slug }}>Start Quiz</Link></Button>
          </Card>
        ))}
      </section>
    </MarketingShell>
  );
}
