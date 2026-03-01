"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 px-6">
      <AnimateIn variant="zoom" duration={800}>
        <div className="max-w-7xl mx-auto bg-teal-800 rounded-3xl px-8 py-16 sm:px-14 sm:py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left text */}
          <div className="max-w-md">
            <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-4">
              Try It Now
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-bold text-white leading-snug">
              Ready to level up your{" "}
              <br className="hidden sm:block" />
              resume game?
            </h2>
            <p className="mt-4 text-teal-200 text-sm leading-relaxed">
              Join thousands of job seekers who improved their interview rate with AI-powered resume analysis and optimization tools.
            </p>
          </div>

          {/* Right buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-800 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-teal-50 transition-colors"
            >
              Get Started Now
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 text-white px-7 py-3.5 rounded-full text-sm font-medium border border-teal-500 hover:bg-teal-700 transition-colors"
            >
              Learn More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
