/**
 * Resume Upload Page
 * Drag-and-drop or click-to-browse file uploader.
 * Protected — redirects unauthenticated users to login.
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { uploadResume } from "@/services/resume";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  X,
} from "lucide-react";

const ALLOWED = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export default function ResumeUploadPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [successId, setSuccessId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading && !user) router.push("/auth/login");
  }, [authLoading, user, router]);

  /* ── file validation ───────────────────────────────── */
  const validateFile = (f: File): string | null => {
    if (!ALLOWED.includes(f.type) && !f.name.match(/\.(pdf|docx?|txt)$/i))
      return "Only PDF, DOCX, and TXT files are supported.";
    if (f.size > MAX_SIZE)
      return "File must be smaller than 10 MB.";
    return null;
  };

  /* ── drop / select handlers ────────────────────────── */
  const handleFile = (f: File) => {
    setError("");
    setSuccessId(null);
    const err = validateFile(f);
    if (err) {
      setError(err);
      return;
    }
    setFile(f);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback(() => setDragActive(false), []);

  const onBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  /* ── upload ────────────────────────────────────────── */
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const result = await uploadResume(file);
      setSuccessId(result.resume_id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-teal-700" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] bg-[#f5f7fa] py-16 lg:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Analyze Your Resume
          </h1>
          <p className="text-gray-500 text-center mb-10">
            Upload your resume and get an instant AI‑powered score with
            actionable suggestions.
          </p>

          {/* Success state */}
          {successId && (
            <div className="bg-white rounded-2xl border border-emerald-200 p-8 text-center">
              <CheckCircle2 size={48} className="text-emerald-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Analysis Complete!
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                Your resume has been analyzed. View your detailed report below.
              </p>
              <Link
                href={`/resume/analysis/${successId}`}
                className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors"
              >
                View Analysis <ArrowRight size={16} />
              </Link>
            </div>
          )}

          {/* Upload area */}
          {!successId && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              {/* Drop zone */}
              <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => inputRef.current?.click()}
                className={`
                  relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed
                  cursor-pointer transition-colors py-16
                  ${dragActive ? "border-teal-500 bg-teal-50/50" : "border-gray-200 hover:border-teal-400 hover:bg-gray-50"}
                `}
              >
                <Upload size={36} className={dragActive ? "text-teal-600" : "text-gray-400"} />
                <p className="mt-4 text-sm font-medium text-gray-700">
                  {dragActive ? "Drop your file here" : "Drag & drop your resume, or click to browse"}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  PDF, DOCX, or TXT — up to 10 MB
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  onChange={onBrowse}
                />
              </div>

              {/* Selected file */}
              {file && (
                <div className="mt-5 flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                  <FileText size={20} className="text-teal-700 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFile(null);
                      setError("");
                    }}
                    className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-gray-500" />
                  </button>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-sm">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              {/* Upload button */}
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="mt-6 w-full flex items-center justify-center gap-2 bg-teal-700 text-white py-3.5 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload & Analyze
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
