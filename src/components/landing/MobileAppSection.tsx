import { Button } from "@/components/ui/button";
import { CheckCircle2, Apple, Play } from "lucide-react";

export function MobileAppSection() {
  return (
    <section className="py-24 bg-[color:var(--navy)] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-[100px] -z-10"></div>
            {/* Realistic Mockup representation using a CSS-styled frame */}
            <div className="relative mx-auto w-[280px] h-[580px] bg-white rounded-[40px] shadow-2xl border-[8px] border-zinc-800 overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-500">
              <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 rounded-b-3xl w-40 mx-auto z-20"></div>
              <img 
                src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=600&auto=format&fit=crop" 
                alt="App Interface" 
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--navy)] to-transparent opacity-80 flex flex-col justify-end p-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gold"></div>
                    <div>
                      <div className="text-sm font-bold text-white">Daily Quiz Available</div>
                      <div className="text-xs text-white/70">Tap to attempt now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Study Anytime, Anywhere with the <span className="text-gold">Bank Educator App</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Carry your coaching center in your pocket. Watch downloaded classes offline, attempt quizzes on the go, and get instant doubt resolution directly from your smartphone.
            </p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Download video lectures for offline viewing",
                "Instant push notifications for live classes",
                "App-exclusive daily mini-mocks",
                "Seamless sync across mobile and desktop"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <CheckCircle2 className="h-6 w-6 text-gold shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-16 px-6 bg-white text-black hover:bg-gray-100 rounded-xl justify-start">
                <a href="#playstore">
                  <Play className="mr-3 h-8 w-8 text-green-500 fill-green-500" />
                  <div className="text-left flex flex-col">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase leading-none">Get it on</span>
                    <span className="text-xl font-bold leading-none mt-1">Google Play</span>
                  </div>
                </a>
              </Button>
              <Button asChild size="lg" className="h-16 px-6 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl border border-zinc-700 justify-start">
                <a href="#appstore">
                  <Apple className="mr-3 h-8 w-8" />
                  <div className="text-left flex flex-col">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase leading-none">Download on the</span>
                    <span className="text-xl font-bold leading-none mt-1">App Store</span>
                  </div>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
