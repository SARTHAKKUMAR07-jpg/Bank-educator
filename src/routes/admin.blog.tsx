import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Plus, Edit, Trash2, MoreVertical, Search, Copy, CheckCircle, RefreshCcw, LayoutDashboard
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useBlogs, cmsStore, BlogStatus } from "@/lib/cms-store";
import { BlogEditor } from "@/components/admin/BlogEditor";

export const Route = createFileRoute("/admin/blog")({ component: AdminBlog });

function AdminBlog() {
  const blogs = useBlogs();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<BlogStatus | "all">("all");
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Filters
  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredBlogs.length && filteredBlogs.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredBlogs.map(b => b.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleBulkAction = (action: "publish" | "trash" | "delete") => {
    if (selectedIds.size === 0) return;
    const ids = Array.from(selectedIds);
    
    if (action === "publish") {
      cmsStore.bulkUpdateStatus(ids, "published");
      toast.success(`${ids.length} blogs published`);
    } else if (action === "trash") {
      cmsStore.bulkUpdateStatus(ids, "trashed");
      toast.success(`${ids.length} blogs moved to trash`);
    } else if (action === "delete") {
      if (confirm(`Are you sure you want to permanently delete ${ids.length} blogs?`)) {
        cmsStore.bulkDelete(ids);
        toast.success(`${ids.length} blogs permanently deleted`);
      }
    }
    setSelectedIds(new Set());
  };

  const handleDuplicate = (id: string) => {
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;
    const { id: _, slug, title, createdAt, updatedAt, ...rest } = blog;
    cmsStore.addBlog({
      ...rest,
      title: `${title} (Copy)`,
      slug: `${slug}-copy-${Math.random().toString(36).substring(2, 6)}`,
      status: "draft"
    });
    toast.success("Blog duplicated as draft");
  };

  const handleDelete = (id: string, currentStatus: BlogStatus) => {
    if (currentStatus === "trashed") {
      if (confirm("Permanently delete this blog?")) {
        cmsStore.deleteBlog(id);
        toast.success("Blog deleted");
      }
    } else {
      cmsStore.updateBlog(id, { status: "trashed" });
      toast.success("Moved to trash");
    }
  };

  const openEditor = (id?: string) => {
    setEditingBlogId(id || null);
    setIsEditorOpen(true);
  };

  const getStatusBadge = (status: BlogStatus) => {
    switch (status) {
      case "published": return <Badge className="bg-emerald-500">Published</Badge>;
      case "draft": return <Badge variant="secondary">Draft</Badge>;
      case "scheduled": return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "trashed": return <Badge variant="destructive">Trashed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl">Blog Content Manager</h1>
          <p className="text-muted-foreground mt-1">Manage articles, SEO, and publications.</p>
        </div>
        <Button onClick={() => openEditor()}><Plus className="h-4 w-4 mr-2" /> Write New Post</Button>
      </div>

      <Card className="flex flex-col border-0 shadow-sm overflow-hidden bg-background">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/10">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search blogs..." 
                className="pl-9 bg-background" 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex bg-muted p-1 rounded-md">
              {(["all", "published", "draft", "scheduled", "trashed"] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${filterStatus === s ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
              <span className="text-sm text-muted-foreground mr-2">{selectedIds.size} selected</span>
              {filterStatus !== "published" && <Button variant="outline" size="sm" onClick={() => handleBulkAction("publish")}><CheckCircle className="h-4 w-4 mr-2 text-emerald-500" /> Publish</Button>}
              {filterStatus === "trashed" ? (
                <Button variant="destructive" size="sm" onClick={() => handleBulkAction("delete")}><Trash2 className="h-4 w-4 mr-2" /> Delete Forever</Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleBulkAction("trash")}><Trash2 className="h-4 w-4 mr-2 text-destructive" /> Move to Trash</Button>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="w-12 text-center">
                  <Checkbox 
                    checked={selectedIds.size === filteredBlogs.length && filteredBlogs.length > 0} 
                    onCheckedChange={toggleSelectAll} 
                  />
                </TableHead>
                <TableHead className="w-96">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    <LayoutDashboard className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    No blogs found.
                  </TableCell>
                </TableRow>
              ) : filteredBlogs.map(blog => (
                <TableRow key={blog.id} className="group">
                  <TableCell className="text-center">
                    <Checkbox checked={selectedIds.has(blog.id)} onCheckedChange={() => toggleSelect(blog.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={blog.cover} alt="" className="h-10 w-16 rounded object-cover border bg-muted" onError={e => e.currentTarget.style.display='none'} />
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate block max-w-[300px]">{blog.title}</span>
                        <span className="text-xs text-muted-foreground truncate">{blog.slug}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(blog.status)}</TableCell>
                  <TableCell><Badge variant="outline">{blog.category}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => openEditor(blog.id)} title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditor(blog.id)}><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicate(blog.id)}><Copy className="h-4 w-4 mr-2" /> Duplicate</DropdownMenuItem>
                          {blog.status === "trashed" ? (
                            <DropdownMenuItem onClick={() => { cmsStore.updateBlog(blog.id, { status: "draft" }); toast.success("Restored"); }}><RefreshCcw className="h-4 w-4 mr-2" /> Restore</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => { cmsStore.updateBlog(blog.id, { status: "published" }); toast.success("Published"); }}><CheckCircle className="h-4 w-4 mr-2" /> Publish</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDelete(blog.id, blog.status)}>
                            <Trash2 className="h-4 w-4 mr-2" /> {blog.status === "trashed" ? "Delete Forever" : "Trash"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {isEditorOpen && (
        <BlogEditor blogId={editingBlogId} onClose={() => setIsEditorOpen(false)} />
      )}
    </div>
  );
}
