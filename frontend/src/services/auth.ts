/**
 * Auth Service
 * Functions for registration, login, and fetching the current user.
 * Each function calls the FastAPI backend via the centralized API client.
 */

import { apiFetch } from "./api";
import type { AuthToken, User, LoginFormData } from "@/types/auth";

/**
 * Register a new user account.
 * Sends name, email, password to POST /api/auth/register
 */
export async function registerUser(data: {
  full_name: string;
  email: string;
  password: string;
}): Promise<AuthToken> {
  return apiFetch<AuthToken>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Log in with email and password.
 * Sends credentials to POST /api/auth/login
 */
export async function loginUser(data: LoginFormData): Promise<AuthToken> {
  return apiFetch<AuthToken>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * Get the currently authenticated user's profile.
 * Calls GET /api/auth/me with the Bearer token.
 */
export async function getCurrentUser(): Promise<User> {
  return apiFetch<User>("/api/auth/me");
}
