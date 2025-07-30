"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../globals/providers";
import LogoutButton from "./logout-button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { user, loading } = useAuth();

  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "Créateurs", href: "/creators" },
    { 
      name: "Services", 
      href: "/services",
      submenu: [
        { name: "Modèles", href: "/services/modeles" },
        { name: "Shootings", href: "/services/shootings" },
        { name: "Publicité", href: "/services/publicite" },
        { name: "UGC", href: "/services/ugc" }
      ]
    },
    { name: "Portfolio", href: "/portfolio" },
    { name: "À propos", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];



  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">MC</span>
            </div>
            <span className="font-bold text-lg md:text-xl text-slate-900">
              Agence Modèles & Créateurs
            </span>
            </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <button
                      className="text-slate-700 hover:text-slate-900 font-medium transition-colors flex items-center"
                      onMouseEnter={() => setActiveSubmenu(item.name)}
                    >
                      {item.name}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeSubmenu === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                        onMouseLeave={() => setActiveSubmenu(null)}
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-gray-50 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              // Loading state
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
              </div>
            ) : user ? (
              // User is logged in
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-slate-700 font-medium hidden lg:block">
                    {user.full_name || user.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/dashboard"
                    className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <LogoutButton className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors">
                    Déconnexion
                  </LogoutButton>
                </div>
              </div>
            ) : (
              // User is not logged in
              <>
                <Link 
                  href="/auth/login"
                  className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link 
                  href="/auth/sign-up"
                  className="px-6 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
                >
                  S&rsquo;inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
                  <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
                    </svg>
                  </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <div className="text-slate-700 font-medium py-2">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.submenu.map((subItem) => (
                          <Link 
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-slate-600 hover:text-slate-900 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={item.href}
                      className="block text-slate-700 hover:text-slate-900 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                {loading ? (
                  // Loading state
                  <div className="flex justify-center">
                    <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                  </div>
                ) : user ? (
                  // User is logged in
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {user.full_name || 'Utilisateur'}
                        </div>
                        <div className="text-sm text-slate-600">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Link 
                      href="/dashboard" 
                      className="block text-slate-700 hover:text-slate-900 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <LogoutButton 
                      className="block w-full text-left px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Déconnexion
                    </LogoutButton>
                  </div>
                ) : (
                  // User is not logged in
                  <>
                    <Link 
                      href="/auth/login" 
                      className="block text-slate-700 hover:text-slate-900 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Connexion
                    </Link>
                    <Link 
                      href="/auth/sign-up" 
                      className="block px-6 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      S&rsquo;inscrire
                    </Link>
                  </>
                )}
              </div>
                </div>
              </div>
            )}
        </div>
      </nav>
  );
} 