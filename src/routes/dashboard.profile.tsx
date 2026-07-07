import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="font-display text-3xl">Profile</h1>
      <Card className="mt-6 p-6 max-w-xl">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full gold-gradient grid place-items-center text-[color:var(--navy)] font-semibold text-2xl uppercase">{user?.name.charAt(0)}</div>
          <div><div className="font-display text-xl">{user?.name}</div><div className="text-sm text-muted-foreground">{user?.email}</div></div>
        </div>
        <form onSubmit={(e)=>{e.preventDefault();toast.success("Profile updated");}} className="mt-6 grid gap-3">
          <div><Label>Full name</Label><Input defaultValue={user?.name} /></div>
          <div><Label>Email</Label><Input type="email" defaultValue={user?.email} /></div>
          <div><Label>Phone</Label><Input type="tel" placeholder="+91…" /></div>
          <div><Label>Target exam</Label><Input placeholder="SBI PO 2026" /></div>
          <Button type="submit" className="w-fit">Save changes</Button>
        </form>
      </Card>
    </div>
  );
}
