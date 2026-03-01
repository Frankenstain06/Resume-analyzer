"use client";

import { FileCheck, Zap, BarChart3 } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export default function WhyUsSection() {
  return (
    <section className="bg-[#f5f7fa] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimateIn variant="fade-up">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
              Why Us
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
              Why they prefer MyReazr
            </h2>
          </div>
        </AnimateIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 - Big stat */}
          <AnimateIn variant="fade-up" delay={100}>
            <div className="bg-teal-50 rounded-2xl p-10 flex flex-col justify-between min-h-65">
              <p className="text-6xl sm:text-7xl font-bold text-teal-700">3k+</p>
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900">Resumes analyzed every day</h3>
                <p className="text-sm text-gray-500 mt-2">Job seekers trust MyReazr to optimize their applications and land more interviews.</p>
              </div>
            </div>
          </AnimateIn>

          {/* Card 2 - Feature highlight */}
          <AnimateIn variant="fade-up" delay={200}>
            <div className="bg-white rounded-2xl p-10 border border-gray-100 flex flex-col justify-between min-h-65">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Instant feedback on your resume at any time
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Upload your resume and get detailed analysis in seconds. No waiting, no appointments needed.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <div className="w-12 h-12 rounded-xl bg-teal-700 flex items-center justify-center">
                  <FileCheck size={22} className="text-white" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Zap size={22} className="text-gray-500" />
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <BarChart3 size={22} className="text-gray-500" />
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Card 3 - No guesswork */}
          <AnimateIn variant="fade-up" delay={300} className="md:col-span-2">
            <div className="bg-white rounded-2xl p-10 border border-gray-100 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  No guesswork in your job search
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Get data-driven insights on your resume strength, keyword gaps, and formatting issues. Make every application count with AI-powered suggestions.
                </p>
              </div>

              {/* Mini chart mockup */}
              <div className="flex-1 bg-gray-50 rounded-xl p-6 w-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Resume Score Trend</p>
                    <p className="text-2xl font-bold text-gray-900">92/100</p>
                  </div>
                  <span className="text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full">This month</span>
                </div>
                {/* Simple bar chart */}
                <div className="flex items-end gap-2 h-24">
                  {[40, 55, 50, 65, 70, 85, 92].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-teal-200 transition-all"
                      style={{ height: `${h}%` }}
                    >
                      {i === 6 && (
                        <div className="w-full h-full rounded-t-md bg-teal-600"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
