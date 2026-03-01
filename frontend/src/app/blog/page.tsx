/**
 * Blog Page
 * Articles and insights on resume writing, career growth, and job search.
 */

"use client";

import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import { ArrowRight, Clock, User } from "lucide-react";
import { articles, categoryColors } from "@/constants/blog-data";

/* split into featured / recent */
const featuredPosts = articles.slice(0, 3);
const recentPosts = articles.slice(3);

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimateIn variant="fade-up">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                Blog
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Insights & career advice
              </h1>
              <p className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto">
                Expert articles on resume optimization, job search tactics, and navigating the modern hiring landscape.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <div className="mb-14">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                  Featured
                </p>
                <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
                  Editor&rsquo;s picks
                </h2>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, i) => (
                <AnimateIn key={post.title} variant="fade-up" delay={i * 100}>
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                  <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    {/* Color top bar */}
                    <div className="h-1.5 bg-linear-to-r from-teal-600 to-emerald-500" />
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            categoryColors[post.category] ?? "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-5 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <User size={12} /> {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-teal-700 text-sm font-medium">
                        Read article <ArrowRight size={14} />
                      </div>
                    </div>
                  </article>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <div className="mb-14">
                <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                  Recent
                </p>
                <h2 className="text-3xl sm:text-[2.5rem] font-bold text-gray-900">
                  Latest articles
                </h2>
              </div>
            </AnimateIn>

            <div className="space-y-5">
              {recentPosts.map((post, i) => (
                <AnimateIn key={post.title} variant="fade-up" delay={i * 80}>
                  <Link href={`/blog/${post.slug}`}>
                  <article className="bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-lg transition-shadow flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            categoryColors[post.category] ?? "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <User size={12} /> {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0 flex items-center gap-1 text-teal-700 text-sm font-medium whitespace-nowrap">
                      Read <ArrowRight size={14} />
                    </div>
                  </article>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 lg:py-28 px-6">
          <AnimateIn variant="zoom" duration={800}>
            <div className="max-w-4xl mx-auto bg-teal-800 rounded-3xl px-8 py-16 sm:px-14 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Stay in the loop
              </h2>
              <p className="text-teal-200 text-sm max-w-md mx-auto mb-8">
                Get the latest resume tips and career advice delivered to your inbox every week — no spam, ever.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full sm:flex-1 px-5 py-3.5 rounded-full text-sm bg-white/10 text-white placeholder:text-teal-300 border border-white/20 focus:outline-none focus:border-white/50"
                />
                <button className="inline-flex items-center gap-2 bg-white text-teal-800 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-teal-50 transition-colors whitespace-nowrap">
                  Subscribe <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
