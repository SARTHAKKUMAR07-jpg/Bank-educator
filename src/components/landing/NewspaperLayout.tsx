import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useBlogs } from "@/lib/cms-store";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";

interface NewspaperLayoutProps {
  title: string;
}

export function NewspaperLayout({ title }: NewspaperLayoutProps) {
  const allBlogs = useBlogs();
  
  const news = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return allBlogs
      .filter(b => b.status === "published" && b.publishedAt <= today)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 14); // 1 large + 5 compact + 8 grid = 14
  }, [allBlogs]);

  if (news.length === 0) return null;

  const featured = news[0];
  const sidebarNews = news.slice(1, 6); // 5 items
  const gridNews = news.slice(6, 14); // up to 8 items

  return (
    <section className="py-4 bg-background">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
        <h2 className="text-3xl font-display font-bold text-foreground relative pl-4">
          <span className="absolute left-0 top-1 bottom-1 w-1 bg-gold rounded-full"></span>
          {title}
        </h2>
        <Link to="/news" className="text-primary font-bold hover:underline flex items-center text-sm group">
          View All <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Top Section: Featured + Compact Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Featured Large Card */}
        {featured && (
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="lg:col-span-7 group flex flex-col h-full bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="relative h-[300px] sm:h-[450px] overflow-hidden">
              <img 
                src={featured.cover} 
                alt={featured.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-red-600 text-white hover:bg-red-700 border-0 shadow-lg shadow-red-500/30 uppercase tracking-widest font-bold px-3 py-1">
                  Featured
                </Badge>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap items-center gap-3 text-white/90 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-4">
                  <span className="bg-primary px-2.5 py-1 rounded text-primary-foreground">{featured.category}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(featured.publishedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {featured.readingTime} min</span>
                </div>
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-white group-hover:text-gold transition-colors leading-[1.2]">
                  {featured.title}
                </h3>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-muted-foreground text-base sm:text-lg line-clamp-2 mb-6 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                <span className="flex items-center text-sm font-semibold text-foreground"><User className="h-4 w-4 mr-2 text-muted-foreground"/> {featured.author}</span>
                <span className="text-primary font-bold flex items-center text-sm uppercase tracking-wider">Read Full Story <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></span>
              </div>
            </div>
          </Link>
        )}

        {/* 5 Compact Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {sidebarNews.map((item) => (
            <Link key={item.id} to="/blog/$slug" params={{ slug: item.slug }} className="group flex gap-4 items-start bg-background hover:bg-muted/40 p-3 -mx-3 rounded-xl transition-all duration-300">
              <div className="relative w-32 h-24 sm:w-36 sm:h-28 shrink-0 overflow-hidden rounded-lg shadow-sm border border-border/50">
                <img 
                  src={item.cover} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-2 left-2">
                   <span className="bg-background/90 backdrop-blur-sm text-foreground text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
                     {item.category.split(' ')[0]}
                   </span>
                </div>
              </div>
              <div className="flex flex-col justify-start flex-1 min-w-0 pt-1">
                <h4 className="font-bold text-base sm:text-[17px] text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium mt-auto">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {new Date(item.publishedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {item.readingTime}m</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Grid: 6-8 Articles */}
      {gridNews.length > 0 && (
        <div className="pt-8 border-t border-border/50">
          <div className="flex items-center mb-6">
            <h3 className="font-bold text-xl text-foreground">More Top Stories</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gridNews.map((item) => (
              <Link key={item.id} to="/blog/$slug" params={{ slug: item.slug }} className="group flex flex-col bg-background border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-40 overflow-hidden border-b border-border">
                  <img 
                    src={item.cover} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0">{item.category}</Badge>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{item.readingTime} min read</span>
                  </div>
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
