/**
 * Authentication Context
 * Provides global auth state (user, loading, login/logout/register functions)
 * to the entire application via React Context.
 *
 * Usage: Wrap <AuthProvider> around the app, then use useAuth() in any component.
 */

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/auth";
import * as authService from "@/services/auth";

// Shape of the auth context value
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  /**
   * On mount, check if there's a stored token and try to fetch the user profile.
   * If the token is invalid/expired, clear it silently.
   */
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch {
      // Token is invalid or expired — clear it
      localStorage.removeItem("access_token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  /**
   * Login: sends credentials to backend, stores token, fetches user profile.
   */
  const login = async (email: string, password: string) => {
    const tokenData = await authService.loginUser({ email, password });
    localStorage.setItem("access_token", tokenData.access_token);
    const userData = await authService.getCurrentUser();
    setUser(userData);
    router.push("/dashboard");
  };

  /**
   * Register: creates account, stores token, fetches user profile.
   */
  const register = async (name: string, email: string, password: string) => {
    const tokenData = await authService.registerUser({
      full_name: name,
      email,
      password,
    });
    localStorage.setItem("access_token", tokenData.access_token);
    const userData = await authService.getCurrentUser();
    setUser(userData);
    router.push("/dashboard");
  };

  /**
   * Logout: clear token and user state, redirect to home.
   */
  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access auth context.
 * Must be used within an <AuthProvider>.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
