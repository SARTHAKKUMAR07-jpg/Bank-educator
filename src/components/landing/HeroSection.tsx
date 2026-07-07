import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, BarChart3, Clock, Trophy } from "lucide-react";
import { useState, useEffect } from "react";

const EXAMS = ["SBI PO", "IBPS PO", "RBI Grade B", "NABARD", "SSC CGL"];

function TypewriterEffect() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = EXAMS[loopNum % EXAMS.length];

    if (isDeleting) {
      timer = setTimeout(() => setText(currentWord.substring(0, text.length - 1)), deletingSpeed);
    } else {
      timer = setTimeout(() => setText(currentWord.substring(0, text.length + 1)), typingSpeed);
    }

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <span className="text-gold inline-flex items-center min-h-[1.2em]">
      {text}
      <span className="animate-[pulse_1s_infinite] w-[4px] h-[0.9em] bg-gold ml-1 rounded-full"></span>
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy)] text-white pt-20 pb-28 lg:pt-32 lg:pb-40">
      {/* Background Floating Shapes & Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "4s" }}></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--navy)] via-transparent to-[color:var(--navy)]"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            New Batch for SBI PO 2024 Starts Tomorrow
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight leading-[1.2] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 min-h-[140px] lg:min-h-[160px]">
            Target & Crack <br />
            <TypewriterEffect />
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-white/80 max-w-xl font-light animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 leading-relaxed">
            Join India's most trusted banking preparation platform. 
            Expert-led live classes, 500+ premium mock tests, and daily current affairs tailored for your success.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 w-full sm:w-auto">
            <Button asChild size="lg" className="h-16 px-8 text-lg bg-gold text-[color:var(--navy)] hover:bg-white hover:text-[color:var(--navy)] font-bold rounded-xl w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)] group">
              <Link to="/courses">
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" className="h-16 px-8 text-lg text-white bg-white/[0.08] border border-white/[0.35] backdrop-blur-md hover:bg-white/[0.12] hover:border-white/50 hover:text-white rounded-xl w-full sm:w-auto transition-all duration-300 hover:-translate-y-1 group">
              <Link to="/mock-tests">
                <PlayCircle className="mr-3 h-6 w-6 text-gold group-hover:scale-110 transition-all" /> 
                Take a Free Mock
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Content - Dashboard Illustration */}
        <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-300 hidden lg:block">
          {/* Outer glowing frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-gold/20 rounded-3xl blur-2xl transform rotate-3"></div>
          
          <div className="relative bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
            
            {/* Header Mock */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold/40 to-gold/10 flex items-center justify-center text-gold shadow-inner border border-gold/20">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-lg text-white">Target SBI PO 2024</div>
                  <div className="text-sm text-white/50 font-medium">Your Progress</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">78%</div>
                <div className="text-sm text-white/50 font-medium mt-1">Completion</div>
              </div>
            </div>

            {/* Stats Mock */}
            <div className="grid grid-cols-2 gap-5 mb-8">
              <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-white/50 text-sm font-medium mb-3">
                  <BarChart3 className="h-5 w-5 text-emerald-400" /> Mock Test Score
                </div>
                <div className="text-3xl font-bold text-white">68.5 <span className="text-sm font-medium text-white/40">/ 100</span></div>
              </div>
              <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-2 text-white/50 text-sm font-medium mb-3">
                  <Clock className="h-5 w-5 text-blue-400" /> Study Hours
                </div>
                <div className="text-3xl font-bold text-white">124 <span className="text-sm font-medium text-white/40">hrs</span></div>
              </div>
            </div>

            {/* Upcoming Class Mock */}
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl p-5 border border-blue-500/20 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-40 h-40 bg-gold/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 group-hover:bg-gold/20 transition-colors"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Live Now</span>
                  </div>
                  <div className="font-bold text-white text-base">Data Interpretation Mastery</div>
                  <div className="text-sm text-white/60 mt-1 font-medium">By Rahul Sharma</div>
                </div>
                <Button size="sm" className="bg-white text-black hover:bg-gray-100 rounded-xl h-10 px-5 text-sm font-bold shadow-lg transition-transform hover:scale-105">
                  Join Class
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
