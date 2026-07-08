import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { currentAffairs } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { BookOpen, TrendingUp, Newspaper, Flame } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { user } = useAuth();
  const stats = [
    { icon: BookOpen, l: "Articles Read", v: 45 },
    { icon: Newspaper, l: "News Updates", v: 12 },
    { icon: Flame, l: "Current Streak", v: "7 Days" },
    { icon: TrendingUp, l: "Rank Percentile", v: "Top 18%" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Welcome back, {user?.name.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground text-sm">Here's your reading snapshot.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <Card key={s.l} className="p-5">
            <s.icon className="h-6 w-6 text-gold" />
            <div className="mt-3 font-display text-2xl">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </Card>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 md:col-span-2">
          <h2 className="font-display text-xl">Today's affairs</h2>
          <div className="mt-3 space-y-2">
            {currentAffairs.slice(0,4).map(a => (
              <div key={a.id} className="rounded-md p-3 hover:bg-muted border border-transparent hover:border-border cursor-pointer transition-colors">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.category} · {a.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
