import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/marketing-shell";
import { HeroSection } from "@/components/landing/HeroSection";
import { NewspaperLayout } from "@/components/landing/NewspaperLayout";
import { SidebarWidgets } from "@/components/landing/SidebarWidgets";
import { NewsCategorySection } from "@/components/landing/NewsCategorySection";
import { AlertCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bank Educator News — Breaking Banking News & RBI Updates" },
      { name: "description", content: "India's premium banking news portal. Get breaking news, RBI updates, daily current affairs, and government job notifications." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <MarketingShell>
      {/* Sleek Breaking News Ticker */}
      <div className="bg-background border-b border-border/50 text-foreground text-sm font-semibold flex items-center overflow-hidden h-10 relative">
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 absolute left-full text-muted-foreground">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> RBI keeps repo rate unchanged at 6.5% for 8th consecutive time</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> SBI PO 2024 final results announced</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Sensex hits new all-time high amidst positive global cues</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> IBPS RRB Notification expected next week</span>
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Govt announces new sovereign gold bond scheme</span>
          </div>
        </div>
      </div>

      <HeroSection />
      
      <div className="bg-background pt-8 pb-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area (70%) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <NewspaperLayout title="Latest Banking News" />
            
            <NewsCategorySection 
              title="RBI" 
              subtitle="Updates" 
              category="RBI Updates"
              limit={4}
              compact={true}
            />
            
            <NewsCategorySection 
              title="Government Job" 
              subtitle="Notifications" 
              category="Government Jobs"
              highlightFirst={true}
              limit={5}
              compact={true}
            />

            <NewsCategorySection 
              title="Economy" 
              subtitle="& Finance" 
              category="Trending News"
              limit={4}
              compact={true}
            />

            <NewsCategorySection 
              title="Featured" 
              subtitle="Blogs" 
              category="Editorial Picks"
              limit={4}
              compact={true}
            />
          </div>
          
          {/* Sidebar Area (30%) */}
          <div className="lg:col-span-4">
            <SidebarWidgets />
          </div>
          
        </div>
      </div>
    </MarketingShell>
  );
}
