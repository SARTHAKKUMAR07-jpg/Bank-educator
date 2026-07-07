import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockTests } from "@/lib/mock-data";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/tests")({ component: AdminTests });

function AdminTests() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl">Mock Tests</h1>
        <Button onClick={()=>toast("New test (demo)")}><Plus className="h-4 w-4 mr-1" /> New Test</Button>
      </div>
      <Card className="mt-6 overflow-hidden py-0">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left"><tr><th className="p-3">Title</th><th className="p-3">Exam</th><th className="p-3">Type</th><th className="p-3">Attempts</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {mockTests.map(m => (
              <tr key={m.id} className="border-t"><td className="p-3 font-medium">{m.title}</td><td className="p-3">{m.exam}</td><td className="p-3"><Badge variant="outline">{m.type}</Badge></td><td className="p-3">{m.attempts.toLocaleString()}</td>
                <td className="p-3 flex gap-2"><Button size="icon" variant="ghost"><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost"><Trash2 className="h-4 w-4" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
