"use client";

import { useEffect, useState } from "react";
import { Diamond, Video, Camera, LayoutTemplate, FolderOpen, CreditCard, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { name: "Video Studio", href: "/dashboard/generate", icon: Video },
  { name: "Image Studio", href: "/dashboard/generate-image", icon: Camera },
  { name: "Cinroom Vault Rigs", href: "/dashboard/templates", icon: LayoutTemplate },
  { name: "Projects Vault", href: "/dashboard/history", icon: FolderOpen },
];

const secondaryItems = [
  { name: "Credits & Plan", href: "/dashboard/settings", icon: CreditCard },
  { name: "Atelier Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Atelier Member";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <aside className="w-64 h-screen border-r border-white/[0.06] bg-[#070709]/90 backdrop-blur-2xl flex flex-col fixed left-0 top-0 z-40">
      {/* Brand header */}
      <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400/20 to-white/10 flex items-center justify-center border border-amber-200/40 shadow-[0_0_10px_rgba(197,168,128,0.2)]">
            <Diamond className="w-3 h-3 text-amber-200" />
          </div>
          <span className="font-medium text-xs tracking-[0.2em] text-white uppercase font-sans">
            CINROOM
          </span>
        </Link>
      </div>

      <div className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-[0.2em]">
          STUDIO ENGINES
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard/generate" && pathname === "/dashboard");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono tracking-wider rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-amber-400/10 text-amber-100 border border-amber-200/30 font-bold shadow-[0_0_15px_rgba(197,168,128,0.15)]"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? "text-amber-200" : "text-neutral-500"}`} />
              {item.name}
            </Link>
          );
        })}

        <div className="px-3 mt-8 mb-2 text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-[0.2em]">
          MANAGEMENT
        </div>
        {secondaryItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-xs font-mono tracking-wider text-neutral-400 rounded-xl hover:text-white hover:bg-white/[0.04] transition-all"
          >
            <item.icon className="w-4 h-4 text-neutral-500" />
            {item.name}
          </Link>
        ))}
      </div>

      {/* Account Info & Sign Out */}
      <div className="p-4 border-t border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200/30 to-amber-600/20 border border-amber-200/40 flex items-center justify-center text-amber-200 font-mono text-xs font-semibold shrink-0">
              {userInitials}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-medium text-white truncate">{userName}</span>
              <span className="text-[10px] font-mono text-amber-200/80 truncate">
                {user?.email || "Pro Atelier Plan"}
              </span>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
