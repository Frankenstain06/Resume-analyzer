"use client";

import AnimateIn from "@/components/AnimateIn";

export default function MissionSection() {
  const stats = [
    { value: "24%", label: "Higher interview rate" },
    { value: "180K", label: "Resumes analyzed" },
    { value: "10+", label: "Industries covered" },
  ];

  return (
    <section className="bg-[#f5f7fa] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <AnimateIn variant="fade-up">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
            Our Mission
          </p>
          <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900 leading-snug max-w-lg mx-auto">
            We&apos;ve helped innovative companies
          </h2>
          <p className="mt-4 text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Hundreds of all sizes and across all industries have made big improvements with us.
          </p>
        </AnimateIn>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center gap-16 mt-14">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.label} variant="fade-up" delay={i * 150}>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
