/**
 * Blog Article Detail Page  —  /blog/[slug]
 * Renders full article content from the static data store.
 */

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import {
  getArticleBySlug,
  getArticlesBySlugs,
  categoryColors,
} from "@/constants/blog-data";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  Calendar,
} from "lucide-react";

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);

  /* 404 state */
  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] flex flex-col items-center justify-center bg-[#f5f7fa] px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
          <p className="text-sm text-gray-500 mb-6">
            The article you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/blog" className="text-teal-700 font-medium text-sm flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const related = getArticlesBySlugs(article.relatedSlugs);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#f5f7fa] py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <Link href="/blog" className="text-teal-700 text-xs font-medium flex items-center gap-1 mb-6 hover:underline">
                <ArrowLeft size={12} /> Back to Blog
              </Link>

              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.category] ?? "bg-gray-50 text-gray-700"}`}>
                {article.category}
              </span>

              <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><User size={14} /> {article.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> {article.readTime} read</span>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Article body */}
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <AnimateIn variant="fade-up">
              <article className="prose prose-gray max-w-none">
                {article.content.map((para, i) => {
                  // Basic bold (**text**) support
                  const parts = para.split(/\*\*(.*?)\*\*/g);
                  return (
                    <p key={i} className="text-gray-700 leading-relaxed mb-5 text-[15px]">
                      {parts.map((part, j) =>
                        j % 2 === 1 ? (
                          <strong key={j} className="font-semibold text-gray-900">{part}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </p>
                  );
                })}
              </article>
            </AnimateIn>

            {/* CTA */}
            <AnimateIn variant="fade-up" delay={100}>
              <div className="mt-12 bg-teal-50 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to improve your resume?
                </h3>
                <p className="text-sm text-gray-600 mb-5">
                  Upload your resume and get an instant AI-powered analysis with actionable suggestions.
                </p>
                <Link
                  href="/resume/upload"
                  className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-teal-800 transition-colors"
                >
                  Analyze My Resume <ArrowRight size={16} />
                </Link>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="bg-[#f5f7fa] py-14 lg:py-20">
            <div className="max-w-3xl mx-auto px-6">
              <AnimateIn variant="fade-up">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="block bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                    >
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[r.category] ?? "bg-gray-50 text-gray-700"}`}>
                        {r.category}
                      </span>
                      <h3 className="mt-2 text-base font-semibold text-gray-900">{r.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{r.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </AnimateIn>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
