import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-[color:var(--navy)] text-white border-b border-border/10">
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:py-16 relative overflow-hidden min-h-[300px] flex flex-col justify-center">
        {/* Subtle Background Glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
              India's Premium <span className="text-gold">Banking News</span> Portal
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl font-light max-w-xl leading-relaxed">
              Stay ahead with breaking banking news, real-time RBI updates, and exclusive economic insights curated for financial professionals and aspirants.
            </p>

            {/* Premium Search Bar */}
            <div className="w-full max-w-[550px] relative mt-2 group">
              <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                <div className="pl-4 pr-2 flex items-center justify-center">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search news, articles, RBI circulars..." 
                  className="w-full bg-transparent text-black text-[15px] font-medium outline-none placeholder:text-muted-foreground/70"
                />
                <Button className="h-11 rounded-full bg-[color:var(--navy)] hover:bg-blue-900 text-white px-6 font-semibold shrink-0 transition-colors">
                  Search
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="h-12 px-8 text-[15px] bg-gold text-[color:var(--navy)] hover:bg-white font-bold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(212,175,55,0.3)]">
                <Link to="/news">
                  Read Latest News
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Content - Premium Photo Collage */}
          <div className="lg:col-span-5 relative hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000 h-[380px]">
            <div className="grid grid-cols-2 gap-4 h-full relative z-10">
              
              {/* Left Column */}
              <div className="flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-44 group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80" 
                    alt="Indian Parliament" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-48 group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80" 
                    alt="Financial Documents" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
              
              {/* Right Column (Offset) */}
              <div className="flex flex-col gap-4 pt-10">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-48 group">
                  <div className="absolute inset-0 bg-[color:var(--navy)]/30 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80" 
                    alt="Indian Currency" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-40 group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" 
                    alt="Banking Professionals" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
