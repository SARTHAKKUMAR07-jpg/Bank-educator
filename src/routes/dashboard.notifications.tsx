import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

export const Route = createFileRoute("/dashboard/notifications")({ component: NotificationsPage });

const items = [
  { id: 1, type: "success", title: "You unlocked a new mock", body: "SBI PO Prelims Mock #7 is now available.", when: "2 hours ago" },
  { id: 2, type: "info", title: "New live class scheduled", body: "Quant DI at 6:00 PM today.", when: "5 hours ago" },
  { id: 3, type: "warning", title: "Payment reminder", body: "Your RBI Grade B course expires in 3 days.", when: "1 day ago" },
  { id: 4, type: "info", title: "New blog published", body: "SBI PO 2026 Notification analysis is live.", when: "2 days ago" },
];

function NotificationsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">Notifications</h1>
      <div className="mt-6 space-y-3">
        {items.map(n => (
          <Card key={n.id} className="p-4 flex gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 grid place-items-center text-primary"><Bell className="h-5 w-5" /></div>
            <div className="flex-1">
              <div className="flex items-center gap-2"><div className="font-medium">{n.title}</div><Badge variant="outline" className="text-[10px]">{n.type}</Badge></div>
              <div className="text-sm text-muted-foreground">{n.body}</div>
              <div className="text-xs text-muted-foreground mt-1">{n.when}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
