/**
 * Resources Page
 * Guides, templates, ebooks, and tutorials for job seekers.
 */

"use client";

import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import {
  FileText,
  BookOpen,
  Download,
  Video,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

/* ─── Resource categories ─── */
const categories = [
  {
    icon: FileText,
    title: "Resume Templates",
    description: "Professional, ATS-friendly resume templates for every industry and career stage.",
    count: "12 templates",
    color: "bg-teal-50",
    accent: "text-teal-700",
    href: "/resources/templates",
  },
  {
    icon: BookOpen,
    title: "Career Guides",
    description: "In-depth guides on resume writing, interview prep, salary negotiation, and job search strategies.",
    count: "6 guides",
    color: "bg-emerald-50",
    accent: "text-emerald-700",
    href: "/resources/guides",
  },
  {
    icon: Download,
    title: "Ebooks",
    description: "Free downloadable ebooks covering everything from career pivots to executive resume writing.",
    count: "5 ebooks",
    color: "bg-amber-50",
    accent: "text-amber-700",
    href: "/resources/guides",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs on optimizing your resume, using MyReazr, and acing interviews.",
    count: "15 videos",
    color: "bg-violet-50",
    accent: "text-violet-700",
    href: "/blog",
  },
];

/* ─── Featured guides ─── */
const guides = [
  {
    title: "The Ultimate ATS Resume Guide (2026)",
    description:
      "Learn exactly how ATS systems parse resumes and the 12 formatting rules you must follow to pass every automated screen.",
    tag: "Guide",
    tagColor: "bg-teal-50 text-teal-700",
    readTime: "10 min read",
  },
  {
    title: "50 Power Verbs for Resume Impact Statements",
    description:
      "Replace weak verbs with powerful action words that quantify your achievements and catch recruiters' attention.",
    tag: "Cheat Sheet",
    tagColor: "bg-amber-50 text-amber-700",
    readTime: "5 min read",
  },
  {
    title: "How to Tailor Your Resume for Any Job",
    description:
      "A step-by-step framework for customizing your resume to match specific job descriptions — without starting from scratch.",
    tag: "Guide",
    tagColor: "bg-teal-50 text-teal-700",
    readTime: "8 min read",
  },
  {
    title: "Career Change Resume: Complete Playbook",
    description:
      "Transitioning industries? Learn how to position transferable skills, reframe experience, and write a compelling summary.",
    tag: "Ebook",
    tagColor: "bg-violet-50 text-violet-700",
    readTime: "15 min read",
  },
  {
    title: "Keyword Optimization Masterclass",
    description:
      "Discover how to extract keywords from job postings and strategically place them in your resume for maximum ATS scores.",
    tag: "Tutorial",
    tagColor: "bg-emerald-50 text-emerald-700",
    readTime: "12 min read",
  },
  {
    title: "Remote Work Resume Tips",
    description:
      "How to highlight remote work skills, tools, and self-management abilities that employers look for in distributed team members.",
    tag: "Guide",
    tagColor: "bg-teal-50 text-teal-700",
    readTime: "6 min read",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimateIn variant="fade-up">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                Resources
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Level up your job search
              </h1>
              <p className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto">
                Free templates, guides, ebooks, and tutorials to help you craft the perfect resume and land your dream role.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Category Cards */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <div className="mb-14">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                  Browse by Category
                </p>
                <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
                  Everything you need to succeed
                </h2>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, i) => (
                <AnimateIn key={cat.title} variant="fade-up" delay={i * 100}>
                  <Link href={cat.href} className="block h-full">
                  <div className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center mb-5`}>
                      <cat.icon size={24} className={cat.accent} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{cat.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{cat.description}</p>
                    <p className="text-xs font-medium text-teal-600 mt-4">{cat.count}</p>
                  </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <div className="text-center mb-14">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                  Featured
                </p>
                <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
                  Most popular resources
                </h2>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, i) => (
                <AnimateIn key={guide.title} variant="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${guide.tagColor}`}>
                        {guide.tag}
                      </span>
                      <span className="text-xs text-gray-400">{guide.readTime}</span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{guide.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{guide.description}</p>
                    <div className="mt-5 flex items-center gap-1 text-teal-700 text-sm font-medium">
                      Read more <ArrowUpRight size={14} />
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
                Want personalized feedback?
              </h2>
              <p className="text-teal-200 text-sm max-w-md mx-auto mb-8">
                Go beyond guides — upload your resume and get AI-powered, line-by-line analysis in seconds.
              </p>
              <Link
                href="/auth/register"
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
