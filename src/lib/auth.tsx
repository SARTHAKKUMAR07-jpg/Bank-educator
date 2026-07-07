import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserRole = "student" | "admin";
export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  enrolledCourseIds: string[];
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  enroll: (courseId: string) => void;
};

const KEY = "be_user";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (typeof window !== "undefined") {
      if (u) localStorage.setItem(KEY, JSON.stringify(u));
      else localStorage.removeItem(KEY);
    }
  };

  const login: AuthContextValue["login"] = async (email, _password) => {
    // Mock: admin@bankeducator.com -> admin, anything else -> student
    const role: UserRole = email.toLowerCase().startsWith("admin") ? "admin" : "student";
    const u: User = {
      id: "u_" + Math.random().toString(36).slice(2, 9),
      name: email.split("@")[0].replace(/\W+/g, " "),
      email,
      role,
      enrolledCourseIds: [],
    };
    persist(u);
    return u;
  };

  const signup: AuthContextValue["signup"] = async (name, email, _password) => {
    const role: UserRole = email.toLowerCase().startsWith("admin") ? "admin" : "student";
    const u: User = {
      id: "u_" + Math.random().toString(36).slice(2, 9),
      name, email, role, enrolledCourseIds: [],
    };
    persist(u);
    return u;
  };

  const logout = () => persist(null);

  const enroll = (courseId: string) => {
    if (!user) return;
    if (user.enrolledCourseIds.includes(courseId)) return;
    persist({ ...user, enrolledCourseIds: [...user.enrolledCourseIds, courseId] });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, enroll }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
