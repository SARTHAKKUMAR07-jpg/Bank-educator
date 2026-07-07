import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Clock, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    id: "sbi-po-2024",
    title: "SBI PO Target Batch 2024",
    description: "Complete preparation for SBI PO Prelims + Mains with interview guidance.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    price: "₹3,499",
    originalPrice: "₹6,999",
    rating: 4.9,
    students: "12k+",
    duration: "6 Months",
    tags: ["Best Seller", "Live Classes"],
  },
  {
    id: "ibps-po-clerk",
    title: "IBPS PO & Clerk Foundation",
    description: "Build a strong foundation for all IBPS exams from scratch.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    price: "₹2,999",
    originalPrice: "₹5,999",
    rating: 4.8,
    students: "8k+",
    duration: "4 Months",
    tags: ["Foundation", "Recorded"],
  },
  {
    id: "rbi-grade-b",
    title: "RBI Grade B Complete Course",
    description: "Phase 1 & Phase 2 comprehensive coverage with answer writing practice.",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop",
    price: "₹4,999",
    originalPrice: "₹9,999",
    rating: 4.9,
    students: "5k+",
    duration: "8 Months",
    tags: ["Premium", "Live Classes"],
  },
];

export function FeaturedCourses() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Premium <span className="text-primary">Banking Courses</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Structured learning paths designed by ex-bankers and top educators to help you ace your exams on the first attempt.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex rounded-full">
            <Link to="/courses">
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden border-border group hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} className={tag === "Best Seller" ? "bg-gold text-[color:var(--navy)] hover:bg-gold/90" : "bg-primary text-primary-foreground"}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    <span className="font-medium text-foreground">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  <Link to={`/courses/${course.id}`} className="after:absolute after:inset-0">
                    {course.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {course.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{course.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                </div>
                <Button variant="ghost" className="text-primary hover:bg-primary/10 rounded-full px-4 group/btn">
                  Details <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="rounded-full w-full">
            <Link to="/courses">
              View All Courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
