/**
 * Features Page
 * Detailed breakdown of MyReazr's AI-powered resume analysis features.
 */

"use client";

import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import {
  Search,
  Layers,
  Shield,
  Zap,
  BarChart3,
  FileCheck,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ─── Feature data ─── */
const coreFeatures = [
  {
    icon: Search,
    title: "ATS Scoring",
    description:
      "Get an instant compatibility score that mirrors how real Applicant Tracking Systems parse and rank your resume.",
  },
  {
    icon: Layers,
    title: "Keyword Optimization",
    description:
      "Our AI identifies missing keywords from target job descriptions and suggests strategic placements to boost match rates.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your resume data is encrypted end-to-end and never shared. Enterprise-grade security protects your information.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description:
      "Upload and receive detailed feedback in under 10 seconds. No waiting, no queues, no appointments needed.",
  },
  {
    icon: Target,
    title: "Industry Targeting",
    description:
      "Tailor your resume to specific industries — tech, finance, healthcare, and 10+ more with specialized scoring models.",
  },
  {
    icon: Sparkles,
    title: "AI Suggestions",
    description:
      "Get line-by-line rewrite suggestions powered by GPT to strengthen impact statements and quantify achievements.",
  },
];

const detailedFeatures = [
  {
    title: "Smart Resume Parsing",
    description:
      "Our engine reads PDF, DOCX, and plain-text resumes, extracting sections, skills, experience, and education with 98% accuracy.",
    highlights: [
      "Supports PDF, DOCX, and TXT formats",
      "Automatic section detection",
      "Skill extraction with relevance scoring",
      "Education & certification parsing",
    ],
    icon: FileCheck,
    color: "bg-teal-50",
    accent: "text-teal-700",
  },
  {
    title: "ATS Compatibility Report",
    description:
      "See exactly how ATS systems will interpret your resume, with a score breakdown across formatting, keywords, and structure.",
    highlights: [
      "Overall ATS score out of 100",
      "Section-by-section breakdown",
      "Formatting issue detection",
      "Missing keyword identification",
    ],
    icon: BarChart3,
    color: "bg-emerald-50",
    accent: "text-emerald-700",
  },
  {
    title: "Personalized Improvement Plan",
    description:
      "Receive a prioritized action list with specific, actionable steps to improve your resume score and interview rate.",
    highlights: [
      "Priority-ranked suggestions",
      "Before/after comparisons",
      "Industry-specific tips",
      "Track improvement over time",
    ],
    icon: Target,
    color: "bg-amber-50",
    accent: "text-amber-700",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimateIn variant="fade-up">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                Features
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Everything you need to land
                <br className="hidden sm:block" />
                <span className="italic text-teal-700"> more interviews</span>
              </h1>
              <p className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                Our AI-powered platform analyzes every aspect of your resume — from ATS compatibility to impact statements — and gives you a clear roadmap to improve.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Core Feature Grid */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <div className="mb-14">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                  Core Capabilities
                </p>
                <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
                  Powerful features, simple experience
                </h2>
              </div>
            </AnimateIn>

            <div className="border-t border-gray-200 mb-14" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {coreFeatures.map((feature, i) => (
                <AnimateIn key={feature.title} variant="fade-up" delay={i * 100}>
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                      <feature.icon size={24} className="text-teal-700" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Feature Cards */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <div className="text-center mb-16">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                  Deep Dive
                </p>
                <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
                  How it works under the hood
                </h2>
              </div>
            </AnimateIn>

            <div className="space-y-8">
              {detailedFeatures.map((feature, i) => (
                <AnimateIn key={feature.title} variant="fade-up" delay={i * 150}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center shrink-0`}>
                      <feature.icon size={28} className={feature.accent} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-5">{feature.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {feature.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
                            <span className="text-sm text-gray-600">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 px-6">
          <AnimateIn variant="zoom" duration={800}>
            <div className="max-w-4xl mx-auto bg-teal-800 rounded-3xl px-8 py-16 sm:px-14 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to optimize your resume?
              </h2>
              <p className="text-teal-200 text-sm max-w-md mx-auto mb-8">
                Join thousands of job seekers who boosted their interview rate with AI-powered analysis.
              </p>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-white text-teal-800 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-teal-50 transition-colors"
              >
                Get Started Free <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
