import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Bold, Italic, List, ListOrdered, Image as ImageIcon, 
  Link as LinkIcon, Code, Eye, Save, X, Calendar as CalendarIcon, Play
} from "lucide-react";
import { toast } from "sonner";
import { cmsStore, useBlogs, CMSBlogPost, BlogStatus } from "@/lib/cms-store";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogEditorProps {
  blogId?: string | null;
  onClose: () => void;
}

export function BlogEditor({ blogId, onClose }: BlogEditorProps) {
  const isEditing = !!blogId;
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Banking");
  const [author, setAuthor] = useState("Editorial Desk");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [status, setStatus] = useState<BlogStatus>("draft");
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0]);
  
  // SEO fields
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  
  const [isPreview, setIsPreview] = useState(false);

  const blogs = useBlogs();

  useEffect(() => {
    if (isEditing && blogId) {
      const blog = blogs.find(b => b.id === blogId);
      if (blog) {
        setTitle(blog.title);
        setSlug(blog.slug);
        setCategory(blog.category);
        setAuthor(blog.author);
        setExcerpt(blog.excerpt);
        setContent(blog.content);
        setCover(blog.cover);
        setStatus(blog.status);
        setPublishedAt(blog.publishedAt);
        setSeoTitle(blog.metaTitle || "");
        setSeoDescription(blog.metaDescription || "");
        setKeywords(blog.tags ? blog.tags.join(', ') : "");
      }
    }
  }, [blogId, isEditing, blogs]);

  const generateSlug = (val: string) => {
    return val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!isEditing) {
      setSlug(generateSlug(e.target.value));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (saveStatus: BlogStatus) => {
    if (!title || !slug || !content) {
      toast.error("Title, Slug, and Content are required.");
      return;
    }

    const blogData = {
      title,
      slug,
      category,
      author,
      excerpt,
      content,
      cover: cover || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70",
      status: saveStatus,
      publishedAt,
      readingTime: Math.max(1, Math.ceil(content.split(" ").length / 200)),
      tags: keywords.split(",").map(k => k.trim()).filter(Boolean),
      metaTitle: seoTitle,
      metaDescription: seoDescription,
    };

    if (isEditing && blogId) {
      cmsStore.updateBlog(blogId, blogData);
      toast.success("Blog updated successfully");
    } else {
      cmsStore.addBlog(blogData);
      toast.success("Blog created successfully");
    }
    onClose();
  };

  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const before = content.substring(0, start);
    const after = content.substring(end);
    
    setContent(before + prefix + selectedText + suffix + after);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden">
      {/* Topbar */}
      <div className="h-16 border-b flex items-center justify-between px-6 bg-card shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="font-bold text-lg">{isEditing ? "Edit Blog Post" : "New Blog Post"}</h2>
            <div className="text-xs text-muted-foreground">
              {status === "published" ? <Badge className="bg-emerald-500 hover:bg-emerald-600">Published</Badge> : <Badge variant="secondary">{status}</Badge>}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="mr-2 h-4 w-4" /> {isPreview ? "Edit" : "Preview"}
          </Button>
          <Button variant="outline" onClick={() => handleSave("draft")}>
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
          <Button onClick={() => handleSave(publishedAt > new Date().toISOString().split('T')[0] ? "scheduled" : "published")}>
            <Play className="mr-2 h-4 w-4" /> {publishedAt > new Date().toISOString().split('T')[0] ? "Schedule" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-muted/20">
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          
          {/* Main Editor Content */}
          <div className="space-y-6">
            {!isPreview ? (
              <Card className="p-6 space-y-6 border-0 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Post Title..." 
                      className="text-3xl font-display font-bold h-16 border-0 px-0 rounded-none focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground/50"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Content Editor</Label>
                    <div className="border rounded-md overflow-hidden bg-background focus-within:ring-1 focus-within:ring-ring">
                      {/* Toolbar */}
                      <div className="flex items-center gap-1 border-b bg-muted/40 p-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("**", "**")}><Bold className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("*", "*")}><Italic className="h-4 w-4" /></Button>
                        <div className="w-px h-4 bg-border mx-1"></div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("### ")}><div className="font-bold text-sm">H3</div></Button>
                        <div className="w-px h-4 bg-border mx-1"></div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("- ")}><List className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("1. ")}><ListOrdered className="h-4 w-4" /></Button>
                        <div className="w-px h-4 bg-border mx-1"></div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("[Text](url)")}><LinkIcon className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("![Alt Text](image_url)")}><ImageIcon className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("```\n", "\n```")}><Code className="h-4 w-4" /></Button>
                      </div>
                      <Textarea 
                        id="content-editor"
                        placeholder="Write your blog post here... (Markdown supported)"
                        className="min-h-[500px] border-0 focus-visible:ring-0 resize-y rounded-none text-base p-4 leading-relaxed font-sans"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Excerpt</Label>
                    <Textarea 
                      placeholder="Brief summary for blog cards..."
                      className="h-20 resize-none"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                    />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-10 border-0 shadow-sm min-h-[600px] prose prose-slate max-w-none">
                <h1 className="text-4xl font-display font-bold mb-6">{title || "Untitled Post"}</h1>
                <div className="whitespace-pre-wrap">{content || "No content to preview."}</div>
              </Card>
            )}
          </div>
          
          {/* Sidebar Settings */}
          <div className="space-y-6">
            
            <Card className="p-5 border-0 shadow-sm space-y-4">
              <h3 className="font-semibold border-b pb-2">Publishing</h3>
              
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="date" className="pl-9" value={publishedAt} onChange={e => setPublishedAt(e.target.value)} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Author</Label>
                <Input value={author} onChange={e => setAuthor(e.target.value)} />
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RBI Updates">RBI Updates</SelectItem>
                    <SelectItem value="IBPS Updates">IBPS Updates</SelectItem>
                    <SelectItem value="SBI News">SBI News</SelectItem>
                    <SelectItem value="NABARD News">NABARD News</SelectItem>
                    <SelectItem value="Government Jobs">Government Jobs</SelectItem>
                    <SelectItem value="Editorial Picks">Editorial Picks</SelectItem>
                    <SelectItem value="Trending News">Trending News</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <Card className="p-5 border-0 shadow-sm space-y-4">
              <h3 className="font-semibold border-b pb-2">Media</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Featured Image Upload</Label>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                <div className="space-y-2">
                  <Label>Or Image URL</Label>
                  <Input placeholder="https://..." value={cover} onChange={e => setCover(e.target.value)} />
                </div>
                {cover && (
                  <div className="mt-2 aspect-video rounded-md overflow-hidden bg-muted border">
                    <img src={cover} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-5 border-0 shadow-sm space-y-4">
              <h3 className="font-semibold border-b pb-2">SEO Settings</h3>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={slug} onChange={e => setSlug(generateSlug(e.target.value))} />
              </div>
              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input placeholder="Overrides blog title for SEO" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea className="h-20" placeholder="Meta description for search engines" value={seoDescription} onChange={e => setSeoDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Keywords (comma separated)</Label>
                <Input placeholder="sbi po, exam strategy" value={keywords} onChange={e => setKeywords(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Canonical URL</Label>
                <Input placeholder="https://..." value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
