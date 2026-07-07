import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { courses } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Clock, Globe, Users, Star, PlayCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = courses.find(c => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — Bank Educator` },
          { name: "description", content: loaderData.course.description.slice(0, 155) },
          { property: "og:title", content: loaderData.course.title },
          { property: "og:image", content: loaderData.course.thumbnail },
        ]
      : [{ title: "Course — Bank Educator" }],
  }),
  component: CourseDetail,
  notFoundComponent: () => (
    <MarketingShell><div className="p-16 text-center">Course not found. <Link to="/courses" className="text-primary underline">Browse courses</Link></div></MarketingShell>
  ),
});

function CourseDetail() {
  const { course } = Route.useLoaderData() as { course: (typeof courses)[number] };
  const { user, enroll } = useAuth();
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (!user) { toast("Please log in to enroll"); navigate({ to: "/login" }); return; }
    enroll(course.id);
    toast.success(`Enrolled in ${course.title}`);
    navigate({ to: "/checkout/$courseSlug", params: { courseSlug: course.slug } });
  };

  return (
    <MarketingShell>
      <section className="hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Badge className="bg-gold text-[color:var(--navy)]">{course.category}</Badge>
            <h1 className="mt-4 font-display text-3xl md:text-5xl">{course.title}</h1>
            <p className="mt-3 text-white/85 max-w-2xl">{course.description}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-gold fill-gold" /> {course.rating} rating</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" /> {course.students.toLocaleString()} students</span>
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> {course.duration}</span>
              <span className="flex items-center gap-2"><Globe className="h-4 w-4 text-gold" /> {course.language}</span>
            </div>
            <div className="mt-5 text-sm text-white/85">Instructor: <span className="font-semibold text-gold">{course.instructor}</span></div>
          </div>
          <Card className="p-5 self-start relative -mb-16 py-5">
            <img src={course.thumbnail} alt={course.title} className="rounded-md aspect-video object-cover" />
            <div className="mt-4 flex items-baseline gap-3">
              <div className="font-display text-3xl text-primary">₹{course.price}</div>
              <div className="text-muted-foreground line-through">₹{course.mrp}</div>
              <Badge variant="secondary">{Math.round((1 - course.price / course.mrp) * 100)}% off</Badge>
            </div>
            <Button className="mt-4 w-full" size="lg" onClick={handleEnroll}>Enroll Now</Button>
            <Button variant="outline" className="mt-2 w-full" asChild>
              <Link to="/mock-tests">Try Free Mock</Link>
            </Button>
            <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> 7-day money-back guarantee</div>
          </Card>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="font-display text-2xl">What you'll get</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {course.highlights.map(h => (
                <div key={h} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0" /> {h}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl">Syllabus</h2>
            <Accordion type="single" collapsible className="mt-4">
              {course.syllabus.map((s, i) => (
                <AccordionItem key={s.title} value={"i"+i}>
                  <AccordionTrigger>{s.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {s.lessons.map(l => (
                        <li key={l} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <PlayCircle className="h-4 w-4 text-primary" /> {l}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <aside className="space-y-4">
          <Card className="p-5">
            <h3 className="font-display text-lg">Meet the instructor</h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full gold-gradient" />
              <div>
                <div className="font-semibold">{course.instructor}</div>
                <div className="text-xs text-muted-foreground">Senior Faculty</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">10+ years of coaching experience with 5,000+ selections.</p>
          </Card>
        </aside>
      </div>
    </MarketingShell>
  );
}
