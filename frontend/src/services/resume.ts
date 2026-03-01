/**
 * Resume API Service
 * Functions for uploading resumes, fetching analyses, and dashboard data.
 */

import { apiFetch } from "./api";
import type {
  ResumeUploadResult,
  ResumeWithAnalysis,
  ResumeListItem,
  DashboardData,
} from "@/types/resume";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Upload a resume file (FormData — no JSON content-type).
 */
export async function uploadResume(file: File): Promise<ResumeUploadResult> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const formData = new FormData();
  formData.append("file", file);

  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}/api/resume/upload`, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(
      err?.detail || `Upload failed with status ${res.status}`
    );
  }
  return res.json();
}

/**
 * Get a resume and its full analysis.
 */
export async function getResumeAnalysis(
  resumeId: string
): Promise<ResumeWithAnalysis> {
  return apiFetch<ResumeWithAnalysis>(`/api/resume/${resumeId}`);
}

/**
 * List all resumes for the current user.
 */
export async function listResumes(): Promise<{ resumes: ResumeListItem[] }> {
  return apiFetch<{ resumes: ResumeListItem[] }>("/api/resume/");
}

/**
 * Get full dashboard data (stats + recent resumes).
 */
export async function getDashboard(): Promise<DashboardData> {
  return apiFetch<DashboardData>("/api/dashboard/");
}
