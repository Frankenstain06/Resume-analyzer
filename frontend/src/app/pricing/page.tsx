/**
 * Pricing Page
 * Detailed pricing plans with feature comparisons.
 */

"use client";

import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { ArrowUpRight, Check, HelpCircle } from "lucide-react";

/* ─── Plan data ─── */
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Try MyReazr with basic analysis. Perfect for getting started.",
    color: "bg-white border border-gray-200",
    accentBg: "bg-gray-100",
    accentText: "text-gray-700",
    buttonStyle:
      "border border-gray-300 text-gray-700 hover:bg-gray-50",
    features: [
      "1 resume analysis / month",
      "Basic ATS score",
      "General keyword suggestions",
      "PDF upload support",
    ],
    excluded: [
      "Recruiter scoring",
      "Cover letter generator",
      "Priority AI feedback",
      "Industry targeting",
    ],
  },
  {
    name: "Plus",
    price: "$4.99",
    period: "/month",
    description: "For active job seekers who need consistent resume optimization.",
    color: "bg-teal-50 border border-teal-100",
    accentBg: "bg-teal-100",
    accentText: "text-teal-700",
    buttonStyle:
      "bg-teal-700 text-white hover:bg-teal-800",
    popular: true,
    features: [
      "5 resume analyses / month",
      "Detailed ATS scoring",
      "Keyword optimization",
      "Basic formatting review",
      "PDF & DOCX support",
      "Email support",
    ],
    excluded: [
      "Recruiter scoring",
      "Cover letter generator",
    ],
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "/month",
    description: "Unlimited power for serious professionals and career changers.",
    color: "bg-teal-700",
    accentBg: "bg-teal-600",
    accentText: "text-white",
    buttonStyle:
      "bg-white text-teal-700 hover:bg-teal-50",
    features: [
      "Unlimited analyses",
      "ATS + recruiter scoring",
      "Cover letter generator",
      "Priority AI feedback",
      "Industry targeting (10+)",
      "Line-by-line suggestions",
      "Track improvement over time",
      "Priority support",
    ],
    excluded: [],
  },
];

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. All resumes are encrypted in transit and at rest. We never share your data with third parties.",
  },
  {
    q: "What formats do you support?",
    a: "We support PDF, DOCX, and plain text files. Most standard resume formats are automatically parsed.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel with one click from your dashboard. No cancellation fees or lock-in contracts.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimateIn variant="fade-up">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                Pricing
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Simple, transparent pricing
              </h1>
              <p className="mt-5 text-gray-500 text-lg max-w-xl mx-auto">
                Start free. Upgrade when you need more power. No hidden fees.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Plan Cards */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, i) => {
                const isDark = plan.name === "Premium";
                return (
                  <AnimateIn key={plan.name} variant="fade-up" delay={i * 120}>
                    <div
                      className={`${plan.color} rounded-2xl p-8 flex flex-col justify-between min-h-[520px] relative`}
                    >
                      {/* Popular badge */}
                      {plan.popular && (
                        <span className="absolute -top-3 left-6 bg-teal-700 text-white text-xs font-semibold px-4 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}

                      <div>
                        <h3
                          className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                          {plan.name}
                        </h3>
                        <p className={`text-sm mt-1 ${isDark ? "text-teal-200" : "text-gray-500"}`}>
                          {plan.description}
                        </p>

                        {/* Price */}
                        <div className="mt-6 mb-8">
                          <span
                            className={`text-4xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
                          >
                            {plan.price}
                          </span>
                          <span
                            className={`text-sm ml-1 ${isDark ? "text-teal-200" : "text-gray-400"}`}
                          >
                            {plan.period}
                          </span>
                        </div>

                        {/* Included features */}
                        <ul className="space-y-3">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-center gap-2.5">
                              <Check
                                size={16}
                                className={isDark ? "text-teal-300" : "text-teal-600"}
                              />
                              <span
                                className={`text-sm ${isDark ? "text-teal-100" : "text-gray-600"}`}
                              >
                                {f}
                              </span>
                            </li>
                          ))}
                          {/* Excluded features */}
                          {plan.excluded.map((f) => (
                            <li key={f} className="flex items-center gap-2.5 opacity-40">
                              <Check size={16} className={isDark ? "text-teal-400" : "text-gray-400"} />
                              <span
                                className={`text-sm line-through ${isDark ? "text-teal-200" : "text-gray-400"}`}
                              >
                                {f}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href="/auth/register"
                        className={`mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${plan.buttonStyle}`}
                      >
                        Get Started <ArrowUpRight size={16} />
                      </Link>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <div className="text-center mb-14">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                  FAQ
                </p>
                <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
                  Common questions
                </h2>
              </div>
            </AnimateIn>

            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <AnimateIn key={faq.q} variant="fade-up" delay={i * 100}>
                  <div className="bg-white rounded-xl border border-gray-100 p-6">
                    <div className="flex items-start gap-3">
                      <HelpCircle size={18} className="text-teal-600 mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{faq.q}</h4>
                        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
