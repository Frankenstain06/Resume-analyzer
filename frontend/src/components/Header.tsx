"use client"

import Link from "next/link"
import { FileText, LogOut, User } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

/**
 * Navbar Component
 * Shows login/signup links for unauthenticated users,
 * and user info + sign out for authenticated users.
 */
export default function Navbar() {
  const { user, isLoading, logout } = useAuth()

  return (
    <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-teal-700">
          <FileText size={22} />
          MyReazr
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <Link href="/features" className="hover:text-teal-700 transition-colors">Features</Link>
          <Link href="/pricing" className="hover:text-teal-700 transition-colors">Pricing</Link>
          <Link href="/resources" className="hover:text-teal-700 transition-colors">Resources</Link>
          <Link href="/blog" className="hover:text-teal-700 transition-colors">Blog</Link>
        </div>

        {/* Auth-aware right section */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-20 h-8 bg-gray-100 rounded-full animate-pulse" />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors"
              >
                <User size={16} />
                {user.full_name || user.email}
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors">
                Login
              </Link>
              <Link href="/auth/register" className="bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-teal-800 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
