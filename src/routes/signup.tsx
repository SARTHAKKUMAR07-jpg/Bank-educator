import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Bank Educator" }] }),
  component: SignupPage,
});

function SignupPage() {
  const { signup } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", pw: "" });
  const [loading, setLoading] = useState(false);
  return (
    <MarketingShell>
      <div className="mx-auto max-w-md px-6 py-16">
        <Card className="p-8">
          <h1 className="font-display text-3xl">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">7-day free trial · no card required.</p>
          <form onSubmit={async (e) => {
            e.preventDefault(); setLoading(true);
            await signup(f.name, f.email, f.pw); setLoading(false);
            toast.success("Welcome to Bank Educator!");
            nav({ to: "/dashboard" });
          }} className="mt-6 space-y-3">
            <div><Label>Full name</Label><Input required value={f.name} onChange={e=>setF({...f,name:e.target.value})} /></div>
            <div><Label>Email</Label><Input type="email" required value={f.email} onChange={e=>setF({...f,email:e.target.value})} /></div>
            <div><Label>Password</Label><Input type="password" required value={f.pw} onChange={e=>setF({...f,pw:e.target.value})} /></div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>
          </form>
          <div className="mt-6 text-sm text-center">Already have an account? <Link to="/login" className="text-primary underline">Log in</Link></div>
        </Card>
      </div>
    </MarketingShell>
  );
}
