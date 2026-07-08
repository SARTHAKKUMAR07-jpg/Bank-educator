import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { useBlogs } from "@/lib/cms-store";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";

interface NewsCategorySectionProps {
  title: string;
  subtitle: string;
  description?: string;
  category?: string; // If undefined, fetches all
  limit?: number;
  highlightFirst?: boolean;
  compact?: boolean;
}

export function NewsCategorySection({ 
  title, 
  subtitle, 
  description, 
  category,
  limit = 3,
  highlightFirst = false,
  compact = false
}: NewsCategorySectionProps) {
  const allBlogs = useBlogs();
  
  const news = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    let filtered = allBlogs.filter(b => b.status === "published" && b.publishedAt <= today);
    if (category) {
      filtered = filtered.filter(b => b.category === category);
    }
    return filtered
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }, [allBlogs, category, limit]);

  if (news.length === 0) return null;

  return (
    <section className={`${compact ? 'py-8 border-b' : 'py-24 border-t'} bg-background border-border/40`}>
      <div className={compact ? "" : "mx-auto max-w-7xl px-6"}>
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${compact ? 'mb-6' : 'mb-12'}`}>
          <div className="max-w-2xl">
            <h2 className={`${compact ? 'text-2xl md:text-3xl pl-4 relative' : 'text-3xl md:text-4xl'} font-display font-bold text-foreground mb-4`}>
              {compact && <span className="absolute left-0 top-1 bottom-1 w-1 bg-gold rounded-full"></span>}
              {title} <span className="text-primary">{subtitle}</span>
            </h2>
            {description && (
              <p className="text-muted-foreground text-lg">
                {description}
              </p>
            )}
          </div>
          <Link to="/blog" className="hidden md:inline-flex items-center text-primary font-semibold hover:underline">
            View all {category ? category : "News"} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className={`grid gap-8 ${highlightFirst && news.length > 0 ? (compact ? "grid-cols-1" : "lg:grid-cols-2") : (compact ? "md:grid-cols-2" : "md:grid-cols-3")}`}>
          {highlightFirst && news[0] && (
            <Link key={news[0].id} to="/blog/$slug" params={{ slug: news[0].slug }} className="group flex flex-col h-full bg-background border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all lg:row-span-2">
              <div className="relative h-64 lg:h-96 overflow-hidden">
                <img 
                  src={news[0].cover} 
                  alt={news[0].title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-red-600 text-white hover:bg-red-700 border-0 shadow-lg shadow-red-500/30 uppercase tracking-widest font-bold">
                    Breaking
                  </Badge>
                  <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-0">{news[0].category}</Badge>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1 bg-card">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(news[0].publishedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {news[0].readingTime} min read</span>
                </div>
                <h3 className="font-bold text-2xl lg:text-3xl mb-4 group-hover:text-primary transition-colors leading-tight">{news[0].title}</h3>
                <p className="text-muted-foreground text-base lg:text-lg line-clamp-3 flex-1 mb-6">
                  {news[0].excerpt}
                </p>
                <div className="mt-auto flex items-center text-primary font-semibold text-lg">
                  Read Full Story <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          )}

          <div className={`grid gap-6 ${highlightFirst ? "grid-cols-1" : (compact ? "md:grid-cols-2 col-span-2" : "md:grid-cols-3 col-span-3")} ${!highlightFirst ? "" : "content-start"}`}>
            {news.slice(highlightFirst ? 1 : 0).map((blog) => (
              <Link key={blog.id} to="/blog/$slug" params={{ slug: blog.slug }} className={`group flex ${highlightFirst ? 'flex-row items-center gap-4' : 'flex-col'} bg-background border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow h-full`}>
                <div className={`relative overflow-hidden shrink-0 ${highlightFirst ? 'w-32 h-32 md:w-48 md:h-48 rounded-xl m-3 shadow-inner' : 'h-48 w-full'}`}>
                  <img 
                    src={blog.cover} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {!highlightFirst && (
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-sm shadow-sm">{blog.category}</Badge>
                      {blog.category === "Trending News" && (
                        <Badge className="bg-orange-500 text-white hover:bg-orange-600 border-0 shadow-sm">Trending</Badge>
                      )}
                    </div>
                  )}
                </div>
                <div className={`flex flex-col flex-1 min-w-0 ${highlightFirst ? 'p-4 pr-6 pl-0' : 'p-6'}`}>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(blog.publishedAt).toLocaleDateString()}</span>
                    {highlightFirst && <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {blog.category}</span>}
                  </div>
                  <h3 className={`font-bold group-hover:text-primary transition-colors line-clamp-2 ${highlightFirst ? 'text-lg md:text-xl mb-2' : 'text-xl mb-3'}`}>{blog.title}</h3>
                  {!highlightFirst && (
                    <p className="text-muted-foreground text-sm line-clamp-3 flex-1 mb-4">
                      {blog.excerpt}
                    </p>
                  )}
                  {!highlightFirst && (
                    <div className="mt-auto flex items-center text-primary text-sm font-semibold group-hover:underline">
                      Read article <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/blog" className="inline-flex items-center text-primary font-semibold hover:underline">
            View all {category ? category : "News"} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
