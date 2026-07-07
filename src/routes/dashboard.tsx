import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { LayoutDashboard, BookOpen, ClipboardCheck, Bell, User, LogOut, Landmark } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/courses", label: "My Courses", icon: BookOpen },
  { to: "/dashboard/tests", label: "My Tests", icon: ClipboardCheck },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

function DashboardLayout() {
  const { user, loading, logout } = useAuth();
  const nav2 = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });

  useEffect(() => { if (!loading && !user) nav2({ to: "/login" }); }, [user, loading, nav2]);
  if (loading || !user) return <div className="p-16 text-center text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <div className="flex-1 mx-auto max-w-7xl w-full px-4 md:px-6 py-6 grid md:grid-cols-[240px_1fr] gap-6">
        <aside className="rounded-xl border bg-card p-3 h-fit md:sticky md:top-20">
          <div className="p-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full gold-gradient grid place-items-center text-[color:var(--navy)] font-semibold uppercase">{user.name.trim().charAt(0)}</div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
          </div>
          <nav className="mt-2 space-y-1">
            {nav.map(n => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link key={n.to} to={n.to} className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
            {user.role === "admin" && (
              <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted">
                <Landmark className="h-4 w-4" /> Admin Panel
              </Link>
            )}
            <button onClick={logout} className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted text-destructive">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </nav>
        </aside>
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}
