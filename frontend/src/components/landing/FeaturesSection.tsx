"use client";

import { Search, Layers, Shield } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";

const features = [
  {
    icon: Search,
    title: "ATS Scoring",
    description:
      "Get instant ATS compatibility scores and identify exactly what recruiters' systems are looking for in your resume.",
  },
  {
    icon: Layers,
    title: "Keyword Optimization",
    description:
      "Our AI identifies missing keywords from job descriptions and suggests strategic placements to boost your match rate.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your resume data is encrypted and never shared. We use enterprise-grade security to protect your personal information.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-16">
          <AnimateIn variant="fade-right" className="max-w-md">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
              AI-Powered Analysis
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900 leading-snug">
              Experience that grows{" "}
              <br className="hidden sm:block" />
              with your scale.
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-left" delay={200} className="max-w-sm lg:pt-8">
            <p className="text-gray-500 leading-relaxed text-[15px]">
              Leverage our AI resume analysis engine that adapts to your industry and experience level for personalized, actionable feedback.
            </p>
          </AnimateIn>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-14"></div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} variant="fade-up" delay={i * 150}>
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
  );
}
