import { createFileRoute, Link } from "@tanstack/react-router";
import { mockTests } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/tests")({ component: MyTests });

function MyTests() {
  return (
    <div>
      <h1 className="font-display text-3xl">My Tests</h1>
      <p className="text-muted-foreground text-sm">Attempts, scores and analytics.</p>
      <div className="mt-6 space-y-3">
        {mockTests.slice(0,5).map((m, i) => (
          <Card key={m.id} className="p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="font-medium">{m.title}</div>
              <div className="text-xs text-muted-foreground">{m.exam} · Attempted {i+1} day{i?'s':''} ago</div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{60+i*3}/100</Badge>
            <Button variant="outline" size="sm" asChild><Link to="/mock-tests/$slug" params={{slug:m.slug}}>Re-attempt</Link></Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
