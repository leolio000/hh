"use client";

import { createClient } from "@/lib/supabase/client";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function LogoutButton({ className = "", children = "Déconnexion", onClick }: LogoutButtonProps) {
  const supabase = createClient();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      if (onClick) onClick();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className={className}
    >
      {children}
    </button>
  );
} 