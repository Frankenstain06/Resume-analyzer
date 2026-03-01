/**
 * Resume Analysis Detail Page  —  /resume/analysis/[id]
 * Displays the full AI analysis for a specific resume.
 */

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { getResumeAnalysis } from "@/services/resume";
import type { ResumeWithAnalysis, AnalysisSection } from "@/types/resume";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import {
  Loader2,
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ── score colour helpers ────────────────────────────────────────────── */
function scoreColour(score: number) {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-500";
}
function barColour(score: number) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
}
function ringColour(score: number) {
  if (score >= 80) return "stroke-emerald-500";
  if (score >= 60) return "stroke-amber-500";
  return "stroke-red-500";
}

/* ── circular gauge component ────────────────────────────────────────── */
function ScoreGauge({ score }: { score: number }) {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="80" cy="80" r={r} fill="none"
          className={ringColour(score)}
          strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-bold ${scoreColour(score)}`}>{score}</span>
        <span className="text-xs text-gray-400 mt-1">out of 100</span>
      </div>
    </div>
  );
}

/* ── section row (expandable) ────────────────────────────────────────── */
function SectionRow({ data }: { data: AnalysisSection }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{data.label}</p>
          <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className={`h-full rounded-full ${barColour(data.score)}`} style={{ width: `${data.score}%`, transition: "width 0.8s ease" }} />
          </div>
        </div>
        <span className={`text-lg font-bold w-12 text-right ${scoreColour(data.score)}`}>{data.score}</span>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 space-y-2 border-t border-gray-50 pt-3">
          {/* Contextual detail per section type */}
          {data.found && data.found.length > 0 && (
            <p><span className="font-medium text-gray-700">Found:</span> {data.found.join(", ")}</p>
          )}
          {data.missing && data.missing.length > 0 && (
            <p><span className="font-medium text-red-600">Missing:</span> {data.missing.join(", ")}</p>
          )}
          {data.feedback && <p>{data.feedback}</p>}
          {data.word_count !== undefined && <p>Word count: <span className="font-medium">{data.word_count}</span></p>}
          {data.count !== undefined && <p>Action verbs used: <span className="font-medium">{data.count}</span></p>}
          {data.match_count !== undefined && <p>Quantifiable metrics found: <span className="font-medium">{data.match_count}</span></p>}
          {data.issues && data.issues.length > 0 && (
            <ul className="list-disc pl-5 space-y-1">
              {data.issues.map((iss, i) => <li key={i}>{iss}</li>)}
            </ul>
          )}
          {data.by_category && Object.keys(data.by_category).length > 0 && (
            <div>
              {Object.entries(data.by_category).map(([cat, kws]) => (
                <p key={cat}><span className="font-medium capitalize">{cat.replace("_", " ")}:</span> {(kws as string[]).join(", ")}</p>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-400">Weight: {((data.weight ?? 0) * 100).toFixed(0)}% of overall score</p>
        </div>
      )}
    </div>
  );
}

/* ── main page ───────────────────────────────────────────────────────── */
export default function AnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<ResumeWithAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
      return;
    }
    if (user && id) {
      getResumeAnalysis(id)
        .then(setData)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [authLoading, user, id, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
        <Loader2 size={32} className="animate-spin text-teal-700" />
      </div>
    );
  }

  if (error || !data?.analysis) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f5f7fa] px-6 text-center">
          <AlertTriangle size={48} className="text-red-400 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Analysis not found</h2>
          <p className="text-sm text-gray-500 mb-6">{error || "We couldn't load the analysis for this resume."}</p>
          <Link href="/dashboard" className="text-teal-700 font-medium text-sm flex items-center gap-1">
            <ArrowLeft size={14} /> Back to dashboard
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const { resume, analysis } = data;
  const sections = analysis.sections;
  const sectionOrder = [
    "contact_info", "sections", "length",
    "action_verbs", "quantifiable_achievements",
    "keyword_optimization", "formatting",
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[#f5f7fa] min-h-screen pb-20">
        {/* Header */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link href="/dashboard" className="text-teal-700 text-xs font-medium flex items-center gap-1 mb-2 hover:underline">
                <ArrowLeft size={12} /> Dashboard
              </Link>
              <h1 className="text-xl font-bold text-gray-900">{resume.filename}</h1>
              <p className="text-xs text-gray-400 mt-1">
                Analyzed on {new Date(analysis.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <Link
              href="/resume/upload"
              className="inline-flex items-center gap-2 bg-teal-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors"
            >
              <Upload size={16} /> Upload Another
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Score + Suggestions + Keywords */}
          <div className="lg:col-span-1 space-y-6">
            {/* Overall Score */}
            <AnimateIn variant="fade-up">
              <div className="bg-white rounded-2xl border border-gray-100 p-7 text-center">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Overall Score</p>
                <ScoreGauge score={analysis.overall_score} />
                <p className="mt-4 text-sm text-gray-500">
                  {analysis.overall_score >= 80
                    ? "Excellent — your resume is strong!"
                    : analysis.overall_score >= 60
                    ? "Good — a few improvements will help."
                    : "Needs work — follow the suggestions below."}
                </p>
              </div>
            </AnimateIn>

            {/* Keywords */}
            <AnimateIn variant="fade-up" delay={100}>
              <div className="bg-white rounded-2xl border border-gray-100 p-7">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={16} className="text-teal-700" />
                  <p className="text-sm font-semibold text-gray-900">Keywords Found</p>
                </div>
                {analysis.keywords.length === 0 ? (
                  <p className="text-sm text-gray-400">No ATS keywords detected.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.map((kw) => (
                      <span key={kw} className="bg-teal-50 text-teal-700 text-xs font-medium px-3 py-1 rounded-full">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </AnimateIn>

            {/* Suggestions */}
            <AnimateIn variant="fade-up" delay={200}>
              <div className="bg-white rounded-2xl border border-gray-100 p-7">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb size={16} className="text-amber-600" />
                  <p className="text-sm font-semibold text-gray-900">Suggestions</p>
                </div>
                <ul className="space-y-3">
                  {analysis.suggestions.map((s, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={14} className="text-teal-600 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Section Breakdown */}
          <div className="lg:col-span-2">
            <AnimateIn variant="fade-up" delay={100}>
              <div className="bg-white rounded-2xl border border-gray-100 p-7">
                <p className="text-sm font-semibold text-gray-900 mb-5">
                  Category Breakdown
                </p>
                <div className="space-y-3">
                  {sectionOrder.map((key) => {
                    const sec = sections[key];
                    if (!sec) return null;
                    return <SectionRow key={key} data={sec} />;
                  })}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
