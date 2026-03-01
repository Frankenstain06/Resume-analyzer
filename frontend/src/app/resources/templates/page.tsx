/**
 * Resume Templates Page  —  /resources/templates
 * Showcases downloadable resume template previews.
 */

"use client";

import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import {
  ArrowRight,
  Download,
  Briefcase,
  GraduationCap,
  Code,
  Stethoscope,
  Palette,
  TrendingUp,
} from "lucide-react";

const templates = [
  {
    icon: Briefcase,
    name: "Professional Classic",
    description:
      "Clean single-column layout ideal for corporate, finance, and management roles. ATS-optimized with traditional section ordering.",
    tags: ["ATS-Friendly", "1 Page", "Corporate"],
    accent: "bg-teal-50 text-teal-700",
  },
  {
    icon: Code,
    name: "Tech Engineer",
    description:
      "Designed for software engineers and developers. Highlights technical skills, projects, and open-source contributions prominently.",
    tags: ["ATS-Friendly", "1-2 Pages", "Tech"],
    accent: "bg-blue-50 text-blue-700",
  },
  {
    icon: GraduationCap,
    name: "Recent Graduate",
    description:
      "Optimized for candidates with limited experience. Emphasizes education, internships, projects, and relevant coursework.",
    tags: ["ATS-Friendly", "1 Page", "Entry-Level"],
    accent: "bg-violet-50 text-violet-700",
  },
  {
    icon: TrendingUp,
    name: "Executive Leadership",
    description:
      "Two-page template for senior leaders. Features an executive summary, board experience, P&L ownership, and strategic achievements.",
    tags: ["ATS-Friendly", "2 Pages", "Executive"],
    accent: "bg-amber-50 text-amber-700",
  },
  {
    icon: Palette,
    name: "Creative Professional",
    description:
      "Subtle design accents with a clean structure. Perfect for marketing, UX design, and content roles that value visual polish.",
    tags: ["ATS-Friendly", "1 Page", "Creative"],
    accent: "bg-rose-50 text-rose-700",
  },
  {
    icon: Stethoscope,
    name: "Healthcare & Science",
    description:
      "Structured for clinical, research, and healthcare roles. Includes sections for publications, certifications, and clinical rotations.",
    tags: ["ATS-Friendly", "1-2 Pages", "Healthcare"],
    accent: "bg-emerald-50 text-emerald-700",
  },
];

const tips = [
  {
    title: "Always use a PDF",
    description: "PDF preserves formatting across all devices and is universally accepted by ATS systems.",
  },
  {
    title: "Customize for every application",
    description: "Use the template as a starting point, then tailor keywords and achievements to each job description.",
  },
  {
    title: "Keep it scannable",
    description: "Use clear headings, bullet points, and consistent spacing so recruiters can find information in seconds.",
  },
  {
    title: "Test with MyReazr",
    description: "After filling in your template, upload it to our analyzer to check your ATS score and get personalized suggestions.",
  },
];

export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimateIn variant="fade-up">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                Resume Templates
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Start with a proven template
              </h1>
              <p className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto">
                ATS-optimized resume templates designed by career experts. Pick one, fill it in, and upload it to MyReazr for instant analysis.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Template Grid */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((t, i) => (
                <AnimateIn key={t.name} variant="fade-up" delay={i * 80}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-xl ${t.accent.split(" ")[0]} flex items-center justify-center mb-5`}>
                      <t.icon size={24} className={t.accent.split(" ")[1]} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{t.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {t.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="mt-5 flex items-center gap-2 text-teal-700 text-sm font-medium hover:underline">
                      <Download size={14} /> Download Template
                    </button>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <div className="text-center mb-14">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                  Pro Tips
                </p>
                <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
                  Get the most out of your template
                </h2>
              </div>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tips.map((tip, i) => (
                <AnimateIn key={tip.title} variant="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-sm font-bold mb-4">
                      {i + 1}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{tip.description}</p>
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
                Ready to test your resume?
              </h2>
              <p className="text-teal-200 text-sm max-w-md mx-auto mb-8">
                Fill in any template above, then upload it to MyReazr for an instant AI-powered score and improvement plan.
              </p>
              <Link
                href="/resume/upload"
                className="inline-flex items-center gap-2 bg-white text-teal-800 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-teal-50 transition-colors"
              >
                Analyze My Resume <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
