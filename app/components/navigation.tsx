"use client";

import Link from "next/link";
import ThemeSwitcherSimple from "./theme-switcher-simple";
import MobileNav from "./mobile-nav";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Navigation() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"} className="text-xl font-bold text-slate-900">
              OVO
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"} className="text-xl font-bold text-slate-900">
              OVO
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/creators" className="text-slate-700 hover:text-slate-900 transition-colors">
                Créateurs
              </Link>
              <Link href="/brands" className="text-slate-700 hover:text-slate-900 transition-colors">
                Marques
              </Link>
              {/* Dashboard link - only show when user is logged in and not loading */}
              {!loading && user && (
                <Link href="/dashboard" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4" suppressHydrationWarning>
            {loading ? (
              // Show loading state
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              // User is logged in
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Mon Compte
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Déconnexion
                </button>
                <ThemeSwitcherSimple />
              </div>
            ) : (
              // User is not logged in
              <div className="flex items-center gap-4">
                <Link href="/auth/login" className="text-slate-700 hover:text-slate-900 transition-colors">
                  Connexion
                </Link>
                <Link href="/auth/sign-up" className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors">
                  Inscription
                </Link>
                <ThemeSwitcherSimple />
              </div>
            )}
          </div>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <MobileNav user={user} onSignOut={handleSignOut} />
    </>
  );
} 