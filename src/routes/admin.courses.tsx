import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/mock-data";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/courses")({ component: AdminCourses });

function AdminCourses() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl">Courses</h1>
        <Button onClick={() => toast("Course editor (demo)")}><Plus className="h-4 w-4 mr-1" /> New Course</Button>
      </div>
      <Card className="mt-6 overflow-hidden py-0">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left"><tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Students</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.id} className="border-t"><td className="p-3 font-medium">{c.title}</td><td className="p-3"><Badge variant="outline">{c.category}</Badge></td><td className="p-3">₹{c.price}</td><td className="p-3">{c.students.toLocaleString()}</td>
                <td className="p-3 flex gap-2"><Button size="icon" variant="ghost" onClick={()=>toast("Edit (demo)")}><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost" onClick={()=>toast.error("Delete (demo)")}><Trash2 className="h-4 w-4" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
