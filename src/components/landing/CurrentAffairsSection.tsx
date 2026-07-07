import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Download, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const currentAffairs = [
  {
    title: "Daily GK Capsule - October 24",
    date: "Oct 24, 2024",
    category: "Banking Awareness",
    readTime: "5 min read",
  },
  {
    title: "RBI Monetary Policy Highlights - Oct 2024",
    date: "Oct 22, 2024",
    category: "Economy",
    readTime: "8 min read",
  },
  {
    title: "Weekly Current Affairs Quiz - Week 3",
    date: "Oct 20, 2024",
    category: "Quiz",
    readTime: "15 mins",
  },
];

export function CurrentAffairsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-4">
              {currentAffairs.map((item, i) => (
                <Card key={i} className="border-border hover:border-primary/50 transition-colors group cursor-pointer">
                  <CardContent className="p-5 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-primary font-medium mb-1.5">
                        <span className="bg-primary/10 px-2 py-0.5 rounded-full">{item.category}</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {item.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-primary truncate">{item.title}</h3>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0 rounded-full group-hover:bg-primary/10 group-hover:text-primary">
                      <Download className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Stay Updated with <span className="text-primary">Daily Current Affairs</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Current affairs is the key to scoring high in Mains and Interviews. Get crisp, exam-oriented daily GK updates, weekly quizzes, and monthly PDFs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full group/btn transition-transform hover:-translate-y-1">
                <Link to="/current-affairs">
                  Read Daily Updates <BookOpen className="ml-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full group/btn transition-transform hover:-translate-y-1">
                <Link to="/current-affairs">
                  Download Monthly PDF <Download className="ml-2 h-4 w-4 group-hover/btn:-translate-y-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
