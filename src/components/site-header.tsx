import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Landmark, Menu, X, Bell, User as UserIcon, LogOut, LayoutDashboard, Shield } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nav = [
  { to: "/", label: "Home" },
  { to: "/news", label: "News" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 md:gap-6 md:px-6 py-4">
        <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
          <Landmark className="h-8 w-8 md:h-10 md:w-10 text-primary shrink-0 group-hover:scale-105 transition-transform duration-300" />
          <span className="font-display text-xl md:text-2xl leading-none font-bold tracking-tight">
            Bank <span className="text-gold">Educator</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`relative px-4 py-2 text-[15px] font-semibold rounded-full transition-all duration-300 overflow-hidden group ${active ? "text-primary bg-primary/10" : "text-foreground/80 hover:text-primary hover:bg-muted"}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {user && (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/notifications" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <div className="h-6 w-6 rounded-full gold-gradient grid place-items-center text-[color:var(--navy)] font-semibold text-xs uppercase">
                      {user.name.trim().charAt(0)}
                    </div>
                    <span className="max-w-[100px] truncate">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="text-sm font-semibold">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard"><LayoutDashboard className="h-4 w-4 mr-2" />Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile"><UserIcon className="h-4 w-4 mr-2" />Profile</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin"><Shield className="h-4 w-4 mr-2" />Admin Panel</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}><LogOut className="h-4 w-4 mr-2" />Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <nav className="mx-auto max-w-7xl px-6 py-3 flex flex-col">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
                {n.label}
              </Link>
            ))}
            <div className="border-t border-border/60 mt-2 pt-3 flex flex-col gap-2">
              {user && (
                <>
                  <Button variant="outline" asChild><Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link></Button>
                  <Button onClick={() => { logout(); setOpen(false); }} variant="ghost">Log out</Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
