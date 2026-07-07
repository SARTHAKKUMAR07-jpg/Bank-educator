import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedByStudents } from "@/components/landing/TrustedByStudents";
import { FeaturedCourses } from "@/components/landing/FeaturedCourses";
import { LiveClassesSection } from "@/components/landing/LiveClassesSection";
import { MockTestsSection } from "@/components/landing/MockTestsSection";
import { BankingExamCategories } from "@/components/landing/BankingExamCategories";
import { CurrentAffairsSection } from "@/components/landing/CurrentAffairsSection";
import { LatestBlogsSection } from "@/components/landing/LatestBlogsSection";
import { FacultySection } from "@/components/landing/FacultySection";
import { SuccessStories } from "@/components/landing/SuccessStories";
import { MobileAppSection } from "@/components/landing/MobileAppSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bank Educator — Crack SBI PO, IBPS PO, RBI Grade B & more" },
      { name: "description", content: "India's premium banking exam preparation platform. Live courses, 500+ mock tests, daily current affairs and personalised mentorship." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <MarketingShell>
      <HeroSection />
      <TrustedByStudents />
      <FeaturedCourses />
      <LiveClassesSection />
      <MockTestsSection />
      <BankingExamCategories />
      <CurrentAffairsSection />
      <LatestBlogsSection />
      <FacultySection />
      <SuccessStories />
      <MobileAppSection />
      <FAQSection />
      <CTASection />
    </MarketingShell>
  );
}
