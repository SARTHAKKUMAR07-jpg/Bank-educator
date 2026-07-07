import { useEffect, useState } from "react";

export type BlogStatus = "published" | "draft" | "trashed" | "scheduled";

export interface CMSBlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  cover: string;
  excerpt: string;
  content: string;
  tags: string[];
  metaTitle: string | null;
  metaDescription: string | null;
  status: BlogStatus;
  publishedAt: string;
  author: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "bank_educator_blogs";

const MOCK_BLOGS: CMSBlogPost[] = [
  {
    id: "1",
    title: "SBI PO 2024: Complete Strategy and Study Plan",
    slug: "sbi-po-2024-strategy",
    category: "Study Plan",
    cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    excerpt: "A comprehensive day-by-day study plan to crack SBI PO 2024 in your first attempt. Covers prelims and mains preparation strategies.",
    content: "Full content goes here...",
    tags: ["SBI PO", "Strategy", "Study Plan"],
    metaTitle: "SBI PO 2024 Strategy",
    metaDescription: "How to crack SBI PO 2024",
    status: "published",
    publishedAt: new Date().toISOString(),
    author: "Editorial Desk",
    readingTime: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "IBPS Clerk Prelims Analysis 2024",
    slug: "ibps-clerk-prelims-analysis-2024",
    category: "Exam Analysis",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    excerpt: "Detailed shift-wise analysis of IBPS Clerk Prelims 2024. Check good attempts, difficulty level, and expected cut-offs.",
    content: "Full content goes here...",
    tags: ["IBPS Clerk", "Analysis"],
    metaTitle: "IBPS Clerk Analysis",
    metaDescription: "IBPS Clerk Prelims Analysis",
    status: "published",
    publishedAt: new Date().toISOString(),
    author: "Exam Expert",
    readingTime: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Top 50 Banking Awareness Questions for Upcoming Exams",
    slug: "top-50-banking-awareness-questions",
    category: "Banking",
    cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80",
    excerpt: "Master banking awareness with these 50 most expected questions. Essential for SBI, IBPS, and RBI exams.",
    content: "Full content goes here...",
    tags: ["Banking Awareness", "Questions"],
    metaTitle: "Banking Awareness Questions",
    metaDescription: "Top 50 Banking Awareness Questions",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    author: "GK Faculty",
    readingTime: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "How to Improve Speed and Accuracy in Quantitative Aptitude",
    slug: "improve-speed-accuracy-quant",
    category: "Guidance",
    cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80",
    excerpt: "Struggling with Quant? Learn proven techniques to calculate faster and avoid silly mistakes in banking exams.",
    content: "Full content goes here...",
    tags: ["Quant", "Tips"],
    metaTitle: "Improve Quant Speed",
    metaDescription: "Tips to improve Quantitative Aptitude speed and accuracy",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    author: "Quant Expert",
    readingTime: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Weekly Current Affairs Capsule - October Week 1",
    slug: "weekly-current-affairs-october-w1",
    category: "Current Affairs",
    cover: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80",
    excerpt: "All the important news and events from the first week of October compiled in one place for quick revision.",
    content: "Full content goes here...",
    tags: ["Current Affairs", "Weekly Revision"],
    metaTitle: "Current Affairs October Week 1",
    metaDescription: "Weekly current affairs for banking exams",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    author: "Current Affairs Desk",
    readingTime: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "RBI Grade B 2025: Notification, Eligibility, and Syllabus",
    slug: "rbi-grade-b-2025-details",
    category: "Banking",
    cover: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&q=80",
    excerpt: "Everything you need to know about the upcoming RBI Grade B 2025 exam. Start your preparation early.",
    content: "Full content goes here...",
    tags: ["RBI Grade B", "Notification"],
    metaTitle: "RBI Grade B 2025 details",
    metaDescription: "RBI Grade B 2025 notification and syllabus",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    author: "Regulatory Bodies Expert",
    readingTime: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "7",
    title: "Mastering Puzzles and Seating Arrangement for Mains",
    slug: "mastering-puzzles-seating-arrangement",
    category: "Guidance",
    cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80",
    excerpt: "Conquer the reasoning section by mastering high-level puzzles and seating arrangements. Learn the step-by-step approach.",
    content: "Full content goes here...",
    tags: ["Reasoning", "Puzzles"],
    metaTitle: "Master Puzzles",
    metaDescription: "How to solve high-level puzzles for banking mains",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    author: "Reasoning Faculty",
    readingTime: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "8",
    title: "Interview Tips for IBPS PO: What to Expect and How to Answer",
    slug: "interview-tips-ibps-po",
    category: "Guidance",
    cover: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    excerpt: "Cleared the mains? Prepare for the IBPS PO interview with these expert tips and most commonly asked questions.",
    content: "Full content goes here...",
    tags: ["Interview", "IBPS PO"],
    metaTitle: "IBPS PO Interview Tips",
    metaDescription: "Preparation tips for banking interviews",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    author: "Ex-Banker",
    readingTime: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

class CMSStore {
  private blogs: CMSBlogPost[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          this.blogs = JSON.parse(stored);
        } catch (e) {
          console.error("Failed to parse blogs from local storage", e);
          this.blogs = MOCK_BLOGS;
          this.saveToStorage();
        }
      } else {
        this.blogs = MOCK_BLOGS;
        this.saveToStorage();
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.blogs));
      this.notifyListeners();
    }
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  getBlogs() {
    return this.blogs;
  }

  getBlog(id: string) {
    return this.blogs.find((b) => b.id === id);
  }
  
  getBlogBySlug(slug: string) {
    return this.blogs.find((b) => b.slug === slug);
  }

  addBlog(blog: Omit<CMSBlogPost, "id" | "createdAt" | "updatedAt">) {
    const newBlog: CMSBlogPost = {
      ...blog,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.blogs = [newBlog, ...this.blogs];
    this.saveToStorage();
    return newBlog;
  }

  updateBlog(id: string, updates: Partial<CMSBlogPost>) {
    this.blogs = this.blogs.map((b) =>
      b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
    );
    this.saveToStorage();
  }

  deleteBlog(id: string) {
    this.blogs = this.blogs.filter((b) => b.id !== id);
    this.saveToStorage();
  }
  
  bulkUpdateStatus(ids: string[], status: BlogStatus) {
    this.blogs = this.blogs.map((b) => 
      ids.includes(b.id) ? { ...b, status, updatedAt: new Date().toISOString() } : b
    );
    this.saveToStorage();
  }

  bulkDelete(ids: string[]) {
    this.blogs = this.blogs.filter((b) => !ids.includes(b.id));
    this.saveToStorage();
  }
}

export const cmsStore = new CMSStore();

export function useBlogs() {
  const [blogs, setBlogs] = useState<CMSBlogPost[]>([]);

  useEffect(() => {
    // Initial load
    setBlogs(cmsStore.getBlogs());
    
    // Subscribe to changes
    const unsubscribe = cmsStore.subscribe(() => {
      setBlogs(cmsStore.getBlogs());
    });
    
    return unsubscribe;
  }, []);

  return blogs;
}
