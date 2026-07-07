import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { currentAffairs } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/current-affairs")({ component: AdminCA });

function AdminCA() {
  return (
    <div>
      <h1 className="font-display text-3xl">Current Affairs</h1>
      <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6">
        <Card className="p-5">
          <div className="font-semibold">All entries</div>
          <div className="mt-4 space-y-3">
            {currentAffairs.map(a => (
              <div key={a.id} className="rounded border p-3">
                <div className="flex items-center gap-2 text-xs"><Badge variant="secondary">{a.category}</Badge><span className="text-muted-foreground">{a.date}</span></div>
                <div className="mt-1 font-medium text-sm">{a.title}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 h-fit">
          <div className="font-semibold">Add news</div>
          <form onSubmit={(e)=>{e.preventDefault();toast.success("Added (demo)");}} className="mt-4 space-y-3">
            <div><Label>Title</Label><Input required /></div>
            <div><Label>Category</Label><Input required /></div>
            <div><Label>Summary</Label><Textarea rows={4} required /></div>
            <div><Label>Source</Label><Input required /></div>
            <Button type="submit" className="w-full">Publish</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
