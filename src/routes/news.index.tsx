import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MarketingShell } from "@/components/marketing-shell";

export const Route = createFileRoute("/news/")({
  component: NewsPage,
});

const DEMO_NEWS = [
  {
    id: "1",
    title: "RBI releases new monetary policy update",
    category: "RBI",
    cover: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&q=80",
    excerpt: "The Monetary Policy Committee has released fresh updates regarding the repo rate and economic outlook for the upcoming quarter.",
    publishedAt: new Date().toISOString(),
    readingTime: 4
  },
  {
    id: "2",
    title: "IBPS PO 2026 Notification Released",
    category: "IBPS",
    cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    excerpt: "The much-awaited IBPS PO 2026 notification is out now with a record number of vacancies across public sector banks.",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    readingTime: 3
  },
  {
    id: "3",
    title: "SBI Clerk Recruitment 2026",
    category: "SBI",
    cover: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80",
    excerpt: "State Bank of India announces the commencement of its Clerk recruitment drive for 2026. Check eligibility and important dates.",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    readingTime: 5
  },
  {
    id: "4",
    title: "NABARD Grade A Exam Schedule Announced",
    category: "NABARD",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    excerpt: "NABARD has officially published the prelims and mains exam schedule for the Grade A Assistant Manager posts.",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    readingTime: 4
  },
  {
    id: "5",
    title: "Weekly Banking Current Affairs Roundup",
    category: "Current Affairs",
    cover: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80",
    excerpt: "A comprehensive summary of all major banking, economic, and financial news from the past week to boost your exam prep.",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    readingTime: 6
  },
  {
    id: "6",
    title: "Government Job Notifications This Week",
    category: "Government Jobs",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    excerpt: "Don't miss out! A complete list of all major state and central government job notifications released this week.",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    readingTime: 5
  },
  {
    id: "7",
    title: "Finance Ministry issues new banking guidelines",
    category: "Current Affairs",
    cover: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&q=80",
    excerpt: "The Finance Ministry has rolled out new operational guidelines for all commercial banks to enhance digital security.",
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    readingTime: 7
  }
];

function NewsPage() {
  return (
    <MarketingShell>
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Latest <span className="text-primary">Banking News</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Stay ahead of the competition with real-time updates on banking exams, RBI policies, and government job notifications.
              </p>
            </div>
          </div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEMO_NEWS.map((news, idx) => (
              <Link 
                key={news.id} 
                to="/blog" 
                className={`group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${idx === 0 ? "md:col-span-2 lg:col-span-2 md:flex-row" : ""}`}
              >
                <div className={`relative overflow-hidden shrink-0 ${idx === 0 ? "md:w-1/2" : "h-56 w-full"}`}>
                  <img 
                    src={news.cover} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-md px-3 py-1 font-semibold text-xs tracking-wider uppercase shadow-lg border-white/20">
                      {news.category}
                    </Badge>
                  </div>
                </div>
                
                <div className={`p-8 flex flex-col flex-1 ${idx === 0 ? "justify-center" : ""}`}>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-medium tracking-wide uppercase">
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(news.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {news.readingTime} min read</span>
                  </div>
                  
                  <h3 className={`font-bold group-hover:text-primary transition-colors leading-snug ${idx === 0 ? "text-3xl mb-4" : "text-xl mb-3"}`}>
                    {news.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-base line-clamp-3 mb-6 flex-1">
                    {news.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-primary font-semibold">
                    Read More <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MarketingShell>
  );
}
