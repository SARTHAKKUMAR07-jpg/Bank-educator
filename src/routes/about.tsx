import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card } from "@/components/ui/card";
import { Trophy, Users, GraduationCap, Target } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us — Bank Educator" },
    { name: "description", content: "Learn why Bank Educator is India's most trusted banking exam preparation platform." },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MarketingShell>
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-display text-4xl md:text-5xl">On a mission to <span className="text-gold">democratise</span> banking coaching</h1>
          <p className="mt-4 text-white/85">We started Bank Educator in 2019 with a single classroom in Delhi. Today we train 5 lakh+ aspirants across India.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-6 md:grid-cols-4">
        {[
          { icon: Users, k: "5L+", l: "Aspirants trained" },
          { icon: Trophy, k: "42K+", l: "Selections" },
          { icon: GraduationCap, k: "120+", l: "Expert Faculty" },
          { icon: Target, k: "98%", l: "Renewal rate" },
        ].map(s => (
          <Card key={s.l} className="p-6 text-center">
            <s.icon className="h-8 w-8 mx-auto text-gold" />
            <div className="mt-3 font-display text-3xl">{s.k}</div>
            <div className="text-sm text-muted-foreground">{s.l}</div>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10 space-y-6">
        <Section id="story" title="Our story">
          Bank Educator was founded by a group of ex-bankers and top rankers who wanted to build the coaching institute they wished they had as students. Fast, honest, affordable and outrageously effective.
        </Section>
        <Section id="careers" title="Careers">
          We're always looking for exceptional faculty and mentors. Write to us at careers@bankeducator.example.
        </Section>
        <Section id="refund" title="Refund policy">
          Every course carries a 7-day full-refund guarantee, no questions asked.
        </Section>
        <Section id="terms" title="Terms of use">
          By using Bank Educator you agree to our fair-use and content policies. Course content is licensed strictly for personal use.
        </Section>
        <Section id="privacy" title="Privacy policy">
          We collect the minimum data needed to run your account. We never sell your data.
        </Section>
      </section>
    </MarketingShell>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-2 text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
