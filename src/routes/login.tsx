import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Bank Educator" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <MarketingShell>
      <div className="mx-auto max-w-md px-6 py-16">
        <Card className="p-8">
          <h1 className="font-display text-3xl">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Log in to continue your prep.</p>
          <form onSubmit={async (e) => {
            e.preventDefault(); setLoading(true);
            const u = await login(email, pw); setLoading(false);
            toast.success("Logged in");
            nav({ to: u.role === "admin" ? "/admin" : "/dashboard" });
          }} className="mt-6 space-y-3">
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" /></div>
            <div><Label htmlFor="pw">Password</Label><Input id="pw" type="password" required value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" /></div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Logging in…" : "Log in"}</Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">Tip: use <code className="bg-muted px-1 rounded">admin@bankeducator.com</code> for admin access.</p>
          <div className="mt-6 text-sm text-center">No account? <Link to="/signup" className="text-primary underline">Sign up</Link></div>
        </Card>
      </div>
    </MarketingShell>
  );
}
