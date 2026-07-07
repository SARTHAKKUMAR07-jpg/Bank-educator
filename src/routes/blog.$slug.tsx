import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { cmsStore, useBlogs, CMSBlogPost } from "@/lib/cms-store";
import { Badge } from "@/components/ui/badge";
import { Clock, User, ArrowLeft } from "lucide-react";
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    // Because it's an SPA, this runs on the client.
    const post = cmsStore.getBlogs().find(p => p.slug === params.slug && p.status === "published");
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article — Bank Educator" }] };
    const { post } = loaderData;
    return {
      meta: [
        { title: post.seoTitle || `${post.title} — Bank Educator Blog` },
        { name: "description", content: post.seoDescription || post.excerpt },
        { name: "keywords", content: post.keywords || post.tags.join(",") },
        { property: "og:title", content: post.seoTitle || post.title },
        { property: "og:description", content: post.seoDescription || post.excerpt },
        { property: "og:image", content: post.ogImage || post.cover },
        { property: "article:published_time", content: post.publishedAt },
      ],
      links: post.canonicalUrl ? [
        { rel: "canonical", href: post.canonicalUrl }
      ] : []
    };
  },
  component: BlogPost,
  notFoundComponent: () => (
    <MarketingShell>
      <div className="p-24 text-center space-y-4">
        <h2 className="text-3xl font-bold font-display">Post not found</h2>
        <p className="text-muted-foreground">The article you're looking for doesn't exist or is not published.</p>
        <Button asChild className="mt-4"><Link to="/blog">Back to blog</Link></Button>
      </div>
    </MarketingShell>
  ),
});

function MarkdownRenderer({ content }: { content: string }) {
  // A simple markdown renderer to support basic rich text from the CMS
  const renderParagraph = (text: string, key: number) => {
    if (text.startsWith("### ")) return <h3 key={key} className="font-display text-2xl font-bold mt-10 mb-4 text-foreground">{text.slice(4)}</h3>;
    if (text.startsWith("## ")) return <h2 key={key} className="font-display text-3xl font-bold mt-12 mb-5 text-foreground">{text.slice(3)}</h2>;
    if (text.startsWith("# ")) return <h1 key={key} className="font-display text-4xl font-bold mt-14 mb-6 text-foreground">{text.slice(2)}</h1>;
    if (text.startsWith("```")) return (
      <div key={key} className="bg-muted text-foreground p-4 rounded-xl my-6 overflow-x-auto text-sm font-mono border">
        {text.replace(/```\w*\n?/, "").replace(/```$/, "")}
      </div>
    );
    if (text.startsWith("![") && text.includes("](")) {
      const alt = text.match(/!\[(.*?)\]/)?.[1] || "";
      const src = text.match(/\((.*?)\)/)?.[1] || "";
      return <img key={key} src={src} alt={alt} className="w-full rounded-xl my-8 border" />;
    }
    
    // Parse bold, italic, links, lists inside paragraph
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      .replace(/^- (.*)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^1\. (.*)/gm, '<li class="ml-4 list-decimal">$1</li>');

    if (html.includes('<li>')) {
      return <ul key={key} className="my-4 space-y-2" dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return <p key={key} className="mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="prose-slate text-lg text-foreground/90">
      {content.split(/\n\n+/).map((para, i) => renderParagraph(para.trim(), i))}
    </div>
  );
}

function BlogPost() {
  const { post } = Route.useLoaderData() as { post: CMSBlogPost };
  const allBlogs = useBlogs();
  
  const relatedPosts = useMemo(() => {
    return allBlogs
      .filter(b => b.status === "published" && b.id !== post.id && b.category === post.category)
      .slice(0, 3);
  }, [allBlogs, post.id, post.category]);

  return (
    <MarketingShell>
      <article className="bg-background">
        {/* Header */}
        <header className="pt-24 pb-12 px-6 border-b bg-muted/20">
          <div className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
            </Link>
            
            <Badge className="mb-6">{post.category}</Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-foreground tracking-tight">
              {post.title}
            </h1>
            
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="mt-8 flex items-center gap-4 text-sm font-medium text-foreground/80 pt-8 border-t">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-gold to-orange-400 shadow-inner" />
                <div>
                  <div className="text-foreground">{post.author}</div>
                  <div className="text-muted-foreground font-normal">{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
                </div>
              </div>
              <div className="w-px h-10 bg-border mx-2"></div>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readingTime} min read</span>
            </div>
          </div>
        </header>

        {/* Cover & Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="-mt-24 mb-16 shadow-xl rounded-2xl overflow-hidden bg-background border border-border/50">
            <img src={post.cover} alt={post.title} className="w-full aspect-[2/1] object-cover" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <MarkdownRenderer content={post.content} />
            
            {post.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2 flex items-center">Tags:</span>
                {post.tags.map(t => (
                  <Badge key={t} variant="secondary" className="bg-muted/50 text-muted-foreground">{t}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t bg-muted/10 py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl font-bold mb-10">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map(b => (
                <Link key={b.id} to="/blog/$slug" params={{ slug: b.slug }} className="group flex flex-col h-full">
                  <Card className="overflow-hidden h-full py-0 border-0 shadow-sm hover:shadow-lg transition-all flex flex-col bg-background">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={b.cover} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="font-display text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">{b.title}</h3>
                      <p className="mt-3 text-muted-foreground line-clamp-2 text-sm flex-1">{b.excerpt}</p>
                      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground font-medium">
                        <span>{new Date(b.publishedAt).toLocaleDateString()}</span>
                        <span>{b.readingTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </MarketingShell>
  );
}
