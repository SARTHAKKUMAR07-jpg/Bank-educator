import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar } from "lucide-react";
import { useBlogs } from "@/lib/cms-store";
import { useMemo } from "react";

export function LatestBlogsSection() {
  const allBlogs = useBlogs();
  
  const latestBlogs = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return allBlogs
      .filter(b => b.status === "published" && b.publishedAt <= today)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 3);
  }, [allBlogs]);

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Latest <span className="text-primary">Articles & Strategies</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Read tips from toppers and our expert faculty on how to approach different sections of the exam.
            </p>
          </div>
          <Link to="/blog" className="hidden md:inline-flex items-center text-primary font-semibold hover:underline">
            Read all articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <Link key={blog.id} to="/blog/$slug" params={{ slug: blog.slug }} className="group flex flex-col h-full bg-background border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.cover} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">{blog.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  Read more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/blog" className="inline-flex items-center text-primary font-semibold hover:underline">
            Read all articles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
