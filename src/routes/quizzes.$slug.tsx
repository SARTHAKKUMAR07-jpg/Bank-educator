import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { quizzes } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { CheckCircle2, Trophy } from "lucide-react";

export const Route = createFileRoute("/quizzes/$slug")({
  loader: ({ params }) => {
    const quiz = quizzes.find(q => q.slug === params.slug);
    if (!quiz) throw notFound();
    return { quiz };
  },
  head: ({ loaderData }) => ({ meta: [{ title: loaderData ? `${loaderData.quiz.title} — Quiz` : "Quiz" }] }),
  component: QuizAttempt,
  notFoundComponent: () => <MarketingShell><div className="p-16 text-center">Quiz not found.</div></MarketingShell>,
});

function QuizAttempt() {
  const { quiz } = Route.useLoaderData() as { quiz: (typeof quizzes)[number] };
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = quiz.questions.filter(q => answers[q.id] === q.correctIndex).length;

  return (
    <MarketingShell>
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link to="/quizzes" className="text-sm text-muted-foreground hover:text-primary">← All quizzes</Link>
        <h1 className="mt-2 font-display text-3xl">{quiz.title}</h1>

        {submitted ? (
          <>
            <Card className="mt-6 p-8 text-center">
              <Trophy className="mx-auto h-14 w-14 text-gold" />
              <div className="mt-3 font-display text-5xl text-primary">{score}<span className="text-2xl text-muted-foreground">/{quiz.questions.length}</span></div>
              <Progress value={(score / quiz.questions.length) * 100} className="mt-4" />
            </Card>
            <div className="mt-6 space-y-3">
              {quiz.questions.map((q, i) => (
                <Card key={q.id} className="p-4">
                  <div className="text-xs text-muted-foreground">Q{i + 1}</div>
                  <div className="font-medium">{q.question}</div>
                  <div className="mt-2 grid gap-1 text-sm">
                    {q.options.map((o, oi) => {
                      const isCorrect = oi === q.correctIndex;
                      const isPicked = answers[q.id] === oi;
                      return (
                        <div key={oi} className={`px-3 py-1.5 rounded border ${isCorrect ? "bg-emerald-50 border-emerald-300" : isPicked ? "bg-red-50 border-red-300" : ""}`}>{o} {isCorrect && "✓"}</div>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{q.explanation}</p>
                </Card>
              ))}
            </div>
            <Button className="mt-6" onClick={() => { setAnswers({}); setSubmitted(false); }}>Retry</Button>
          </>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              {quiz.questions.map((q, i) => (
                <Card key={q.id} className="p-5">
                  <div className="text-xs text-muted-foreground">Q{i + 1} / {quiz.questions.length}</div>
                  <div className="mt-1 font-medium">{q.question}</div>
                  <div className="mt-3 grid gap-2">
                    {q.options.map((o, oi) => {
                      const picked = answers[q.id] === oi;
                      return (
                        <button key={oi} onClick={() => setAnswers(a => ({ ...a, [q.id]: oi }))}
                          className={`text-left px-3 py-2 rounded-lg border text-sm ${picked ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}>
                          <span className="font-semibold mr-2">{String.fromCharCode(65 + oi)}.</span>{o}
                          {picked && <CheckCircle2 className="inline h-4 w-4 ml-2 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
            <Button className="mt-6" size="lg" onClick={() => setSubmitted(true)}>Submit Quiz</Button>
          </>
        )}
      </div>
    </MarketingShell>
  );
}
