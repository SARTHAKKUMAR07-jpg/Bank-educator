import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { courses, mockTests, currentAffairs } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ClipboardCheck, Trophy, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { user } = useAuth();
  const enrolled = courses.filter(c => user?.enrolledCourseIds.includes(c.id));
  const stats = [
    { icon: BookOpen, l: "Enrolled Courses", v: enrolled.length },
    { icon: ClipboardCheck, l: "Tests Attempted", v: 12 },
    { icon: Trophy, l: "Avg Score", v: "72%" },
    { icon: TrendingUp, l: "Rank Percentile", v: "Top 18%" },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Welcome back, {user?.name.split(" ")[0]} 👋</h1>
        <p className="text-muted-foreground text-sm">Here's your prep snapshot.</p>
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
      <Card className="p-6">
        <div className="flex justify-between items-center"><h2 className="font-display text-xl">Continue learning</h2><Button variant="ghost" asChild><Link to="/dashboard/courses">View all</Link></Button></div>
        {enrolled.length === 0 ? (
          <div className="mt-4 text-sm text-muted-foreground">You haven't enrolled in any courses yet. <Link to="/courses" className="text-primary underline">Browse courses</Link>.</div>
        ) : (
          <div className="mt-4 space-y-3">
            {enrolled.slice(0, 3).map(c => (
              <div key={c.id} className="flex gap-3 items-center">
                <img src={c.thumbnail} className="h-14 w-20 rounded object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{c.title}</div>
                  <Progress value={35} className="mt-1 h-1.5" />
                </div>
                <Button size="sm" asChild><Link to="/courses/$slug" params={{slug:c.slug}}>Resume</Link></Button>
              </div>
            ))}
          </div>
        )}
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h2 className="font-display text-xl">Recommended mocks</h2>
          <div className="mt-3 space-y-2">
            {mockTests.slice(0,4).map(m => (
              <Link key={m.id} to="/mock-tests/$slug" params={{slug:m.slug}} className="flex justify-between items-center rounded-md hover:bg-muted p-2">
                <div className="min-w-0"><div className="text-sm font-medium truncate">{m.title}</div><div className="text-xs text-muted-foreground">{m.exam} · {m.duration} min</div></div>
                {m.isFree ? <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Free</Badge> : <Badge variant="outline">₹49</Badge>}
              </Link>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-xl">Today's affairs</h2>
          <div className="mt-3 space-y-2">
            {currentAffairs.slice(0,4).map(a => (
              <div key={a.id} className="rounded-md p-2 hover:bg-muted">
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.category} · {a.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
