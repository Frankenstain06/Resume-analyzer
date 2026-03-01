"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

const plans = [
  {
    name: "Plus",
    price: "$4.99",
    color: "bg-teal-50",
    accent: "text-teal-700",
    features: [
      "5 resume analyses / month",
      "ATS scoring",
      "Keyword suggestions",
      "Basic formatting review",
    ],
  },
  {
    name: "Premium",
    price: "$9.99",
    color: "bg-teal-700",
    accent: "text-white",
    features: [
      "Unlimited analyses",
      "ATS + recruiter scoring",
      "Cover letter generator",
      "Priority AI feedback",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimateIn variant="fade-up">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
              Choose Plan
            </p>
            <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
              Simple, transparent pricing
            </h2>
          </div>
        </AnimateIn>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {plans.map((plan, i) => {
            const isDark = plan.name === "Premium";
            return (
              <AnimateIn key={plan.name} variant="fade-up" delay={i * 150}>
              <div
                key={plan.name}
                className={`${plan.color} rounded-2xl p-8 flex flex-col justify-between min-h-80`}
              >
                <div>
                  <h3
                    className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    {plan.name}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`text-sm ${isDark ? "text-teal-100" : "text-gray-500"}`}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <p className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                    {plan.price}<span className={`text-sm font-normal ${isDark ? "text-teal-200" : "text-gray-400"}`}>/month</span>
                  </p>
                  <Link
                    href="/auth/register"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isDark
                        ? "bg-white/20 text-white hover:bg-white/30"
                        : "bg-teal-700/10 text-teal-700 hover:bg-teal-700/20"
                    }`}
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
