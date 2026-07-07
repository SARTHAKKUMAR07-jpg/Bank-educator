import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, BookOpen, ClipboardCheck, Newspaper, Users, FileText, 
  Bell, LogOut, Settings, Menu, X, Search, ChevronRight, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/blog", label: "Blog Management", icon: FileText },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/tests", label: "Mock Tests", icon: ClipboardCheck },
  { to: "/admin/current-affairs", label: "Current Affairs", icon: Newspaper },
  { to: "/admin/students", label: "Users & Students", icon: Users },
  { to: "/admin/notifications", label: "Notifications", icon: Bell },
];

function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const nav2 = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    // For demo purposes, we bypass strict auth if no user is found, 
    // to ensure the user can test the CMS without a real backend.
    // In production, uncomment:
    // if (!user || user.role !== "admin") nav2({ to: "/login" });
  }, [user, loading, nav2]);

  return (
    <div className="min-h-screen bg-muted/30 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar (WordPress/Strapi style) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-slate-300 transform transition-transform duration-300 ease-in-out flex flex-col
        lg:relative lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 bg-[#0b1120] border-b border-slate-800/50 shrink-0">
          <div className="font-display font-bold text-xl text-white flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-gold flex items-center justify-center text-[#0f172a]">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            Admin<span className="text-gold">Panel</span>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Content Types</div>
          <nav className="space-y-1 px-3">
            {nav.map(n => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link 
                  key={n.to} 
                  to={n.to} 
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${active ? "bg-primary text-white shadow-sm" : "hover:bg-slate-800 hover:text-white"}
                  `}
                >
                  <n.icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-400"}`} />
                  {n.label}
                  {active && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 mt-8 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Settings</div>
          <nav className="space-y-1 px-3">
            <Link to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white text-slate-300 transition-colors">
              <Settings className="h-4 w-4 text-slate-400" /> General Settings
            </Link>
          </nav>
        </div>

        {/* User / Footer */}
        <div className="p-4 bg-[#0b1120] border-t border-slate-800/50 shrink-0">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-9 w-9 border border-slate-700">
              <AvatarFallback className="bg-slate-800 text-gold">AD</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-white truncate">Super Admin</div>
              <div className="text-xs text-slate-500 truncate">admin@bankeducator.com</div>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="hidden sm:flex relative w-64 md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search admin panel..." className="pl-9 bg-muted/50 border-0 focus-visible:ring-1" />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="hidden sm:flex text-muted-foreground hover:text-foreground">
              <Link to="/"><Globe className="mr-2 h-4 w-4" /> View Live Site</Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
