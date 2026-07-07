import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { courses } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/dashboard/courses")({ component: MyCourses });

function MyCourses() {
  const { user } = useAuth();
  const enrolled = courses.filter(c => user?.enrolledCourseIds.includes(c.id));
  return (
    <div>
      <h1 className="font-display text-3xl">My Courses</h1>
      {enrolled.length === 0 ? (
        <Card className="p-10 mt-6 text-center">
          <p className="text-muted-foreground">You haven't enrolled in any courses yet.</p>
          <Button className="mt-4" asChild><Link to="/courses">Browse Courses</Link></Button>
        </Card>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {enrolled.map(c => (
            <Card key={c.id} className="overflow-hidden py-0">
              <img src={c.thumbnail} className="aspect-video object-cover" alt="" />
              <div className="p-5">
                <h3 className="font-display text-lg">{c.title}</h3>
                <Progress value={35} className="mt-3" />
                <div className="text-xs text-muted-foreground mt-1">35% complete</div>
                <Button className="mt-4 w-full" asChild><Link to="/courses/$slug" params={{slug:c.slug}}>Continue</Link></Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
