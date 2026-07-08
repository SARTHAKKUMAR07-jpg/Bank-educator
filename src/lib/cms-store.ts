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

const STORAGE_KEY = "bank_educator_blogs_v5";

const MOCK_BLOGS: CMSBlogPost[] = [
  {
    id: "1",
    title: "RBI Keeps Repo Rate Unchanged at 6.5% for 6th Consecutive Time",
    slug: "rbi-repo-rate-unchanged-6-5",
    category: "RBI Updates",
    cover: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
    excerpt: "The Monetary Policy Committee (MPC) of the RBI has unanimously decided to keep the repo rate unchanged at 6.5%.",
    content: "## A Stabilizing Move for the Indian Economy\n\nThe Monetary Policy Committee (MPC) of the Reserve Bank of India (RBI) has concluded its latest bi-monthly meeting with a unanimous decision to keep the repo rate unchanged at 6.5%. This marks the sixth consecutive time the central bank has maintained the status quo, signaling a firm commitment to balancing economic growth with inflation control.\n\n### The Rationale Behind the Decision\n\nGovernor Shaktikanta Das highlighted that while domestic economic activity remains robust, global headwinds and volatile food prices necessitate a cautious approach. The core inflation has shown signs of moderation, yet the unpredictable nature of food inflation continues to pose a risk to the overarching inflation target of 4%.\n\n- **Inflation Dynamics:** The MPC noted that retail inflation (CPI) has hovered around the upper tolerance band due to supply-side shocks.\n- **Growth Outlook:** The GDP growth projection for the current fiscal year has been retained at a strong 7%, underscoring the resilience of the Indian economy.\n- **Liquidity Management:** The RBI will continue with its stance of 'withdrawal of accommodation' to ensure that inflation progressively aligns with the target, while supporting growth.\n\n### Impact on Borrowers and Depositors\n\nFor the common man, the decision brings a sigh of relief. \n\n1. **Home and Auto Loans:** Existing borrowers will not see an immediate spike in their Equated Monthly Installments (EMIs). \n2. **Fixed Deposits:** Depositors can continue to enjoy attractive interest rates, as banks compete for liquidity to fund credit growth.\n\n### What Industry Experts Say\n\nFinancial analysts and industry leaders have largely welcomed the move. The real estate sector, in particular, views the steady interest rates as a catalyst for sustaining the momentum in housing demand. According to leading economists, the RBI's 'wait and watch' approach is prudent given the geopolitical uncertainties and the impending elections.\n\n### Looking Ahead\n\nAs the RBI continues to monitor the macroeconomic indicators, any future rate cuts will largely depend on a sustained decline in inflation. For now, the stability in monetary policy provides a predictable environment for businesses and consumers alike.",
    tags: ["RBI", "Monetary Policy"],
    metaTitle: "RBI Repo Rate Unchanged",
    metaDescription: "RBI keeps repo rate unchanged",
    status: "published",
    publishedAt: new Date().toISOString(),
    author: "Editorial Desk",
    readingTime: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "SBI PO 2024 Notification Expected in September: Important Dates",
    slug: "sbi-po-2024-notification",
    category: "SBI News",
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80",
    excerpt: "State Bank of India is expected to release the SBI PO 2024 notification in September. Check tentative dates and eligibility.",
    content: "## The Most Awaited Banking Notification of the Year\n\nThe State Bank of India (SBI) Probationary Officer (PO) exam is undoubtedly the most coveted banking examination in the country. Aspirants wait with bated breath for the official notification, and according to reliable sources, the SBI PO 2024 notification is expected to drop in the second week of September.\n\n### What to Expect in 2024?\n\nWhile the official details are yet to be published, historical trends and internal reports suggest a substantial number of vacancies this year. \n\n- **Estimated Vacancies:** Over 2,000 vacancies are expected to be announced, catering to various categories.\n- **Exam Phases:** The recruitment process will continue to follow the three-tier structure: Preliminary Examination, Main Examination, and the Psychometric Test/Interview phase.\n\n### Important Tentative Dates\n\nTo help aspirants plan their preparation strategy, here is a tentative schedule based on previous years' patterns:\n\n1. **Release of Notification:** Mid-September 2024\n2. **Online Registration Process:** September to October 2024\n3. **Preliminary Examination:** November 2024\n4. **Main Examination:** December 2024\n5. **Interview and Final Results:** February/March 2025\n\n### Eligibility Criteria Overview\n\nAspirants planning to apply must ensure they meet the basic eligibility requirements:\n\n- **Educational Qualification:** A bachelor's degree in any discipline from a recognized university. Final year students can also apply conditionally.\n- **Age Limit:** Candidates must be between 21 and 30 years of age, with standard relaxations applicable for reserved categories.\n\n### How to Kickstart Your Preparation\n\nWith only a few months left, serious candidates must shift their preparation into high gear.\n\n- **Focus on Basics:** Clear your concepts in Quantitative Aptitude and Reasoning Ability.\n- **Current Affairs:** Read financial newspapers daily. The General Awareness section in the Mains exam is a game-changer.\n- **Mock Tests:** Start taking at least one full-length mock test a week to build stamina and speed.\n\nStay tuned to our portal for the latest updates and detailed analysis once the official notification is released.",
    tags: ["SBI PO", "Notification"],
    metaTitle: "SBI PO 2024 Notification",
    metaDescription: "SBI PO 2024 notification details",
    status: "published",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    author: "News Desk",
    readingTime: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "IBPS Calendar 2024-25 Released: Check PO, Clerk, and RRB Exam Dates",
    slug: "ibps-calendar-2024-25",
    category: "IBPS Updates",
    cover: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80",
    excerpt: "The Institute of Banking Personnel Selection has released the tentative calendar for 2024-25 examinations.",
    content: "## Planning Your Banking Career for 2024-25\n\nThe Institute of Banking Personnel Selection (IBPS) has officially released its much-anticipated examination calendar for the year 2024-25. This calendar is the ultimate roadmap for lakhs of aspirants aiming to secure a prestigious job in public sector banks and regional rural banks across India.\n\n### A Structured Timeline for Aspirants\n\nThe release of the calendar early in the year allows candidates to structure their preparation systematically. The calendar details the preliminary and main examination dates for IBPS PO, Clerk, Specialist Officer (SO), and the Regional Rural Bank (RRB) exams.\n\n### IBPS RRB (Regional Rural Banks) Schedule\n\nThe recruitment process for RRBs typically kicks off the banking exam season.\n\n- **Preliminary Exams (Officer Scale I and Office Assistants):** Scheduled for August 2024.\n- **Main Examination (Officer Scale I):** Expected in late September 2024.\n- **Main Examination (Office Assistants):** Expected in early October 2024.\n\n### IBPS PO and Clerk Schedule\n\nFor those targeting nationalized public sector banks, the dates are equally crucial.\n\n- **IBPS Clerk Prelims:** Slated for late August and early September 2024.\n- **IBPS Clerk Mains:** Scheduled for October 2024.\n- **IBPS PO Prelims:** Expected in the second and third weeks of October 2024.\n- **IBPS PO Mains:** Scheduled for late November 2024.\n\n### Strategic Takeaways for Candidates\n\nHaving the exact dates months in advance provides a significant advantage.\n\n1. **Integrated Preparation:** Since the syllabus for RRB, Clerk, and PO exams overlaps significantly, candidates should adopt an integrated preparation strategy.\n2. **Current Affairs Timeline:** The Mains exams heavily test current affairs. Aspirants should focus on reading news starting from at least six months prior to their respective Mains exam dates.\n3. **Avoiding Burnout:** The back-to-back nature of these exams (from August to December) requires mental stamina. Taking regular breaks and maintaining a healthy lifestyle is as important as studying.\n\n### Conclusion\n\nThe IBPS calendar is not just a schedule; it's a call to action. With clear targets now set, aspirants must craft a meticulous study plan and commit to consistent practice. The journey to becoming a banker has officially begun.",
    tags: ["IBPS", "Calendar"],
    metaTitle: "IBPS Calendar 2024-25",
    metaDescription: "IBPS Calendar 2024-25",
    status: "published",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    author: "Exam Expert",
    readingTime: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "NABARD Grade A 2024 Vacancies Increased: Official Update",
    slug: "nabard-grade-a-2024-vacancies",
    category: "NABARD News",
    cover: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80",
    excerpt: "Good news for aspirants! NABARD has officially announced an increase in Grade A vacancies for the upcoming recruitment.",
    content: "## A Golden Opportunity for Agriculture and Rural Development Enthusiasts\n\nIn a highly encouraging update for banking and rural development aspirants, the National Bank for Agriculture and Rural Development (NABARD) has officially announced an increase in the number of vacancies for the Grade A (Assistant Manager) 2024 recruitment cycle. This unexpected revision makes the current drive one of the most lucrative opportunities in recent years.\n\n### Details of the Increased Vacancies\n\nInitially, the notification projected around 150 vacancies across various disciplines. However, an official corrigendum released by the board has revised this number upwards.\n\n- **Revised Total Vacancies:** The total count has been increased to approximately 185.\n- **General Discipline:** The bulk of the increase has been allocated to the General Discipline, opening doors for graduates from any stream.\n- **Specialized Disciplines:** Marginal increases have also been noted in IT, Agriculture, and Finance disciplines.\n\n### Why the Increase?\n\nIndustry insiders suggest that this increase aligns with the government's renewed focus on rural infrastructure development and agricultural financing. As NABARD expands its footprint and initiatives, the need for fresh, dynamic talent at the managerial level has grown correspondingly.\n\n### Understanding the Exam Pattern\n\nThe NABARD Grade A exam is known for its unique syllabus, which differs from standard banking exams like IBPS or SBI.\n\n1. **Phase I (Prelims):** A qualifying objective test featuring sections like Economic & Social Issues (ESI) and Agriculture & Rural Development (ARD), alongside standard reasoning, English, and quantitative sections.\n2. **Phase II (Mains):** Consists of descriptive English and objective/descriptive papers specific to the ESI and ARD syllabus.\n3. **Phase III (Interview):** A final personality assessment.\n\n### Preparation Strategy Post-Update\n\nWith more vacancies, the competition is expected to intensify as more candidates might apply or double their efforts.\n\n- **Focus heavily on ESI and ARD:** These two sections are the defining factors for clearing the Prelims cutoff.\n- **Descriptive English:** Do not ignore typing practice. The descriptive paper in Mains carries significant weight and requires both typing speed and coherent articulation.\n- **Government Schemes:** Stay thoroughly updated with recent government schemes related to agriculture, rural development, and financial inclusion.\n\nThis increase in vacancies is a rare boon. Aspirants must capitalize on this by accelerating their preparation and focusing on the unique aspects of the NABARD syllabus.",
    tags: ["NABARD", "Jobs"],
    metaTitle: "NABARD Grade A Vacancies",
    metaDescription: "NABARD Grade A vacancies increased",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    author: "News Desk",
    readingTime: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "SSC CGL 2024 Notification Out for 17,727 Posts",
    slug: "ssc-cgl-2024-notification",
    category: "Government Jobs",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    excerpt: "The Staff Selection Commission has released the official notification for CGL 2024 with a massive 17,727 vacancies.",
    content: "## The Biggest Recruitment Drive of the Year\n\nThe Staff Selection Commission (SSC) has finally answered the prayers of millions of government job aspirants by releasing the official notification for the Combined Graduate Level (CGL) 2024 examination. In what is being hailed as a historic announcement, the commission has declared a massive 17,727 vacancies across various Group B and Group C posts in ministries and departments of the Government of India.\n\n### Breakdown of Vacancies\n\nWhile the exact post-wise breakdown will be clarified closer to the Tier-I exam, tentative estimates indicate a significant push in the recruitment for:\n\n- **Income Tax Inspectors:** Always in high demand, expected to have a higher share this year.\n- **Assistant Section Officers (ASO):** Central Secretariat Service (CSS) and Ministry of External Affairs (MEA) will see substantial inductions.\n- **Auditors and Accountants:** Under CAG and CGDA, forming the bulk of Group C vacancies.\n\n### Exam Pattern and Important Changes\n\nUnlike previous years where the pattern saw major overhauls, the 2024 cycle will follow the recently established two-tier structure, which emphasizes conceptual clarity and speed.\n\n1. **Tier-I (Qualifying):** 100 questions covering General Intelligence, General Awareness, Quantitative Aptitude, and English Comprehension. Marks obtained here will not be counted for final merit.\n2. **Tier-II (Merit-determining):** A comprehensive test including Mathematical Abilities, Reasoning, English Language, General Awareness, and a crucial Computer Knowledge Module. \n\nIt is imperative to note that the Computer Knowledge Module is qualifying in nature but has higher qualifying standards for posts requiring proficiency.\n\n### A Strategic Approach to SSC CGL 2024\n\nWith the exam scheduled for late summer, aspirants have a narrow window to perfect their strategy.\n\n- **Master the Basics:** Quantitative aptitude and English carry the maximum weightage in Tier-II. Conceptual clarity is non-negotiable.\n- **Speed and Accuracy:** Since Tier-I is heavily time-constrained (60 minutes for 100 questions), daily mock tests are essential to build muscle memory.\n- **Typing Practice:** Many candidates clear the written tests but fail the Data Entry Speed Test (DEST). Dedicate 15 minutes daily to typing.\n\n### Conclusion\n\nThe declaration of 17,727 vacancies makes the SSC CGL 2024 a golden opportunity. Candidates must cut out distractions, stick to a rigorous study schedule, and practice relentlessly to secure a prestigious central government job.",
    tags: ["SSC CGL", "Notification"],
    metaTitle: "SSC CGL 2024 Notification",
    metaDescription: "SSC CGL 2024 Notification",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    author: "Govt Jobs Desk",
    readingTime: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "The Changing Landscape of Digital Banking in India",
    slug: "changing-landscape-digital-banking",
    category: "Editorial Picks",
    cover: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?auto=format&fit=crop&q=80",
    excerpt: "An in-depth analysis of how UPI and CBDC are transforming the Indian banking sector and what it means for future bankers.",
    content: "## A New Era of Financial Technology\n\nThe Indian banking sector is undergoing a seismic shift, driven by rapid technological advancements and changing consumer behavior. At the heart of this transformation are initiatives like the Unified Payments Interface (UPI) and the impending nationwide rollout of the Central Bank Digital Currency (CBDC), also known as the Digital Rupee.\n\n### The Ubiquity of UPI\n\nUPI has not just revolutionized payments; it has fundamentally altered how banks operate.\n\n- **Financial Inclusion:** UPI has brought millions of unbanked citizens into the formal financial fold, enabling micro-transactions at zero cost to the consumer.\n- **Data-Driven Lending:** Banks are now leveraging the massive transaction data generated by UPI to offer instant, unsecured, sachet-sized loans to consumers and MSMEs.\n\n### The Rise of CBDC\n\nWhile UPI is a payment rail, the Digital Rupee (e₹) is a sovereign currency in digital form, issued by the RBI.\n\n1. **Wholesale vs. Retail:** The pilot programs are testing both wholesale (for interbank settlements) and retail (for general public use) CBDCs.\n2. **Programmable Money:** The true potential of CBDC lies in programmable payments—for instance, government subsidies that can only be spent on fertilizers, ensuring targeted delivery and zero leakage.\n\n### Implications for Future Bankers\n\nFor aspirants looking to build a career in banking, this digital shift changes the required skill set.\n\n- **Tech-Savvy Operations:** Branch banking is moving away from basic cash handling to advisory and tech-support roles.\n- **Cybersecurity Focus:** As transactions move online, understanding digital security protocols will be a prerequisite for banking professionals.\n- **Analytical Skills:** The ability to understand and interpret data will be crucial for roles spanning credit assessment, fraud detection, and customer relationship management.\n\n### Conclusion\n\nThe landscape of digital banking in India is arguably the most advanced globally. For upcoming banking professionals, adapting to this tech-first ecosystem is no longer optional—it is the very foundation of a successful career.",
    tags: ["Digital Banking", "UPI"],
    metaTitle: "Digital Banking in India",
    metaDescription: "Digital Banking in India analysis",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    author: "Senior Editor",
    readingTime: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "7",
    title: "Is the Banking Sector Ready for AI Integration?",
    slug: "banking-sector-ai-integration",
    category: "Trending News",
    cover: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80",
    excerpt: "As AI tools become more prominent, Indian banks are evaluating the security and efficiency of AI-driven operations.",
    content: "## The AI Revolution in Finance\n\nArtificial Intelligence (AI) is no longer a futuristic concept; it is actively reshaping the global financial landscape. In India, public and private sector banks are racing to integrate AI into their core operations, raising a critical question: Is the banking sector truly ready for this technological leap?\n\n### Current Applications of AI in Banking\n\nIndian banks have moved beyond basic chatbots to deploy AI in more complex, value-driven areas.\n\n- **Credit Scoring:** AI algorithms now analyze alternative data sources (like utility payments and social behavior) to assess the creditworthiness of individuals lacking formal credit histories.\n- **Fraud Detection:** Machine learning models monitor millions of transactions in real-time, identifying anomalous patterns and preventing fraudulent activities before they occur.\n- **Hyper-Personalization:** Wealth management and retail banking are using AI to offer personalized investment advice and bespoke financial products based on customer spending habits.\n\n### The Challenges Ahead\n\nDespite the rapid adoption, significant hurdles remain before AI can be fully integrated into the banking ecosystem.\n\n1. **Data Privacy and Security:** AI models require vast amounts of data to train. Ensuring this data is secure and complies with the upcoming Digital Personal Data Protection (DPDP) Act is paramount.\n2. **The 'Black Box' Problem:** Regulatory bodies like the RBI require banks to explain their decisions, especially regarding loan rejections. Complex AI models often lack this 'explainability', posing a regulatory challenge.\n3. **Skill Gap:** There is a severe shortage of professionals who understand both the intricacies of banking regulations and the technicalities of AI.\n\n### What it Means for Job Seekers\n\nThe integration of AI does not spell the end of banking jobs, but rather an evolution.\n\n- **Upskilling is Key:** Routine clerical tasks will be automated. Future bankers must focus on skills that AI cannot easily replicate: empathy, complex problem-solving, and relationship management.\n- **New Roles Emerging:** Roles such as AI ethicists, prompt engineers, and data privacy officers will become commonplace within bank payrolls.\n\n### Conclusion\n\nThe banking sector is cautiously embracing AI. While the operational readiness is improving, the regulatory and security frameworks must evolve concurrently to ensure a safe, efficient, and inclusive AI-driven banking future.",
    tags: ["AI", "Banking"],
    metaTitle: "AI in Banking",
    metaDescription: "AI integration in banking sector",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    author: "Tech Correspondent",
    readingTime: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "8",
    title: "RBI Mandates New Security Guidelines for Net Banking",
    slug: "rbi-new-security-guidelines",
    category: "RBI Updates",
    cover: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
    excerpt: "To combat rising cyber frauds, RBI has issued fresh security guidelines for all commercial banks regarding internet banking.",
    content: "## Fortifying the Digital Frontier\n\nIn response to a sharp surge in sophisticated cybercrimes and unauthorized digital transactions, the Reserve Bank of India (RBI) has issued a comprehensive set of new security guidelines for all commercial banks. These mandates aim to fortify the internet banking infrastructure and protect consumer interests in an increasingly digitized economy.\n\n### Key Mandates in the New Guidelines\n\nThe RBI's directive focuses on multi-layered security, real-time monitoring, and heightened customer awareness.\n\n- **Dynamic Authentication:** Banks must implement dynamic, context-aware Multi-Factor Authentication (MFA). This means authentication requirements will tighten based on the transaction amount, location, and device history.\n- **Device Binding:** To prevent unauthorized access, net banking applications must securely bind to the user's primary mobile device. Any attempt to log in from an unregistered device will trigger enhanced verification protocols.\n- **Cooling-off Period:** A mandatory cooling-off period is to be enforced for high-value transactions following any modification to the user's profile, such as adding a new beneficiary or changing the registered mobile number.\n\n### Enhanced Backend Security\n\nThe guidelines also mandate stringent backend overhauls for the banks.\n\n1. **24/7 Transaction Monitoring:** Implementation of AI-driven systems to monitor transactions around the clock, flagging and blocking suspicious activities instantly.\n2. **Zero-Trust Architecture:** Banks are advised to transition towards a zero-trust network architecture, assuming that threats can originate from both outside and within the network.\n3. **Mandatory Audits:** Frequent, surprise cybersecurity audits by empanelled third-party experts will become a routine requirement.\n\n### Impact on Consumers\n\nWhile these measures enhance security, they will alter the user experience.\n\n- Customers may experience slightly longer transaction times due to additional verification steps.\n- There will be a strict limit on the number of devices linked to a single net banking account.\n- Customers will be required to update their passwords more frequently, adhering to stricter complexity rules.\n\n### Conclusion\n\nThe RBI's proactive stance is a necessary response to the evolving threat landscape. While the new security guidelines may introduce minor frictions in the user journey, they are a small price to pay for safeguarding the financial assets of millions of digital banking users.",
    tags: ["RBI", "Security"],
    metaTitle: "RBI Security Guidelines",
    metaDescription: "RBI new security guidelines",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    author: "Regulatory Bodies Expert",
    readingTime: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "9",
    title: "RBI Monetary Policy Update: What it Means for Borrowers",
    slug: "rbi-monetary-policy-update-borrowers",
    category: "RBI Updates",
    cover: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&q=80",
    excerpt: "The latest monetary policy update introduces slight changes in the liquidity measures. Here is an in-depth look at what it means for the banking sector.",
    content: "## The RBI Monetary Policy Shift\n\nThe central bank has maintained a delicate balance between containing inflation and supporting growth. In this latest policy update, several key changes were announced that directly impact the liquidity available to commercial banks.\n\n### Key Highlights\n1. **Repo Rate**: Remains stable to support the ongoing economic recovery.\n2. **SDF Rate**: Adjusted to align with the evolving liquidity conditions.\n\nThese measures are expected to keep the banking sector robust while maintaining the value of the rupee in international markets.",
    tags: ["RBI", "Economy", "Policy"],
    metaTitle: "RBI Monetary Policy Update",
    metaDescription: "Latest RBI Monetary Policy Update analysis.",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    author: "Financial Analyst",
    readingTime: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "10",
    title: "SBI Recruitment 2026: Expected Vacancies and Eligibility",
    slug: "sbi-recruitment-2026-expected",
    category: "SBI News",
    cover: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    excerpt: "State Bank of India is gearing up for its biggest recruitment drive in 2026. Discover the expected vacancies, eligibility criteria, and how to start preparing early.",
    content: "## Gearing Up for SBI PO 2026\n\nState Bank of India has always been the most sought-after employer for banking aspirants. The upcoming 2026 recruitment drive is expected to be massive, considering the large number of upcoming retirements.\n\n### Expected Vacancies\nExperts predict upwards of **2,500 PO vacancies** and **8,000+ Junior Associate vacancies**.\n\n### Preparation Strategy\nStart by focusing on Quantitative Aptitude and Reasoning. With the evolving exam patterns, reading comprehension and current affairs will play a deciding role.",
    tags: ["SBI", "Recruitment", "PO"],
    metaTitle: "SBI Recruitment 2026 Details",
    metaDescription: "SBI Recruitment 2026 expected vacancies and strategy.",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    author: "Exam Expert",
    readingTime: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "11",
    title: "IBPS PO Preparation Tips from Toppers",
    slug: "ibps-po-preparation-tips",
    category: "IBPS Updates",
    cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    excerpt: "Cracking IBPS PO requires a structured strategy. Read these exclusive tips compiled from previous year toppers to maximize your scores.",
    content: "## Cracking IBPS PO\n\nThe Institute of Banking Personnel Selection conducts one of the toughest banking exams. Success lies in consistent practice and smart strategy.\n\n### Time Management\nAlways attempt the easier questions first. Do not spend more than 45 seconds on any single quantitative question during the prelims.\n\n### Mock Tests\nTaking at least 2 mock tests per week is crucial. Analyze your mistakes thoroughly after every test to ensure you don't repeat them.",
    tags: ["IBPS", "Strategy", "Toppers"],
    metaTitle: "IBPS PO Preparation Tips",
    metaDescription: "Tips and strategies to clear IBPS PO.",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    author: "Mentorship Desk",
    readingTime: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "12",
    title: "Banking Sector Digital Transformation in India",
    slug: "banking-sector-digital-transformation",
    category: "Trending News",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    excerpt: "From UPI to CBDC, the digital transformation of Indian banks is moving at a breakneck pace. Here's what future bankers need to know.",
    content: "## The Digital Revolution\n\nIndia's banking sector has leaped decades ahead thanks to the Unified Payments Interface (UPI). But the innovation doesn't stop there. \n\n### CBDC (Digital Rupee)\nThe pilot for the Digital Rupee has shown promising results. For banking aspirants, understanding digital ledgers and blockchain technology is becoming increasingly important as banks seek to hire tech-savvy professionals.\n\n### Neobanks\nThe rise of digital-only banks is pushing traditional banks to innovate faster.",
    tags: ["Digital Banking", "Technology", "Future"],
    metaTitle: "Banking Sector Digital Transformation",
    metaDescription: "Digital transformation of Indian banks.",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    author: "Tech Correspondent",
    readingTime: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "13",
    title: "Government Banking Reforms and Privatization Updates",
    slug: "government-banking-reforms-privatization",
    category: "Government Jobs",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80",
    excerpt: "The latest updates on the proposed banking sector reforms and the potential privatization of public sector banks.",
    content: "## The Road to Privatization\n\nThe government has reiterated its commitment to banking sector reforms. While the timeline for the privatization of two public sector banks remains under discussion, the legislative framework is being prepared.\n\n### Impact on Job Aspirants\nMany aspirants worry about vacancies. However, experts suggest that even post-privatization, the demand for skilled banking professionals will only increase, albeit with slightly different skill requirements focusing on sales and digital proficiency.",
    tags: ["Reforms", "PSB", "Government"],
    metaTitle: "Government Banking Reforms",
    metaDescription: "Updates on government banking reforms and privatization.",
    status: "published",
    publishedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    author: "Policy Analyst",
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
