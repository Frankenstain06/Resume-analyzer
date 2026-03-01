"use client";

import Link from "next/link";
import { ArrowRight, FileCheck, Star, TrendingUp } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export default function HeroSection() {
  return (
    <section className="bg-[#f5f7fa] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content */}
          <div className="flex-1 max-w-xl">
            <AnimateIn variant="fade-up" duration={800}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Analyze your resume{" "}
                <br className="hidden sm:block" />
                land your <span className="italic text-teal-700">dream</span>{" "}
                job.
              </h1>
            </AnimateIn>
            <AnimateIn variant="fade-up" delay={150}>
              <p className="mt-6 text-gray-500 text-lg leading-relaxed">
                AI-powered resume analysis with ATS scoring, keyword optimization, and personalized improvement suggestions.
              </p>
            </AnimateIn>

            {/* Email input + CTA */}
            <AnimateIn variant="fade-up" delay={300}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your business email"
                  className="flex-1 px-5 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white"
                />
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 bg-teal-700 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-teal-800 transition-colors"
                >
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </AnimateIn>

            {/* Trust logos */}
            <AnimateIn variant="fade" delay={500}>
              <div className="mt-10 flex items-center gap-8 text-gray-400">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Trusted by</p>
                <span className="text-lg font-bold text-gray-400">Google</span>
                <span className="text-lg font-bold text-gray-400">Meta</span>
                <span className="text-lg font-bold text-gray-400">Amazon</span>
              </div>
            </AnimateIn>
          </div>

          {/* Right side - Resume card mockup */}
          <AnimateIn variant="fade-left" delay={400} duration={900} className="flex-1 flex justify-center lg:justify-end max-w-lg w-full">
            <div className="relative w-full">
              {/* Main card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <FileCheck size={20} className="text-teal-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Resume Score</p>
                    <p className="text-xs text-gray-400">Overall Analysis</p>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-5xl font-bold text-teal-700">87<span className="text-2xl text-gray-400">/100</span></p>
                  <p className="text-sm text-gray-400 mt-1">ATS Compatibility</p>
                </div>

                {/* Score bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Keywords Match</span>
                      <span className="text-gray-700 font-medium">92%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-teal-600 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Formatting</span>
                      <span className="text-gray-700 font-medium">85%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-teal-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Impact Statements</span>
                      <span className="text-gray-700 font-medium">78%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-amber-400 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge - top right */}
              <div className="absolute -top-4 -right-4 bg-teal-700 text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Star size={16} className="fill-current" />
                  <span className="text-sm font-bold">ATS Ready</span>
                </div>
              </div>

              {/* Floating badge - bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-500" />
                  <span className="text-sm font-semibold text-gray-700">+34% improvement</span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
