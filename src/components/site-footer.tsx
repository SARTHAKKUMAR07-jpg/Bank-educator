import { Link } from "@tanstack/react-router";
import { Landmark, Twitter, Youtube, Instagram, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-[color:var(--navy)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <Landmark className="h-7 w-7 text-gold" />
            <span className="font-display text-xl">Bank Educator</span>
          </Link>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            India's premium platform for Bank & Insurance exam preparation. Trusted by 5 lakh+ aspirants.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Youtube, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-[color:var(--navy)] transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { h: "Learn", links: [["Courses","/courses"],["Mock Tests","/mock-tests"],["Free Quizzes","/quizzes"],["Current Affairs","/current-affairs"]] },
          { h: "Company", links: [["About","/about"],["Blog","/blog"],["Contact","/contact"],["Careers","/about#careers"]] },
          { h: "Support", links: [["Help Center","/contact"],["Refund Policy","/about#refund"],["Terms","/about#terms"],["Privacy","/about#privacy"]] },
        ].map((col) => (
          <div key={col.h}>
            <h4 className="font-display text-lg text-gold">{col.h}</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="hover:text-gold">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-white/60 flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Bank Educator. All rights reserved.</span>
          <span>Made with ♥ for banking aspirants across India.</span>
        </div>
      </div>
    </footer>
  );
}
