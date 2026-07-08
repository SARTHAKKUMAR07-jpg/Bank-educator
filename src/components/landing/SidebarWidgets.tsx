import { Link } from "@tanstack/react-router";
import { TrendingUp, Landmark, LineChart, Briefcase, Clock, Flame } from "lucide-react";
import { useBlogs } from "@/lib/cms-store";
import { useMemo } from "react";

export function SidebarWidgets() {
  const allBlogs = useBlogs();
  
  const publishedBlogs = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return allBlogs
      .filter(b => b.status === "published" && b.publishedAt <= today)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [allBlogs]);

  // Mock categories by slicing differently for demonstration
  const trending = publishedBlogs.slice(0, 4);
  const rbiUpdates = publishedBlogs.filter(b => b.category.includes("RBI")).slice(0, 3);
  const marketUpdates = publishedBlogs.slice(2, 5); // mock market news
  const govtJobs = publishedBlogs.filter(b => b.category.includes("Job") || b.category.includes("SSC")).slice(0, 3);
  const mostRead = publishedBlogs.slice(4, 9);

  return (
    <div className="flex flex-col gap-6 sticky top-24">
      
      {/* Trending News */}
      <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-5 py-3 border-b border-border/50 flex items-center gap-2">
          <Flame className="h-4 w-4 text-orange-500" />
          <h3 className="font-bold text-foreground">Trending News</h3>
        </div>
        <div className="flex flex-col divide-y divide-border/50">
          {trending.map((blog, i) => (
            <Link key={blog.id} to="/blog/$slug" params={{ slug: blog.slug }} className="px-5 py-4 hover:bg-muted/30 transition-colors group flex gap-4 items-start">
              <span className="text-3xl font-black text-muted-foreground/20 font-display italic mt-[-4px]">{i + 1}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors leading-snug line-clamp-2">{blog.title}</h4>
                <span className="text-[10px] text-muted-foreground uppercase font-bold mt-2 block">{blog.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* RBI Updates */}
      {rbiUpdates.length > 0 && (
        <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <div className="bg-muted/30 px-5 py-3 border-b border-border/50 flex items-center gap-2">
            <Landmark className="h-4 w-4 text-blue-500" />
            <h3 className="font-bold text-foreground">RBI Updates</h3>
          </div>
          <div className="flex flex-col divide-y divide-border/50 p-2">
            {rbiUpdates.map((blog) => (
              <Link key={blog.id} to="/blog/$slug" params={{ slug: blog.slug }} className="p-3 hover:bg-muted/30 transition-colors group rounded-lg">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors leading-tight line-clamp-2">{blog.title}</h4>
                <span className="text-[10px] text-muted-foreground mt-1.5 block">{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Market Updates */}
      <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-5 py-3 border-b border-border/50 flex items-center gap-2">
          <LineChart className="h-4 w-4 text-emerald-500" />
          <h3 className="font-bold text-foreground">Market Updates</h3>
        </div>
        <div className="flex flex-col divide-y divide-border/50 p-2">
          {marketUpdates.map((blog) => (
            <Link key={blog.id} to="/blog/$slug" params={{ slug: blog.slug }} className="p-3 hover:bg-muted/30 transition-colors group rounded-lg">
              <h4 className="font-medium text-sm group-hover:text-primary transition-colors leading-tight line-clamp-2">{blog.title}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Government Jobs */}
      {govtJobs.length > 0 && (
        <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
          <div className="bg-muted/30 px-5 py-3 border-b border-border/50 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-purple-500" />
            <h3 className="font-bold text-foreground">Government Jobs</h3>
          </div>
          <div className="flex flex-col divide-y divide-border/50 p-2">
            {govtJobs.map((blog) => (
              <Link key={blog.id} to="/blog/$slug" params={{ slug: blog.slug }} className="p-3 hover:bg-muted/30 transition-colors group rounded-lg">
                <h4 className="font-medium text-sm group-hover:text-primary transition-colors leading-tight line-clamp-2">{blog.title}</h4>
                <span className="text-[10px] text-muted-foreground mt-1.5 block">{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Most Read Articles */}
      <div className="bg-background rounded-xl border border-border/50 shadow-sm overflow-hidden">
        <div className="bg-muted/30 px-5 py-3 border-b border-border/50 flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h3 className="font-bold text-foreground">Most Read</h3>
        </div>
        <div className="flex flex-col divide-y divide-border/50">
          {mostRead.map((blog) => (
            <Link key={blog.id} to="/blog/$slug" params={{ slug: blog.slug }} className="px-5 py-4 hover:bg-muted/30 transition-colors group flex gap-3 items-center">
              <div className="w-14 h-14 shrink-0 rounded-md overflow-hidden relative border border-border/50">
                <img src={blog.cover} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors leading-tight line-clamp-2">{blog.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
