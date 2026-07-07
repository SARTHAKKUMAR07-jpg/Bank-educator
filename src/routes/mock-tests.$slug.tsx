import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { mockTests, quizzes } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, Circle, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/mock-tests/$slug")({
  loader: ({ params }) => {
    const test = mockTests.find(m => m.slug === params.slug);
    if (!test) throw notFound();
    // Reuse quiz1 questions repeated to fill the mock preview
    const bank = quizzes.flatMap(q => q.questions);
    const questions = Array.from({ length: Math.min(test.questions, 20) }).map((_, i) => bank[i % bank.length]);
    return { test, questions };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.test.title} — Mock Test` },
      { name: "description", content: `Attempt the ${loaderData.test.title} online with ${loaderData.test.questions} questions in ${loaderData.test.duration} minutes.` },
    ] : [{ title: "Mock Test" }],
  }),
  component: MockAttempt,
  notFoundComponent: () => <MarketingShell><div className="p-16 text-center">Test not found.</div></MarketingShell>,
});

function MockAttempt() {
  const data = Route.useLoaderData() as { test: (typeof mockTests)[number]; questions: any[] };
  const { test, questions } = data;
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(test.duration * 60);

  useEffect(() => {
    if (!started || submitted) return;
    const id = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) { clearInterval(id); setSubmitted(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, submitted]);

  const answered = Object.keys(answers).length;
  const score = questions.filter(q => answers[q.id] === q.correctIndex).length;
  const mm = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const ss = (secondsLeft % 60).toString().padStart(2, "0");

  if (!started) {
    return (
      <MarketingShell>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Badge variant="outline">{test.type}</Badge>
          <h1 className="mt-3 font-display text-3xl">{test.title}</h1>
          <Card className="mt-6 p-6">
            <h2 className="font-semibold">Instructions</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
              <li>Total {test.questions} questions · {test.duration} minutes · {test.marks} marks</li>
              <li>Each correct answer carries 1 mark. 0.25 marks negative for wrong answers.</li>
              <li>Once started, the timer cannot be paused.</li>
              <li>Ensure a stable internet connection.</li>
            </ul>
            <Button className="mt-6" size="lg" onClick={() => setStarted(true)}>I'm ready — Start Test</Button>
          </Card>
        </div>
      </MarketingShell>
    );
  }

  if (submitted) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <MarketingShell>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="text-center">
            <Trophy className="h-16 w-16 mx-auto text-gold" />
            <h1 className="mt-4 font-display text-3xl">Test Submitted</h1>
            <p className="text-muted-foreground">Great effort! Here's how you did.</p>
          </div>
          <Card className="mt-8 p-8 text-center">
            <div className="font-display text-6xl text-primary">{score}<span className="text-2xl text-muted-foreground">/{questions.length}</span></div>
            <div className="mt-2 text-muted-foreground">{percent}% accuracy</div>
            <Progress value={percent} className="mt-4" />
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
              <Stat label="Correct" value={score} />
              <Stat label="Wrong" value={answered - score} />
              <Stat label="Skipped" value={questions.length - answered} />
            </div>
          </Card>
          <div className="mt-6 space-y-3">
            {questions.map((q, i) => (
              <Card key={q.id} className="p-4">
                <div className="text-sm text-muted-foreground">Q{i + 1}</div>
                <div className="font-medium">{q.question}</div>
                <div className="mt-2 grid gap-1">
                  {q.options.map((o: string, oi: number) => {
                    const isCorrect = oi === q.correctIndex;
                    const isPicked = answers[q.id] === oi;
                    return (
                      <div key={oi} className={`text-sm px-3 py-1.5 rounded border ${isCorrect ? "bg-emerald-50 border-emerald-300" : isPicked ? "bg-red-50 border-red-300" : ""}`}>
                        {o} {isCorrect && "✓"} {!isCorrect && isPicked && "✗"}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{q.explanation}</div>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Button asChild><Link to="/mock-tests">Try another mock</Link></Button>
            <Button variant="outline" asChild><Link to="/dashboard">Go to Dashboard</Link></Button>
          </div>
        </div>
      </MarketingShell>
    );
  }

  const q = questions[current];

  return (
    <MarketingShell>
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Question {current + 1} of {questions.length}</div>
            <h1 className="font-display text-xl">{test.title}</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 font-mono">
            <Clock className="h-4 w-4" /> {mm}:{ss}
          </div>
        </div>
        <div className="grid md:grid-cols-[1fr_240px] gap-6 mt-6">
          <Card className="p-6">
            <div className="text-base font-medium">{q.question}</div>
            <div className="mt-4 grid gap-2">
              {q.options.map((o: string, oi: number) => (
                <button
                  key={oi}
                  onClick={() => setAnswers(a => ({ ...a, [q.id]: oi }))}
                  className={`text-left px-4 py-3 rounded-lg border transition ${answers[q.id] === oi ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + oi)}.</span>{o}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <Button variant="outline" disabled={current === 0} onClick={() => setCurrent(c => c - 1)}><ChevronLeft className="h-4 w-4 mr-1" /> Prev</Button>
              {current === questions.length - 1 ? (
                <Button onClick={() => setSubmitted(true)}>Submit Test</Button>
              ) : (
                <Button onClick={() => setCurrent(c => c + 1)}>Next <ChevronRight className="h-4 w-4 ml-1" /></Button>
              )}
            </div>
          </Card>
          <Card className="p-4 h-fit">
            <div className="text-sm font-semibold">Question Palette</div>
            <div className="mt-3 grid grid-cols-5 gap-1.5">
              {questions.map((qq, i) => (
                <button
                  key={qq.id}
                  onClick={() => setCurrent(i)}
                  className={`h-8 w-8 text-xs rounded grid place-items-center border ${current === i ? "ring-2 ring-primary" : ""} ${answers[qq.id] !== undefined ? "bg-emerald-500 text-white border-emerald-500" : "bg-muted"}`}
                >{i + 1}</button>
              ))}
            </div>
            <div className="mt-4 text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Answered</div>
              <div className="flex items-center gap-2"><Circle className="h-3 w-3" /> Not visited</div>
            </div>
            <Button variant="destructive" className="w-full mt-4" onClick={() => setSubmitted(true)}>Submit Test</Button>
          </Card>
        </div>
      </div>
    </MarketingShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-display text-2xl">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
