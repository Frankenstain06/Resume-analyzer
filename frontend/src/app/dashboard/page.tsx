/**
 * Dashboard Page (Protected)
 * Shows real stats, recent resume analyses, and quick upload CTA.
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboard } from "@/services/resume";
import type { DashboardData, ResumeListItem } from "@/types/resume";
import {
  Loader2,
  User,
  LogOut,
  BarChart3,
  FileText,
  Star,
  Upload,
  ArrowRight,
  Clock,
} from "lucide-react";

function scoreColour(score: number | null) {
  if (score === null) return "text-gray-400";
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}

export default function DashboardPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }
    if (user) {
      getDashboard()
        .then(setData)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [authLoading, user, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={32} className="animate-spin text-teal-700" />
      </div>
    );
  }
  if (!user) return null;

  const stats = data?.stats;
  const resumes = data?.recent_resumes ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user.full_name || "there"}!
            </h1>
            <p className="text-gray-500 mt-1">Here&apos;s an overview of your account.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/resume/upload"
              className="hidden sm:inline-flex items-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors"
            >
              <Upload size={16} /> Upload Resume
            </Link>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-teal-50 rounded-lg"><FileText size={20} className="text-teal-700" /></div>
              <h3 className="font-medium text-gray-700">Resumes Analyzed</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats?.resumes_analyzed ?? 0}</p>
            <p className="text-sm text-gray-400 mt-1">
              {stats?.resumes_analyzed ? "All time" : "Upload your first resume to get started"}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-50 rounded-lg"><BarChart3 size={20} className="text-emerald-700" /></div>
              <h3 className="font-medium text-gray-700">Average Score</h3>
            </div>
            <p className={`text-3xl font-bold ${stats?.average_score ? scoreColour(stats.average_score) : "text-gray-900"}`}>
              {stats?.average_score ?? "—"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {stats?.average_score ? "Across all analyses" : "Your ATS score will appear here"}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-50 rounded-lg"><Star size={20} className="text-amber-600" /></div>
              <h3 className="font-medium text-gray-700">Plan</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 capitalize">{user.tier}</p>
            <p className="text-sm text-gray-400 mt-1">Current subscription tier</p>
          </div>
        </div>

        {/* Mobile upload button */}
        <Link
          href="/resume/upload"
          className="sm:hidden flex items-center justify-center gap-2 w-full bg-teal-700 text-white py-3.5 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors"
        >
          <Upload size={18} /> Upload Resume
        </Link>

        {/* Recent Resumes */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Analyses</h2>
            {resumes.length > 0 && (
              <Link href="/resume/upload" className="text-teal-700 text-sm font-medium flex items-center gap-1 hover:underline">
                New analysis <ArrowRight size={14} />
              </Link>
            )}
          </div>

          {resumes.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <FileText size={36} className="text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-4">No resumes analyzed yet.</p>
              <Link
                href="/resume/upload"
                className="inline-flex items-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors"
              >
                <Upload size={16} /> Upload Your First Resume
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {resumes.map((r: ResumeListItem) => (
                <Link
                  key={r.id}
                  href={`/resume/analysis/${r.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-gray-100 rounded-lg shrink-0"><FileText size={18} className="text-gray-600" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{r.filename}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={10} />
                      {new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                  <span className={`text-lg font-bold ${scoreColour(r.overall_score)}`}>
                    {r.overall_score ?? "—"}
                  </span>
                  <ArrowRight size={14} className="text-gray-400" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-teal-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              <p className="text-sm text-gray-500">Your account details</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Name</p>
              <p className="text-gray-900 mt-1">{user.full_name || "Not set"}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Email</p>
              <p className="text-gray-900 mt-1">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Account Tier</p>
              <p className="text-gray-900 mt-1 capitalize">{user.tier}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Member Since</p>
              <p className="text-gray-900 mt-1">
                {new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
