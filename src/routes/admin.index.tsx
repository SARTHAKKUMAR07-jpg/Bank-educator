import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { blogPosts, currentAffairs } from "@/lib/mock-data";
import { Users, IndianRupee, FileText } from "lucide-react";

export const Route = createFileRoute("/admin/")({ component: AdminHome });

function AdminHome() {
  const stats = [
    { icon: Users, l: "Total Readers", v: "5,04,832" },
    { icon: IndianRupee, l: "Revenue (MTD)", v: "₹42.5L" },
    { icon: FileText, l: "News Articles", v: currentAffairs.length },
  ];
  return (
    <div>
      <h1 className="font-display text-3xl">Admin Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <Card key={s.l} className="p-5">
            <s.icon className="h-6 w-6 text-gold" />
            <div className="font-display text-2xl mt-3">{s.v}</div>
            <div className="text-xs text-muted-foreground">{s.l}</div>
          </Card>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Card className="p-6">
          <h2 className="font-display text-xl">Recent blog posts</h2>
          <div className="mt-3 space-y-2 text-sm">{blogPosts.slice(0,4).map(b => <div key={b.id} className="flex justify-between"><span className="truncate">{b.title}</span><span className="text-muted-foreground">{b.publishedAt}</span></div>)}</div>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-xl">Latest current affairs</h2>
          <div className="mt-3 space-y-2 text-sm">{currentAffairs.slice(0,4).map(a => <div key={a.id} className="flex justify-between"><span className="truncate">{a.title}</span><span className="text-muted-foreground">{a.date}</span></div>)}</div>
        </Card>
      </div>
    </div>
  );
}
