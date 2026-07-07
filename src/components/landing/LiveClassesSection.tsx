import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarDays, Clock, PlayCircle, Users, Calendar as CalendarIcon, Bell } from "lucide-react";

const liveClasses = [
  {
    id: "lc-1",
    title: "Data Interpretation Mastery",
    instructor: "Rahul Sharma",
    date: "Today",
    time: "06:00 PM",
    subject: "Quantitative Aptitude",
    students: "1.2k attending",
    status: "Upcoming"
  },
  {
    id: "lc-2",
    title: "Syllogism Short Tricks",
    instructor: "Priya Singh",
    date: "Today",
    time: "08:00 PM",
    subject: "Reasoning Ability",
    students: "950 attending",
    status: "Upcoming"
  },
  {
    id: "lc-3",
    title: "The Hindu Editorial Analysis",
    instructor: "Vikram Aditya",
    date: "Today",
    time: "08:00 AM",
    subject: "English Language",
    students: "3.5k watched",
    status: "Completed"
  }
];

export function LiveClassesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Interactive <span className="text-primary">Live Classes</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Attend daily live sessions, interact with expert faculty in real-time, and clear your doubts instantly.
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex rounded-full group/btn">
            <CalendarIcon className="mr-2 h-4 w-4 text-primary group-hover/btn:scale-110 transition-transform" /> View Schedule
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveClasses.map((session) => (
            <Card key={session.id} className="border-border hover:border-primary/50 transition-colors group/card">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={session.status === "Upcoming" ? "default" : "secondary"} className={session.status === "Upcoming" ? "bg-primary" : ""}>
                    {session.status}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                    {session.subject}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display line-clamp-1 group-hover/card:text-primary transition-colors">{session.title}</h3>
                <p className="text-sm text-muted-foreground">by {session.instructor}</p>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center gap-2 text-foreground">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{session.date}</span>
                    <Clock className="h-4 w-4 text-primary ml-2" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{session.students}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full rounded-full group/action hover:-translate-y-0.5 transition-transform" variant={session.status === "Upcoming" ? "default" : "outline"}>
                  {session.status === "Upcoming" ? (
                    <><Bell className="mr-2 h-4 w-4 group-hover/action:animate-bounce" /> Notify Me</>
                  ) : (
                    <><PlayCircle className="mr-2 h-4 w-4 group-hover/action:scale-110 transition-transform" /> Watch Recording</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="rounded-full w-full group/btn">
            <CalendarIcon className="mr-2 h-4 w-4 text-primary group-hover/btn:scale-110 transition-transform" /> View Schedule
          </Button>
        </div>
      </div>
    </section>
  );
}
