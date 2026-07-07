// Central mock data for the Bank Educator platform.
// Replace with real backend later; UI treats these as the source of truth.

export type Course = {
  id: string;
  slug: string;
  title: string;
  category: "SBI PO" | "IBPS PO" | "SBI Clerk" | "IBPS Clerk" | "RBI Grade B" | "NABARD" | "Insurance";
  price: number;
  mrp: number;
  rating: number;
  students: number;
  duration: string;
  language: string;
  instructor: string;
  thumbnail: string;
  highlights: string[];
  description: string;
  syllabus: { title: string; lessons: string[] }[];
};

export type MockTest = {
  id: string;
  slug: string;
  title: string;
  exam: string;
  type: "Full Length" | "Sectional" | "Previous Year";
  questions: number;
  duration: number; // minutes
  marks: number;
  attempts: number;
  isFree: boolean;
};

export type Quiz = {
  id: string;
  slug: string;
  title: string;
  topic: string;
  questions: QuizQuestion[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  cover: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
};

export type CurrentAffair = {
  id: string;
  date: string;
  title: string;
  category: "Banking" | "Economy" | "International" | "National" | "Awards" | "Sports";
  summary: string;
  source: string;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  type: "info" | "success" | "warning";
  read: boolean;
};

const cover = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1200&q=70`;

export const courses: Course[] = [
  {
    id: "c1", slug: "sbi-po-mastercourse-2026",
    title: "SBI PO Mastercourse 2026",
    category: "SBI PO", price: 2499, mrp: 4999, rating: 4.8, students: 12480,
    duration: "6 months", language: "Hindi + English",
    instructor: "Rohit Nagar",
    thumbnail: cover("1554224155-6726b3ff858f"),
    highlights: ["500+ live classes", "80 full-length mocks", "PYQ vault", "24×7 doubt support", "Interview prep"],
    description:
      "A complete SBI PO 2026 program covering Prelims, Mains and Interview. Live classes six days a week, structured DPPs, section-wise mocks and personal mentorship until you crack it.",
    syllabus: [
      { title: "Quantitative Aptitude", lessons: ["Number System", "Simplification", "DI", "Data Sufficiency", "Advanced Arithmetic"] },
      { title: "Reasoning Ability", lessons: ["Puzzles", "Seating Arrangement", "Syllogism", "Input–Output", "Coding-Decoding"] },
      { title: "English Language", lessons: ["Reading Comp.", "Cloze Test", "Error Spotting", "Para Jumbles", "Vocabulary"] },
      { title: "General & Banking Awareness", lessons: ["Static GK", "Banking Awareness", "Current Affairs", "Economy"] },
      { title: "Descriptive & Interview", lessons: ["Essay Writing", "Letter Writing", "Group Exercise", "PI Prep"] },
    ],
  },
  {
    id: "c2", slug: "ibps-po-foundation",
    title: "IBPS PO Foundation to Advanced",
    category: "IBPS PO", price: 1999, mrp: 3999, rating: 4.7, students: 9820,
    duration: "5 months", language: "Hindi + English",
    instructor: "Anjali Verma", thumbnail: cover("1450101499163-c8848c66ca85"),
    highlights: ["Concept + practice combo", "60 full mocks", "Sectional tests", "PDF notes"],
    description: "Structured IBPS PO course from basics to advanced with 60+ full-length mocks and 200+ sectional tests.",
    syllabus: [
      { title: "Prelims Foundation", lessons: ["Quant basics", "Reasoning basics", "English basics"] },
      { title: "Mains Booster", lessons: ["Advanced Quant", "High-level Reasoning", "GA capsule"] },
    ],
  },
  {
    id: "c3", slug: "rbi-grade-b-2026",
    title: "RBI Grade B Officer 2026",
    category: "RBI Grade B", price: 3999, mrp: 7999, rating: 4.9, students: 5430,
    duration: "7 months", language: "English",
    instructor: "Dr. Kunal Mehta", thumbnail: cover("1611974789855-9c2a0a7236a3"),
    highlights: ["ESI + F&M mastery", "Phase-II descriptive", "Mock interviews", "Ex-RBI mentors"],
    description: "Complete RBI Grade B roadmap — Phase 1, Phase 2 (ESI, F&M, English) and interview training by ex-RBI officers.",
    syllabus: [
      { title: "Phase 1", lessons: ["GA", "Reasoning", "Quant", "English"] },
      { title: "Phase 2 ESI", lessons: ["Growth & Dev.", "Indian Economy", "Social Structure"] },
      { title: "Phase 2 F&M", lessons: ["Financial System", "Financial Markets", "Risk Management"] },
    ],
  },
  {
    id: "c4", slug: "sbi-clerk-crash",
    title: "SBI Clerk Crash Course",
    category: "SBI Clerk", price: 999, mrp: 1999, rating: 4.6, students: 15100,
    duration: "60 days", language: "Hindi + English",
    instructor: "Priya Sharma", thumbnail: cover("1521737604893-d14cc237f11d"),
    highlights: ["Daily live classes", "40 mocks", "Speed tricks"],
    description: "Fast-paced clerk crash course focused on speed and accuracy for Prelims + Mains.",
    syllabus: [
      { title: "Prelims", lessons: ["Quant tricks", "Reasoning shortcuts", "English rapid"] },
    ],
  },
  {
    id: "c5", slug: "ibps-clerk-complete",
    title: "IBPS Clerk Complete Batch",
    category: "IBPS Clerk", price: 1299, mrp: 2499, rating: 4.7, students: 8720,
    duration: "4 months", language: "Hindi + English",
    instructor: "Ravi Kapoor", thumbnail: cover("1454165804606-c3d57bc86b40"),
    highlights: ["Prelims + Mains", "50 mocks", "GA capsule"],
    description: "End-to-end IBPS Clerk preparation with live and recorded classes.",
    syllabus: [{ title: "Full Syllabus", lessons: ["Quant", "Reasoning", "English", "GA", "Computer"] }],
  },
  {
    id: "c6", slug: "insurance-exams-combo",
    title: "Insurance Exams Combo (LIC AAO + NIACL)",
    category: "Insurance", price: 1799, mrp: 3499, rating: 4.5, students: 3980,
    duration: "5 months", language: "English",
    instructor: "Neha Rathi", thumbnail: cover("1556742049-0cfed4f6a45d"),
    highlights: ["Insurance awareness", "Descriptive prep", "Mock interviews"],
    description: "Combo course covering LIC AAO, NIACL AO & Assistant with insurance-focused GK.",
    syllabus: [{ title: "Core", lessons: ["Insurance Awareness", "Quant", "Reasoning", "English", "Descriptive"] }],
  },
];

export const mockTests: MockTest[] = [
  { id: "m1", slug: "sbi-po-prelims-mock-1", title: "SBI PO Prelims — Mock #1", exam: "SBI PO", type: "Full Length", questions: 100, duration: 60, marks: 100, attempts: 24300, isFree: true },
  { id: "m2", slug: "sbi-po-prelims-mock-2", title: "SBI PO Prelims — Mock #2", exam: "SBI PO", type: "Full Length", questions: 100, duration: 60, marks: 100, attempts: 18450, isFree: false },
  { id: "m3", slug: "ibps-po-mains-mock-1", title: "IBPS PO Mains — Mock #1", exam: "IBPS PO", type: "Full Length", questions: 155, duration: 180, marks: 200, attempts: 9100, isFree: false },
  { id: "m4", slug: "rbi-gb-phase1-mock", title: "RBI Grade B Phase 1 — Mock", exam: "RBI Grade B", type: "Full Length", questions: 200, duration: 120, marks: 200, attempts: 4210, isFree: false },
  { id: "m5", slug: "sbi-clerk-sectional-quant", title: "SBI Clerk — Quant Sectional", exam: "SBI Clerk", type: "Sectional", questions: 35, duration: 20, marks: 35, attempts: 15200, isFree: true },
  { id: "m6", slug: "ibps-clerk-pyq-2024", title: "IBPS Clerk PYQ 2024", exam: "IBPS Clerk", type: "Previous Year", questions: 100, duration: 60, marks: 100, attempts: 12800, isFree: true },
  { id: "m7", slug: "lic-aao-mains", title: "LIC AAO Mains — Mock #1", exam: "LIC AAO", type: "Full Length", questions: 120, duration: 120, marks: 200, attempts: 2100, isFree: false },
  { id: "m8", slug: "sbi-po-mains-mock-1", title: "SBI PO Mains — Mock #1", exam: "SBI PO", type: "Full Length", questions: 155, duration: 180, marks: 200, attempts: 6740, isFree: false },
];

export const quizzes: Quiz[] = [
  {
    id: "q1", slug: "banking-awareness-daily",
    title: "Banking Awareness — Daily Quiz",
    topic: "Banking Awareness",
    questions: [
      { id: "q1-1", question: "Who regulates the banking sector in India?", options: ["SEBI", "IRDAI", "RBI", "Ministry of Finance"], correctIndex: 2, explanation: "The Reserve Bank of India (RBI) is the central bank and regulator of the Indian banking system." },
      { id: "q1-2", question: "What is the current repo rate (as of latest policy)?", options: ["6.50%", "5.50%", "6.00%", "7.00%"], correctIndex: 0, explanation: "As per the latest MPC decision, the repo rate stands at 6.50%." },
      { id: "q1-3", question: "MCLR stands for?", options: ["Marginal Credit Lending Rate", "Marginal Cost of Funds based Lending Rate", "Minimum Cost Loan Rate", "Managed Credit Loan Rate"], correctIndex: 1, explanation: "MCLR = Marginal Cost of Funds based Lending Rate." },
      { id: "q1-4", question: "Which is the oldest joint-stock bank of India?", options: ["SBI", "PNB", "Allahabad Bank", "Bank of India"], correctIndex: 1, explanation: "Allahabad Bank (est. 1865) was the oldest joint-stock bank; PNB (1894) is the oldest Indian-owned still-operating one." },
      { id: "q1-5", question: "NABARD was established on?", options: ["12 July 1982", "1 April 1935", "19 July 1969", "1 April 1980"], correctIndex: 0, explanation: "NABARD was established on 12 July 1982." },
    ],
  },
  {
    id: "q2", slug: "quant-simplification",
    title: "Quant — Simplification Drill",
    topic: "Quantitative Aptitude",
    questions: [
      { id: "q2-1", question: "45% of 240 + 30% of 160 = ?", options: ["148", "156", "168", "172"], correctIndex: 1, explanation: "45% × 240 = 108, 30% × 160 = 48, total = 156." },
      { id: "q2-2", question: "√1521 = ?", options: ["37", "39", "41", "43"], correctIndex: 1, explanation: "39² = 1521." },
      { id: "q2-3", question: "18 × 25 − 120 ÷ 4 = ?", options: ["420", "430", "440", "410"], correctIndex: 0, explanation: "450 − 30 = 420." },
    ],
  },
  {
    id: "q3", slug: "reasoning-syllogism",
    title: "Reasoning — Syllogism",
    topic: "Reasoning",
    questions: [
      { id: "q3-1", question: "All pens are books. Some books are red. Conclusion: Some pens are red.", options: ["True", "False", "Cannot be determined", "Data insufficient"], correctIndex: 2, explanation: "Conclusion doesn't follow definitively." },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1", slug: "sbi-po-2026-notification-full-analysis",
    title: "SBI PO 2026 Notification — Full Analysis & Strategy",
    excerpt: "Complete breakdown of the SBI PO 2026 notification, eligibility, exam pattern and a 90-day preparation roadmap.",
    content: "SBI PO 2026 notification is expected in the first quarter…\n\n## Eligibility\nGraduation from a recognised university…\n\n## Exam Pattern\nPrelims + Mains + Interview…\n\n## 90-day Roadmap\nWeek 1–4: Foundations…",
    author: "Rohit Nagar", category: "Exam Analysis", cover: cover("1454165804606-c3d57bc86b40"),
    publishedAt: "2026-06-24", readingTime: 8, tags: ["SBI PO", "Notification", "Strategy"],
  },
  {
    id: "b2", slug: "ibps-po-vs-sbi-po-which-to-target",
    title: "IBPS PO vs SBI PO — Which one should you target first?",
    excerpt: "A candid comparison of salary, difficulty, career growth and posting to help you choose.",
    content: "Both exams open the door to a rewarding banking career…",
    author: "Anjali Verma", category: "Guidance", cover: cover("1450101499163-c8848c66ca85"),
    publishedAt: "2026-06-15", readingTime: 6, tags: ["SBI PO", "IBPS PO"],
  },
  {
    id: "b3", slug: "rbi-grade-b-esi-fm-plan",
    title: "RBI Grade B — Cracking ESI & F&M in 60 days",
    excerpt: "A tested 60-day study plan for RBI Grade B Phase 2 with recommended sources.",
    content: "Phase 2 is where most aspirants lose the game…",
    author: "Dr. Kunal Mehta", category: "Study Plan", cover: cover("1611974789855-9c2a0a7236a3"),
    publishedAt: "2026-06-01", readingTime: 10, tags: ["RBI", "ESI", "F&M"],
  },
  {
    id: "b4", slug: "top-banking-current-affairs-june",
    title: "Top Banking Current Affairs — June Recap",
    excerpt: "All the important RBI announcements, appointments and financial news from June curated for banking aspirants.",
    content: "1. RBI keeps repo rate unchanged at 6.50%…\n2. New governor of…\n3. UPI transactions cross…",
    author: "Editorial Desk", category: "Current Affairs", cover: cover("1556742049-0cfed4f6a45d"),
    publishedAt: "2026-06-30", readingTime: 5, tags: ["Current Affairs", "Banking"],
  },
];

export const currentAffairs: CurrentAffair[] = [
  { id: "ca1", date: "2026-07-06", title: "RBI keeps repo rate unchanged at 6.50%", category: "Banking", summary: "In its latest MPC meeting, the RBI maintained the repo rate at 6.50% citing sticky inflation and robust growth.", source: "RBI" },
  { id: "ca2", date: "2026-07-05", title: "UPI transactions cross ₹25 lakh crore in June", category: "Banking", summary: "NPCI reported a record ₹25.3 lakh crore worth of UPI transactions in June 2026.", source: "NPCI" },
  { id: "ca3", date: "2026-07-04", title: "India signs trade pact with UAE for local-currency settlement", category: "International", summary: "The MoU expands INR-AED settlement for oil and non-oil trade.", source: "MEA" },
  { id: "ca4", date: "2026-07-03", title: "SEBI tightens F&O disclosure norms", category: "Economy", summary: "New framework mandates enhanced disclosures for high-frequency traders.", source: "SEBI" },
  { id: "ca5", date: "2026-07-02", title: "SBI launches AI-powered YONO 2.0", category: "Banking", summary: "SBI unveiled the next generation of YONO with GenAI features for customers.", source: "SBI" },
  { id: "ca6", date: "2026-07-01", title: "India ranks 3rd in global fintech funding — Q2 2026", category: "Economy", summary: "India retained its position as the third-largest fintech funding destination globally.", source: "CB Insights" },
  { id: "ca7", date: "2026-06-30", title: "New Deputy Governor of RBI appointed", category: "Banking", summary: "Cabinet approved the appointment of the new Deputy Governor for a 3-year term.", source: "PIB" },
  { id: "ca8", date: "2026-06-29", title: "IMF revises India GDP forecast to 7.1%", category: "Economy", summary: "IMF raised India's FY27 growth forecast on the back of strong domestic demand.", source: "IMF" },
];

export const bankExams = [
  "SBI PO", "SBI Clerk", "IBPS PO", "IBPS Clerk", "IBPS RRB", "RBI Grade B", "RBI Assistant", "NABARD Grade A", "LIC AAO", "NIACL AO", "SIDBI", "SEBI Grade A",
];
