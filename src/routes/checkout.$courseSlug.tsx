import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { courses } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ShieldCheck, CreditCard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout/$courseSlug")({
  loader: ({ params }) => {
    const course = courses.find(c => c.slug === params.courseSlug);
    if (!course) throw notFound();
    return { course };
  },
  head: () => ({ meta: [{ title: "Checkout — Bank Educator" }] }),
  component: Checkout,
  notFoundComponent: () => <MarketingShell><div className="p-16 text-center">Course not found.</div></MarketingShell>,
});

function Checkout() {
  const { course } = Route.useLoaderData() as { course: (typeof courses)[number] };
  const nav = useNavigate();
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const tax = Math.round(course.price * 0.18);
  const total = course.price + tax;

  return (
    <MarketingShell>
      <div className="mx-auto max-w-5xl px-6 py-12 grid md:grid-cols-[1fr_400px] gap-8">
        <div>
          <h1 className="font-display text-3xl">Checkout</h1>
          <Card className="mt-6 p-6">
            <h2 className="font-semibold">Billing details</h2>
            <div className="mt-4 grid gap-3">
              <div><Label>Full name</Label><Input required defaultValue="" /></div>
              <div><Label>Email</Label><Input type="email" required /></div>
              <div><Label>Phone</Label><Input type="tel" required /></div>
            </div>
          </Card>
          <Card className="mt-4 p-6">
            <h2 className="font-semibold">Payment method</h2>
            <RadioGroup value={method} onValueChange={setMethod} className="mt-4 grid gap-3">
              {[
                { v: "upi", l: "UPI (Google Pay / PhonePe / Paytm)" },
                { v: "card", l: "Credit / Debit Card" },
                { v: "netbanking", l: "Netbanking" },
              ].map(o => (
                <label key={o.v} className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer ${method === o.v ? "border-primary bg-primary/5" : ""}`}>
                  <RadioGroupItem value={o.v} id={o.v} />
                  <span>{o.l}</span>
                </label>
              ))}
            </RadioGroup>
          </Card>
        </div>
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="font-semibold">Order summary</h2>
            <div className="mt-4 flex gap-3">
              <img src={course.thumbnail} className="h-16 w-24 rounded object-cover" alt="" />
              <div>
                <div className="font-medium text-sm line-clamp-2">{course.title}</div>
                <div className="text-xs text-muted-foreground">{course.duration}</div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <Row l="Course price" v={`₹${course.price}`} />
              <Row l="GST (18%)" v={`₹${tax}`} />
              <div className="border-t pt-2 flex justify-between font-semibold"><span>Total</span><span className="text-primary font-display text-xl">₹{total}</span></div>
            </div>
            <Button className="w-full mt-5" size="lg" disabled={processing} onClick={() => {
              setProcessing(true);
              setTimeout(() => { toast.success("Payment successful! Welcome aboard."); nav({ to: "/dashboard" }); }, 1200);
            }}>{processing ? "Processing…" : <><CreditCard className="h-4 w-4 mr-2" /> Pay ₹{total}</>}</Button>
            <div className="mt-3 text-xs text-muted-foreground flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Secured by 256-bit SSL. 7-day refund.</div>
          </Card>
        </div>
      </div>
    </MarketingShell>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return <div className="flex justify-between"><span className="text-muted-foreground">{l}</span><span>{v}</span></div>;
}
