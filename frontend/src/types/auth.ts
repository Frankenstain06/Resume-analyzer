/**
 * Authentication Types
 * Shared TypeScript interfaces for auth-related data structures.
 */

// Form data for the login form
export interface LoginFormData {
  email: string;
  password: string;
}

// Form data for the registration form
export interface RegisterFormData {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// JWT token response from the backend
export interface AuthToken {
  access_token: string;
  token_type: string;
}

// User profile returned from /api/auth/me
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  tier: string;
  created_at: string;
}

// Validation error shape from FastAPI
export interface ApiError {
  detail: string | { msg: string; loc: string[] }[];
}
