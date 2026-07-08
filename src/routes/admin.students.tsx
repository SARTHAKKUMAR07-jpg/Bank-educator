import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const students = Array.from({ length: 24 }).map((_, i) => ({
  id: "s" + i,
  name: ["Ananya S", "Vikram R", "Meera K", "Rohit P", "Sneha M", "Karan D", "Divya B", "Amit V"][i % 8] + " " + (i + 1),
  email: `student${i + 1}@example.com`,
  exam: ["SBI PO", "IBPS PO", "RBI Grade B", "SBI Clerk"][i % 4],
  enrolled: (i % 4) + 1,
  joined: `2026-0${(i % 6) + 1}-1${i % 9}`,
}));

export const Route = createFileRoute("/admin/students")({ component: AdminStudents });

function AdminStudents() {
  const [q, setQ] = useState("");
  const list = students.filter(s => (s.name + s.email).toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <h1 className="font-display text-3xl">Students</h1>
      <div className="mt-4 flex justify-between items-center"><Input placeholder="Search…" className="max-w-xs" value={q} onChange={e=>setQ(e.target.value)} /><div className="text-sm text-muted-foreground">{list.length} of {students.length}</div></div>
      <Card className="mt-4 overflow-hidden py-0">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Target</th><th className="p-3">Joined</th></tr></thead>
          <tbody>
            {list.map(s => (
              <tr key={s.id} className="border-t"><td className="p-3 font-medium">{s.name}</td><td className="p-3">{s.email}</td><td className="p-3"><Badge variant="outline">{s.exam}</Badge></td><td className="p-3">{s.joined}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
