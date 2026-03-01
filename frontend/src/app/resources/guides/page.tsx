/**
 * Career Guides Page  —  /resources/guides
 * In-depth career guides with expandable content.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import AnimateIn from "@/components/AnimateIn";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Target,
  Users,
  Rocket,
  Shield,
  DollarSign,
  Repeat,
} from "lucide-react";

interface Guide {
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  title: string;
  summary: string;
  accent: string;
  content: string[];
}

const guides: Guide[] = [
  {
    icon: Target,
    title: "The Complete ATS Optimization Guide",
    summary: "Everything you need to know about passing Applicant Tracking Systems with a high score.",
    accent: "bg-teal-50 text-teal-700",
    content: [
      "Applicant Tracking Systems (ATS) are used by 99% of Fortune 500 companies and 75% of mid-size employers. These software tools scan, parse, and rank resumes before any human sees them. Understanding how they work is the single most important job-search skill in 2026.",
      "Start by using standard section headings: Summary, Experience, Education, Skills. Avoid creative alternatives like 'Where I've Been' or 'My Toolbox' — the ATS won't recognize them. Stick to reverse-chronological order for your experience section.",
      "Use a single-column layout with no tables, text boxes, headers, or footers (many ATS skip header/footer content entirely). Save as PDF unless the posting specifies .docx. Avoid graphics, logos, and icons — they either get ignored or break the parser.",
      "Mirror keywords from the job description naturally throughout your resume. If the posting says 'project management' and 'stakeholder communication', those exact phrases should appear in your experience bullets. Don't just list them in a skills section — weave them into achievement statements.",
      "After customizing your resume, upload it to MyReazr before submitting. Our analyzer scores your resume the same way an ATS does, highlighting missing keywords, formatting issues, and section gaps so you can fix them before they cost you an interview.",
    ],
  },
  {
    icon: Rocket,
    title: "Writing an Impactful Resume Summary",
    summary: "How to craft a 3-4 line professional summary that hooks recruiters and sets the tone.",
    accent: "bg-violet-50 text-violet-700",
    content: [
      "Your summary is the first thing a recruiter reads after your name and title. In 3-4 lines, it should communicate who you are, what you specialize in, your biggest achievement, and what you're looking for. Think of it as your elevator pitch in text form.",
      "Formula: [Title with years of experience] + [2-3 core specialties] + [Biggest quantified achievement] + [What you bring to the next role]. Example: 'Senior software engineer with 8 years of experience building high-traffic web applications. Specializing in React, Node.js, and distributed systems. Led the migration of a monolithic platform to microservices, reducing deployment time by 70% and improving uptime to 99.99%. Seeking a principal engineer role at a product-led company.'",
      "Avoid vague buzzwords like 'passionate', 'hard-working', or 'results-oriented' without context. Every claim should be supported by a specific number or achievement. If you say 'proven track record', prove it: 'Grew monthly revenue from $2M to $5M in 18 months.'",
      "Tailor your summary for each application. If the job emphasizes leadership, lead with your team management experience. If it emphasizes technical depth, lead with your architecture expertise. A customized summary takes 5 minutes and dramatically increases your callback rate.",
    ],
  },
  {
    icon: Users,
    title: "Networking for Job Seekers (2026 Edition)",
    summary: "Modern networking strategies that go beyond 'Let me know if you hear of anything.'",
    accent: "bg-amber-50 text-amber-700",
    content: [
      "80% of jobs are filled through networking rather than cold applications. But modern networking is not about handing out business cards or sending mass LinkedIn messages. It's about building genuine relationships with people in your target industry, long before you need a favor.",
      "Start by identifying 10-15 people at companies you'd like to work for. Follow them on LinkedIn, engage meaningfully with their content (not just 'Great post!' — add a thoughtful perspective), and eventually reach out with a specific, low-ask question: 'I noticed your team recently migrated to Kubernetes — I'm exploring a similar transition. Would you have 15 minutes to share what worked and what didn't?'",
      "Attend industry meetups, virtual conferences, and webinars. When you meet someone interesting, follow up within 48 hours with a personalized note referencing something specific from your conversation. Consistency is more important than volume — a monthly coffee chat with one person in your industry is worth more than 100 cold messages.",
      "When you do need to ask for help (a referral, introduction, or job lead), make it easy for the other person. Send them your resume, a link to the specific job posting, and a 2-sentence pitch they can forward to the hiring manager. Remove all friction from the referral process.",
    ],
  },
  {
    icon: DollarSign,
    title: "Salary Negotiation Masterclass",
    summary: "Data-driven strategies to negotiate your compensation with confidence.",
    accent: "bg-emerald-50 text-emerald-700",
    content: [
      "The average person who negotiates their salary earns $600,000 more over the course of their career than someone who accepts the first offer. Yet 57% of candidates never negotiate. This guide gives you a structured framework that works.",
      "Step 1: Research. Use Levels.fyi, Glassdoor, Payscale, and Blind to find the salary range for your role, level, and location. Know the 25th, 50th, and 75th percentile numbers. Your target should be between the 60th and 80th percentile unless you have unusually strong leverage (competing offers, rare skills).",
      "Step 2: Anchor high. When asked for your salary expectations, name a number at the top of your research range. This sets the anchor — all subsequent numbers will revolve around it. If pushed, say: 'Based on my research and the value I'd bring, I'm targeting $X-$Y. I'm flexible based on the complete compensation package.'",
      "Step 3: Negotiate total comp, not just salary. Base salary is only one component. Consider signing bonus, annual bonus, equity/RSU grants, PTO, remote work flexibility, professional development budget, and title. Sometimes a lower base with a strong equity package or extra PTO creates more overall value.",
      "Step 4: Get it in writing. Always request a formal offer letter before accepting verbally. Review every detail — start date, title, reporting structure, equity vesting schedule, and any verbal promises made during the negotiation. If something was discussed but isn't in the letter, politely ask for it to be included.",
    ],
  },
  {
    icon: Repeat,
    title: "Changing Careers: The Complete Playbook",
    summary: "How to pivot industries without starting from scratch — leveraging your transferable skills effectively.",
    accent: "bg-blue-50 text-blue-700",
    content: [
      "Changing careers doesn't mean starting over. Most professionals have dozens of transferable skills — communication, project management, problem-solving, stakeholder management, data analysis — that apply across industries. The key is reframing your experience through the lens of your target role.",
      "Step 1: Identify the overlap. Read 10 job descriptions for your target role and highlight every skill or qualification that matches something in your background. You'll likely find 60-70% overlap. That overlap becomes the foundation of your pivot story.",
      "Step 2: Rewrite your resume for the new audience. Instead of 'Managed a team of 8 accountants', write 'Led a cross-functional team of 8, delivering projects on schedule and within budget.' The achievement is the same — the framing speaks to the new industry.",
      "Step 3: Fill the gaps. If you're missing a key skill (e.g., a coding language, a certification, or domain knowledge), close the gap quickly. Online certifications from Google, AWS, or Coursera carry real weight. Side projects demonstrate practical ability. Freelance or volunteer work provides experience you can reference.",
      "Step 4: Control the narrative. Your career change is a strength, not a weakness. Companies value diverse perspectives and cross-industry experience. Frame your transition as intentional and strategic: 'After 6 years in finance, I'm leveraging my data analysis expertise to transition into product analytics, where I can combine quantitative rigor with user experience impact.'",
    ],
  },
  {
    icon: Shield,
    title: "Interview Preparation Guide",
    summary: "How to prepare for behavioral, technical, and case interviews with structured frameworks.",
    accent: "bg-rose-50 text-rose-700",
    content: [
      "Interview preparation is not about memorizing answers — it's about building a library of stories you can adapt to any question. Start by creating a 'story bank' of 8-10 significant professional experiences that demonstrate impact, leadership, problem-solving, teamwork, and overcoming challenges.",
      "For behavioral questions, use the STAR method: Situation (set the context in 1-2 sentences), Task (your specific responsibility), Action (what you did — be specific about YOUR contribution), Result (quantified outcome). Practice telling each story in under 2 minutes.",
      "For technical interviews (common in engineering, data science, and product roles), practice out loud. It's not enough to solve problems on paper — interviewers evaluate your thought process, communication, and how you handle being stuck. Explain your thinking, discuss tradeoffs, and test edge cases.",
      "The most underrated interview strategy is asking great questions. Research the company thoroughly — read recent press releases, the team's blog posts, and the CEO's latest interviews. Then ask targeted questions: 'I noticed the team recently launched [feature]. What's the team's approach to measuring success for new features?' This shows genuine interest and strategic thinking.",
      "Finally, always send a thank-you email within 24 hours. Reference something specific from the conversation: 'I particularly enjoyed our discussion about [topic]. It reinforced my excitement about the role because [reason].' Keep it to 3-4 sentences — thoughtful, not lengthy.",
    ],
  },
];

function GuideCard({ guide, index }: { guide: Guide; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = guide.icon;

  return (
    <AnimateIn variant="fade-up" delay={index * 80}>
      <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow overflow-hidden">
        <button onClick={() => setOpen(!open)} className="w-full text-left p-7 flex items-start gap-5">
          <div className={`w-12 h-12 rounded-xl ${guide.accent.split(" ")[0]} flex items-center justify-center shrink-0 mt-0.5`}>
            <Icon size={24} className={guide.accent.split(" ")[1]} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">{guide.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{guide.summary}</p>
          </div>
          <div className="text-gray-400 shrink-0 mt-1">
            {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>

        {open && (
          <div className="px-7 pb-7 pt-0 border-t border-gray-50">
            <div className="pt-5 space-y-4">
              {guide.content.map((para, i) => {
                const parts = para.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="font-semibold text-gray-800">{part}</strong>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AnimateIn>
  );
}

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#f5f7fa] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <AnimateIn variant="fade-up">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">
                Career Guides
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Your complete career toolkit
              </h1>
              <p className="mt-5 text-gray-500 text-lg max-w-2xl mx-auto">
                In-depth guides written by career experts covering everything from ATS optimization to salary negotiation.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Guides */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-6 space-y-5">
            {guides.map((guide, i) => (
              <GuideCard key={guide.title} guide={guide} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 px-6">
          <AnimateIn variant="zoom" duration={800}>
            <div className="max-w-4xl mx-auto bg-teal-800 rounded-3xl px-8 py-16 sm:px-14 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Put your knowledge to the test
              </h2>
              <p className="text-teal-200 text-sm max-w-md mx-auto mb-8">
                Apply what you have learned — upload your resume for an instant AI score and personalized improvement plan.
              </p>
              <Link
                href="/resume/upload"
                className="inline-flex items-center gap-2 bg-white text-teal-800 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-teal-50 transition-colors"
              >
                Analyze My Resume <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateIn>
        </section>
      </main>
      <Footer />
    </>
  );
}
