/**
 * API Service
 * Centralized HTTP client for communicating with the FastAPI backend.
 * Uses fetch with JSON headers and optional JWT Bearer token.
 */

// Base URL for the backend API — configurable via environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Generic fetch wrapper with error handling.
 * Automatically attaches JWT token from localStorage if available.
 */
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // Attach Bearer token if user is authenticated
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle non-OK responses by extracting the error message
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.detail ||
      `Request failed with status ${response.status}`;

    // If detail is an array (FastAPI validation errors), format them
    if (Array.isArray(message)) {
      const formatted = message.map((e: { msg: string }) => e.msg).join(", ");
      throw new Error(formatted);
    }

    throw new Error(typeof message === "string" ? message : "An error occurred");
  }

  return response.json();
}

export { apiFetch, API_BASE_URL };
