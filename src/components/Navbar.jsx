"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon, Bell, LogIn, Link } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { theme, setTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(3);
  const auth = useAuth();
  const isAuthenticated = typeof window !== "undefined" && auth.isAuthenticated;
  const user = auth.user;
  console.log("User Info:", auth);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setIsDark(!isDark);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              FH
            </div>
            <span className="font-bold text-lg hidden sm:inline">MedHub</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/search"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Search
            </a>
            <a
              href="/forums"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Forums
            </a>
            <a
              href="/chat"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Chat
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <a href="/profile">
                  <button
                    // onClick={auth.logout}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                  >
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                      {user?.given_name?.[0] ||
                        user?.preferred_username?.[0] ||
                        "?"}
                    </div>
                    <span className="hidden sm:inline">
                      {user?.given_name || user?.preferred_username || "User"}
                    </span>
                  </button>
                </a>
                <button
                  onClick={auth.logout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={auth.login}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  <LogIn size={20} />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
                <button
                  onClick={auth.register}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <span className="hidden sm:inline">Register</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-slate-200 dark:border-slate-800">
            <a
              href="/forums"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition"
            >
              Forums
            </a>
            <a
              href="/chat"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition"
            >
              Chat
            </a>
            <a
              href="/search"
              className="block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition"
            >
              Search
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
