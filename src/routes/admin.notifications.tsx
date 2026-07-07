import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/notifications")({ component: AdminNotifs });

function AdminNotifs() {
  return (
    <div>
      <h1 className="font-display text-3xl">Broadcast Notification</h1>
      <Card className="p-6 mt-6 max-w-2xl">
        <form onSubmit={(e)=>{e.preventDefault();toast.success("Notification sent to 5,04,832 students");}} className="space-y-3">
          <div><Label>Title</Label><Input required /></div>
          <div><Label>Message</Label><Textarea rows={5} required /></div>
          <div><Label>Audience</Label><Input placeholder="All students / Course-specific / Exam-specific" /></div>
          <Button type="submit">Send Broadcast</Button>
        </form>
      </Card>
    </div>
  );
}
