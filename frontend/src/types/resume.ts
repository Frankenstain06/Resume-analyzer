/**
 * Resume & Analysis Types
 */

/* ── Upload response ─────────────────────────────────────────────────── */
export interface ResumeUploadResult {
  resume_id: string;
  analysis_id: string;
  filename: string;
  overall_score: number;
  status: string;
}

/* ── List item ───────────────────────────────────────────────────────── */
export interface ResumeListItem {
  id: string;
  filename: string;
  status: string;
  overall_score: number | null;
  created_at: string;
}

/* ── Analysis section detail ─────────────────────────────────────────── */
export interface AnalysisSection {
  score: number;
  label: string;
  weight: number;
  found?: string[];
  missing?: string[];
  feedback?: string;
  word_count?: number;
  count?: number;
  match_count?: number;
  types_found?: string[];
  by_category?: Record<string, string[]>;
  issues?: string[];
}

/* ── Full analysis result ────────────────────────────────────────────── */
export interface AnalysisResult {
  id: string;
  overall_score: number;
  sections: Record<string, AnalysisSection>;
  suggestions: string[];
  keywords: string[];
  created_at: string;
}

/* ── Resume detail ───────────────────────────────────────────────────── */
export interface ResumeDetail {
  id: string;
  filename: string;
  status: string;
  created_at: string;
  raw_text: string;
}

/* ── Resume + analysis bundle ────────────────────────────────────────── */
export interface ResumeWithAnalysis {
  resume: ResumeDetail;
  analysis: AnalysisResult | null;
}

/* ── Dashboard data from /api/dashboard/ ─────────────────────────────── */
export interface DashboardData {
  message: string;
  user: {
    id: string;
    email: string;
    full_name: string | null;
    tier: string;
    created_at: string;
  };
  stats: {
    resumes_analyzed: number;
    average_score: number | null;
  };
  recent_resumes: ResumeListItem[];
}
