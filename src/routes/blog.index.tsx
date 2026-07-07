import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { useBlogs, cmsStore } from "@/lib/cms-store";
import { useAuth } from "@/lib/auth";
import { BlogEditor } from "@/components/admin/BlogEditor";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, Clock, User, ArrowRight, Edit, Trash2, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/blog/")({
  head: () => ({ meta: [
    { title: "Blog — Bank Educator" },
    { name: "description", content: "Strategies, exam analyses and study plans for bank exam aspirants." },
  ] }),
  component: BlogList,
});

const POSTS_PER_PAGE = 6;

function BlogList() {
  const allBlogs = useBlogs();
  const { user } = useAuth();
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const handleEdit = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingBlogId(id);
    setIsEditorOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to move this blog to trash?")) {
      cmsStore.updateBlog(id, { status: "trashed" });
      toast.success("Blog moved to trash");
    }
  };
  
  // Only show published blogs, not scheduled for the future
  const publishedBlogs = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return allBlogs
      .filter(b => b.status === "published" && b.publishedAt <= today)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, [allBlogs]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const categories = ["All", ...Array.from(new Set(publishedBlogs.map(b => b.category)))];

  const filteredBlogs = useMemo(() => {
    return publishedBlogs.filter(b => {
      const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || 
                            b.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || b.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [publishedBlogs, search, category]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / POSTS_PER_PAGE));
  const currentBlogs = filteredBlogs.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const latestBlog = publishedBlogs[0];

  return (
    <MarketingShell>
      <section className="bg-[color:var(--navy)] text-white pt-12 pb-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold">The <span className="text-gold">Bank Educator</span> Blog</h1>
            <p className="mt-4 text-white/85 text-lg">Notifications, strategy guides, PYQ analyses and interview tips — updated weekly.</p>
          </div>
          
          {/* Featured/Latest Blog */}
          {latestBlog && !search && category === "All" && page === 1 && (
            <Link to="/blog/$slug" params={{ slug: latestBlog.slug }} className="block group">
              <div className="grid lg:grid-cols-2 gap-8 items-center bg-white/5 rounded-2xl border border-white/10 p-4 lg:p-8 hover:bg-white/10 transition-colors backdrop-blur-sm">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img src={latestBlog.cover} alt={latestBlog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Badge className="bg-gold hover:bg-gold/90 text-[color:var(--navy)]">Latest</Badge>
                    <Badge variant="outline" className="text-white border-white/30">{latestBlog.category}</Badge>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-display font-bold group-hover:text-gold transition-colors line-clamp-2">{latestBlog.title}</h2>
                  <p className="text-white/70 text-lg line-clamp-3">{latestBlog.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-white/50 pt-2">
                    <span className="flex items-center"><User className="mr-1 h-4 w-4" /> {latestBlog.author}</span>
                    <span className="flex items-center"><Clock className="mr-1 h-4 w-4" /> {latestBlog.readingTime} min read</span>
                    <span>{new Date(latestBlog.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => { setCategory(c); setPage(1); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === c 
                    ? 'bg-[color:var(--navy)] text-white shadow-md' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-9 rounded-full bg-muted/50 border-0 focus-visible:ring-1"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <Button 
              onClick={() => { setEditingBlogId(null); setIsEditorOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full whitespace-nowrap shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Blog
            </Button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.length === 0 ? (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No articles found matching your criteria.
            </div>
          ) : currentBlogs.map(b => (
            <Link key={b.id} to="/blog/$slug" params={{ slug: b.slug }} className="group flex flex-col h-full">
              <Card className="overflow-hidden h-full py-0 border-0 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="aspect-[16/9] overflow-hidden relative">
                  <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-sm">{b.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-blue-600 shadow-sm" onClick={(e) => handleEdit(e, b.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white text-destructive shadow-sm" onClick={(e) => handleDelete(e, b.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-bold line-clamp-2 group-hover:text-[color:var(--navy)] transition-colors">{b.title}</h3>
                  <p className="mt-3 text-muted-foreground line-clamp-3 text-sm flex-1">{b.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
                    <span>{new Date(b.publishedAt).toLocaleDateString()}</span>
                    <span className="flex items-center group-hover:text-[color:var(--navy)] font-medium transition-colors">
                      Read More <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-full h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm font-medium">Page {page} of {totalPages}</div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-full h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}


        {isEditorOpen && (
          <BlogEditor blogId={editingBlogId} onClose={() => setIsEditorOpen(false)} />
        )}
      </section>
    </MarketingShell>
  );
}
