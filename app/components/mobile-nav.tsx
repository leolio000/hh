"use client";

import { useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface MobileNavProps {
  user: User | null;
  onSignOut: () => void;
}

export default function MobileNav({ user, onSignOut }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    onSignOut();
    toggleMenu();
  };

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block w-5 h-0.5 bg-gray-900 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-gray-900 mt-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-5 h-0.5 bg-gray-900 mt-1 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={toggleMenu}></div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 p-2"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="mb-8 pt-8">
            <h2 className="text-2xl font-bold text-gray-900">OVO</h2>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4">
            <Link href="/" className="block py-3 text-gray-900 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
              Accueil
            </Link>
            <Link href="/creators" className="block py-3 text-gray-900 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
              Créateurs
            </Link>
            <Link href="/brands" className="block py-3 text-gray-900 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
              Marques
            </Link>
            {user && (
              <Link href="/dashboard" className="block py-3 text-gray-900 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
                Dashboard
              </Link>
            )}
            <Link href="/about" className="block py-3 text-gray-900 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
              À propos
            </Link>
            <Link href="/contact" className="block py-3 text-gray-900 hover:text-purple-600 transition-colors" onClick={toggleMenu}>
              Contact
            </Link>
          </nav>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Auth Buttons */}
          <div className="space-y-3" suppressHydrationWarning>
            {user ? (
              // User is logged in
              <>
                <Link href="/dashboard" onClick={toggleMenu}>
                  <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">
                    Mon Compte
                  </button>
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="w-full py-3 px-4 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors"
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              // User is not logged in
              <>
                <Link href="/auth/login" onClick={toggleMenu}>
                  <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">
                    Se connecter
                  </button>
                </Link>
                <Link href="/auth/sign-up" onClick={toggleMenu}>
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                    S&apos;inscrire
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="space-y-2 text-sm text-gray-600">
              <Link href="/privacy" className="block py-1 hover:text-gray-900" onClick={toggleMenu}>
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="block py-1 hover:text-gray-900" onClick={toggleMenu}>
                Conditions d'utilisation
              </Link>
              <Link href="/help" className="block py-1 hover:text-gray-900" onClick={toggleMenu}>
                Centre d'aide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 