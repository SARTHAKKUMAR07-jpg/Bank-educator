import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Bank Educator" }, { name: "description", content: "Get in touch with the Bank Educator team." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  return (
    <MarketingShell>
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center">
          <h1 className="font-display text-4xl md:text-5xl">Talk to <span className="text-gold">us</span></h1>
          <p className="mt-3 text-white/85">Our team responds within 24 hours on business days.</p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-12 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: Mail, l: "Email", v: "hello@bankeducator.example" },
            { icon: Phone, l: "Phone", v: "+91 98100 00000" },
            { icon: MapPin, l: "Address", v: "Connaught Place, New Delhi 110001" },
          ].map(x => (
            <Card key={x.l} className="p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-lg gold-gradient grid place-items-center"><x.icon className="h-5 w-5 text-[color:var(--navy)]" /></div>
              <div><div className="text-xs text-muted-foreground">{x.l}</div><div className="font-medium">{x.v}</div></div>
            </Card>
          ))}
        </div>
        <Card className="p-6">
          <form onSubmit={(e) => { e.preventDefault(); setSending(true); setTimeout(() => { setSending(false); toast.success("Message sent!"); (e.target as HTMLFormElement).reset(); }, 700); }} className="space-y-3">
            <Input name="name" placeholder="Your name" required />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="subject" placeholder="Subject" required />
            <Textarea name="message" placeholder="Your message…" rows={5} required />
            <Button type="submit" className="w-full" disabled={sending}>{sending ? "Sending…" : "Send message"}</Button>
          </form>
        </Card>
      </section>
    </MarketingShell>
  );
}
