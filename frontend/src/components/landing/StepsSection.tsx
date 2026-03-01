"use client";

import AnimateIn from "@/components/AnimateIn";

export default function StepsSection() {
  const steps = [
    {
      number: "1",
      title: "Upload your resume",
      description:
        "Sign up and upload your resume in PDF or DOCX format. Our system accepts all standard resume formats.",
    },
    {
      number: "2",
      title: "Get AI analysis",
      description:
        "Our AI engine analyzes your resume against ATS systems and provides a detailed score with improvement areas.",
    },
    {
      number: "3",
      title: "Watch offers grow",
      description:
        "Apply with your optimized resume and track your increased response rate from recruiters and hiring managers.",
    },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimateIn variant="fade-up">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
              Steps
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900 leading-snug">
              Maximize your returns with a{" "}
              <br className="hidden sm:block" />
              Resume account that generates.
            </h2>
          </div>
        </AnimateIn>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <AnimateIn key={step.number} variant="zoom" delay={i * 150}>
              <div className="bg-teal-50 rounded-2xl p-8 flex flex-col gap-5 h-full">
                <span className="text-5xl font-bold text-teal-700/30 italic">
                  {step.number}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
