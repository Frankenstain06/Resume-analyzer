/**
 * /resume/analysis  — landing redirect
 * If a user visits without an ID, send them to the dashboard.
 */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AnalysisLanding() {
  const router = useRouter();
  useEffect(() => { router.replace("/dashboard"); }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={32} className="animate-spin text-teal-700" />
    </div>
  );
}
