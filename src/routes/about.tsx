import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card } from "@/components/ui/card";
import { BookOpen, Newspaper, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us — Bank Educator News" },
    { name: "description", content: "Learn why Bank Educator is India's most trusted banking news and current affairs portal." },
  ] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MarketingShell>
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-display text-4xl md:text-5xl">Your trusted source for <span className="text-gold">banking news</span></h1>
          <p className="mt-4 text-white/85 text-lg">Delivering accurate, timely, and comprehensive updates for banking professionals and aspirants.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-6 md:grid-cols-4">
        {[
          { icon: Newspaper, k: "10K+", l: "Articles Published" },
          { icon: ShieldCheck, k: "100%", l: "Trusted Information" },
          { icon: BookOpen, k: "Daily", l: "Current Affairs" },
          { icon: Zap, k: "24/7", l: "News Coverage" },
        ].map(s => (
          <Card key={s.l} className="p-6 text-center shadow-md border-border/40">
            <s.icon className="h-8 w-8 mx-auto text-gold" />
            <div className="mt-3 font-display text-3xl font-bold">{s.k}</div>
            <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
          </Card>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        <Section id="who-we-are" title="Who we are">
          Bank Educator is India's premium digital news portal dedicated exclusively to the banking sector. We provide comprehensive coverage of RBI updates, banking industry shifts, and critical financial news that shapes the economy.
        </Section>
        <Section id="mission" title="Our Mission">
          Our mission is to empower banking professionals, job aspirants, and financial enthusiasts with accurate, unbiased, and fast news. In a rapidly evolving financial world, we strive to be your most reliable source of truth.
        </Section>
        <Section id="why-choose-us" title="Why Bank Educator">
          We focus purely on quality journalism and factual reporting. Our dedicated team tracks the latest regulatory changes, bank notifications, and macroeconomic trends so you don't have to search multiple sources. 
        </Section>
        <Section id="what-you-get" title="What users get">
          Our readers get instant access to <strong>Banking News Coverage</strong>, <strong>Daily Current Affairs</strong>, and <strong>Trusted Information</strong>. Whether you're tracking the latest repo rate, SBI announcements, or global financial trends, Bank Educator brings the news directly to you.
        </Section>
        <Section id="terms" title="Terms &amp; Conditions">
          By using Bank Educator you agree to our fair-use policies. Our news content is provided for informational purposes only.
        </Section>
        <Section id="privacy" title="Privacy policy">
          We respect your privacy. We collect the minimum data needed to provide you with personalized news updates and we never sell your data to third parties.
        </Section>
      </section>
    </MarketingShell>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-20">
      <h2 className="font-display text-2xl font-bold border-b border-border/40 pb-2 mb-4">{title}</h2>
      <p className="text-muted-foreground leading-relaxed text-lg">{children}</p>
    </div>
  );
}
