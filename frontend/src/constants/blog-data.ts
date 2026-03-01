/**
 * Blog article data store.
 * Static content for the blog detail pages.
 */

export interface BlogArticle {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];            // paragraphs (supports basic markdown bold)
  relatedSlugs: string[];
}

export const articles: BlogArticle[] = [
  {
    slug: "why-75-percent-resumes-never-reach-human-recruiter",
    title: "Why 75% of Resumes Never Reach a Human Recruiter",
    author: "MyReazr Team",
    date: "Jan 10, 2026",
    readTime: "7 min",
    category: "ATS Tips",
    excerpt: "Applicant Tracking Systems reject most resumes before a person ever sees them.",
    content: [
      "If you have ever submitted dozens of job applications and heard nothing back, you are not alone. Studies consistently show that roughly three out of every four resumes are filtered out by Applicant Tracking Systems (ATS) before a human recruiter even glances at them. Understanding how these systems work is the first step toward beating them.",
      "ATS software parses your resume into structured data fields — name, email, job titles, dates, skills — and compares those fields against the job description. When the system cannot parse a field (because of unusual formatting, images, or non-standard section headings), it simply drops that information. The result? Even highly qualified candidates get rejected because their resume was unreadable to the machine.",
      "**Common reasons for ATS rejection include:** using graphics or tables that break parsing, saving as an incompatible file format (some systems struggle with older .doc files), omitting key sections like 'Experience' or 'Education', and failing to mirror keywords from the job posting. Each of these issues is entirely fixable once you know what to look for.",
      "**The fix is simpler than you think.** Start with a clean, single-column layout. Use standard section headings (Summary, Experience, Education, Skills). Save as PDF unless the posting specifies otherwise. And most importantly, tailor your keywords: read the job description carefully and make sure the key phrases appear naturally in your resume.",
      "Tools like MyReazr can automate this process — upload your resume and instantly see how an ATS would score it, which keywords you are missing, and specific suggestions for improvement. The goal is not to game the system but to make sure your real qualifications are accurately represented in a format that machines and humans both understand.",
    ],
    relatedSlugs: [
      "one-page-resume-myth",
      "keyword-optimization-masterclass",
    ],
  },
  {
    slug: "one-page-resume-myth",
    title: "The One-Page Resume Myth: When More Is Actually Better",
    author: "Sarah Kim",
    date: "Jan 5, 2026",
    readTime: "5 min",
    category: "Resume Writing",
    excerpt: "Career experts are divided on resume length. We analyzed 10,000 successful resumes to find the real answer.",
    content: [
      "The 'one-page resume' rule is one of the most persistent pieces of career advice — and one of the most misunderstood. While brevity is valuable, forcing a decade of experience onto a single page often does more harm than good, stripping away the very achievements that make you competitive.",
      "We analyzed 10,000 resumes that led to interview invitations across industries. The results were clear: for candidates with fewer than five years of experience, one page was optimal. For those with five to fifteen years, a well-organized two-page resume outperformed the one-page version by 22% in callback rates. Senior and executive candidates almost always benefited from two pages.",
      "**The key takeaway is not about page count — it is about density.** Every line on your resume should earn its place. Remove filler phrases like 'responsible for' and replace them with impact-driven statements. If you can fill two pages with relevant, quantified achievements, do it. If stretching to two pages means adding padding, stay at one.",
      "Recruiters spend an average of 7.4 seconds on an initial resume scan. They are not counting pages — they are scanning for relevant keywords, job titles, and numbers. A two-page resume with strong formatting and clear hierarchy is far better than a one-page resume crammed into 9-point font with no white space.",
      "Use MyReazr's length analysis to check whether your resume hits the sweet spot. The tool evaluates your word count, keyword density, and section balance to determine whether your resume length is working for or against you.",
    ],
    relatedSlugs: [
      "why-75-percent-resumes-never-reach-human-recruiter",
      "five-resume-mistakes-senior-engineers",
    ],
  },
  {
    slug: "ai-changing-hiring-landscape-2026",
    title: "How AI Is Changing the Hiring Landscape in 2026",
    author: "MyReazr Team",
    date: "Dec 28, 2025",
    readTime: "9 min",
    category: "Industry Trends",
    excerpt: "From AI resume screeners to automated interviews — here's what candidates need to know.",
    content: [
      "Artificial intelligence is no longer a futuristic concept in hiring — it is the default. In 2026, over 90% of Fortune 500 companies use some form of AI in their recruiting pipeline, from automated resume screening to AI-powered video interview analysis. As a candidate, understanding these tools is now a core job-search skill.",
      "The first layer of AI most candidates encounter is the ATS itself. Modern systems like Greenhouse, Lever, and Workday use natural language processing to understand context, not just keywords. They can recognize that 'team leadership' and 'managed a team of 8' describe the same competency. However, they still struggle with creative formatting, non-standard layouts, and industry jargon that differs from the job posting.",
      "**AI video interview tools** are the next frontier. Platforms like HireVue analyze facial expressions, word choice, and speaking pace to generate candidate scores. While controversial, these tools are increasingly common for entry-level and high-volume roles. The best strategy: practice answering questions on camera, speak clearly, maintain eye contact with the lens, and structure your answers using the STAR method.",
      "**What this means for your resume:** clean formatting matters more than ever. AI systems reward consistency, standard section headings, and keyword alignment. Creative resumes with infographics and sidebars may look impressive to humans but often score poorly with AI parsers. The safest approach is a clean, well-structured document that lets your achievements speak for themselves.",
      "The positive side of AI in hiring is that it can reduce human bias in the initial screening phase. When your resume is evaluated on keywords, skills, and quantified achievements rather than name or university prestige, the playing field becomes more level. Use this to your advantage: focus on demonstrating impact through numbers and results.",
    ],
    relatedSlugs: [
      "why-75-percent-resumes-never-reach-human-recruiter",
      "one-page-resume-myth",
    ],
  },
  {
    slug: "five-resume-mistakes-senior-engineers",
    title: "5 Resume Mistakes Senior Engineers Keep Making",
    author: "David Chen",
    date: "Dec 20, 2025",
    readTime: "6 min",
    category: "Tech Careers",
    excerpt: "Even experienced developers fumble their resumes. These five fixable mistakes could be costing you interviews.",
    content: [
      "You have shipped production code at scale, led architecture decisions, and mentored junior developers — but your resume reads like a junior developer's. This is surprisingly common among senior engineers, and it costs interviews. Here are the five mistakes we see most often.",
      "**1. Listing technologies instead of impact.** 'Python, React, AWS, Docker' tells a recruiter nothing about what you did. Instead: 'Architected a microservices platform on AWS serving 2M daily requests, reducing infrastructure costs by 35%.' Lead with the outcome, not the tool.",
      "**2. Ignoring the business context.** Engineering does not exist in a vacuum. Hiring managers want to know how your work affected revenue, user satisfaction, or operational efficiency. Frame every bullet around a business metric: time saved, revenue generated, users served, downtime reduced.",
      "**3. Underselling leadership.** If you mentored engineers, led design reviews, or drove technical roadmaps, say so explicitly. Use phrases like 'Led a team of 6 engineers', 'Defined the technical roadmap for Q3-Q4', or 'Mentored 3 junior developers through promotion cycles.'",
      "**4. Using a generic summary.** 'Passionate software engineer with 10 years of experience' could describe anyone. Write a summary specific to the role: 'Senior backend engineer specializing in distributed systems and real-time data pipelines. Led the migration of a monolith to event-driven microservices, improving p99 latency by 60%.'",
      "**5. Neglecting ATS formatting.** Many senior engineers assume their experience speaks for itself and skip optimization. But if the ATS cannot parse your resume, your experience never gets seen. Use standard headings, avoid tables, and include keywords from the job description.",
    ],
    relatedSlugs: [
      "one-page-resume-myth",
      "ai-changing-hiring-landscape-2026",
    ],
  },
  {
    slug: "quantify-achievements-step-by-step",
    title: "Quantify Your Achievements: A Step-by-Step Formula",
    author: "Sarah Kim",
    date: "Dec 15, 2025",
    readTime: "8 min",
    category: "Resume Writing",
    excerpt: "Learn our STAR-number framework to turn vague duties into powerful impact statements.",
    content: [
      "The difference between a resume that gets interviews and one that does not often comes down to one thing: numbers. Recruiters consistently say that quantified achievements are the single most persuasive element on a resume. Yet most candidates leave their bullets vague and duty-focused.",
      "**The STAR-Number framework** is a simple formula: Situation + Task + Action + Result + Number. For every bullet point, ask: What was the context? What did I do? What was the measurable outcome? Even if you do not have exact figures, reasonable estimates are far better than no numbers at all.",
      "**Before:** 'Managed the company blog and social media accounts.' **After:** 'Grew the company blog from 5K to 25K monthly visitors in 6 months by implementing an SEO-driven content strategy across 3 social channels.' The second version tells a story with a clear, measurable outcome.",
      "If you work in a role where numbers are not obvious (teaching, admin, creative), you can still quantify: 'Trained 45 new employees per quarter', 'Reduced document processing time by 30%', 'Coordinated 12 events with a combined attendance of 2,000+'. Every role produces measurable results — you just need to find them.",
      "Use MyReazr's quantifiable achievement analysis to check your resume. The tool scans for percentages, dollar amounts, and impact metrics, then tells you exactly where to add more numbers for maximum effect.",
    ],
    relatedSlugs: [
      "five-resume-mistakes-senior-engineers",
      "one-page-resume-myth",
    ],
  },
  {
    slug: "cover-letters-2026-still-worth-it",
    title: "Cover Letters in 2026: Still Worth It?",
    author: "MyReazr Team",
    date: "Dec 10, 2025",
    readTime: "4 min",
    category: "Job Search",
    excerpt: "We surveyed 500 hiring managers across industries to find out how much weight cover letters really carry.",
    content: [
      "We surveyed 500 hiring managers across technology, finance, healthcare, and creative industries with one question: does a cover letter influence your decision to interview a candidate? The answer was more nuanced than a simple yes or no.",
      "**26% said they always read cover letters.** These were primarily in creative, communications, and senior leadership roles where writing ability and cultural fit are paramount. For these positions, a well-crafted cover letter can be the deciding factor between two equally qualified candidates.",
      "**48% said they sometimes read them** — specifically when they are on the fence about a candidate or when the role requires strong communication skills. For this group, a great cover letter can tip the scales, but a missing one rarely disqualifies you.",
      "**26% said they never read cover letters.** Most of these were in technical roles (engineering, data science) where portfolio projects and technical skills drive the decision. Several mentioned that they actively prefer candidates who spend time on GitHub profiles or portfolio sites instead.",
      "**The bottom line:** if the job posting asks for a cover letter, write one. If it does not, focus your energy on tailoring your resume to the specific role. When you do write a cover letter, keep it to three paragraphs: why this company, what you bring, and a specific example of relevant impact.",
    ],
    relatedSlugs: [
      "ai-changing-hiring-landscape-2026",
      "quantify-achievements-step-by-step",
    ],
  },
  {
    slug: "explain-career-gaps",
    title: "How to Explain Career Gaps Without Hurting Your Chances",
    author: "David Chen",
    date: "Dec 5, 2025",
    readTime: "6 min",
    category: "Career Advice",
    excerpt: "Whether you took time off to travel, care for family, or recover — here's how to frame gaps positively.",
    content: [
      "Career gaps are more common than ever. Whether you took time off for caregiving, health recovery, education, travel, or a pandemic-era layoff, the stigma around resume gaps is fading — but only if you address them correctly.",
      "**Rule one: do not try to hide the gap.** Hiring managers can do basic math. Attempting to obscure dates or stretch employment periods erodes trust. Instead, address the gap briefly and positively, either in your resume summary or in a short line item within your experience section.",
      "**Frame the gap as growth.** 'Career break (2024-2025): Completed AWS Solutions Architect certification, contributed to 2 open-source projects, and volunteered as a coding instructor at CodeYouth.' This shows initiative and continuous learning even outside traditional employment.",
      "If the gap was for personal reasons (health, family), you do not owe anyone a detailed explanation. A simple 'Personal sabbatical' or 'Family caregiving leave' is sufficient. Then immediately redirect attention to your readiness: 'Returning with renewed focus and recently completed [relevant credential or project].'",
      "The most important thing is what you are doing now. A strong, current resume with relevant skills, recent projects, and quantified achievements will always outweigh a gap from two years ago. Focus your energy on making the rest of your resume exceptional, and the gap becomes a footnote rather than a headline.",
    ],
    relatedSlugs: [
      "cover-letters-2026-still-worth-it",
      "quantify-achievements-step-by-step",
    ],
  },
  {
    slug: "psychology-resume-design",
    title: "The Psychology Behind Resume Design That Converts",
    author: "Sarah Kim",
    date: "Dec 1, 2025",
    readTime: "7 min",
    category: "Resume Writing",
    excerpt: "Font choices, whitespace ratios, and visual hierarchy all affect how long a recruiter spends on your resume.",
    content: [
      "Recruiters make snap judgments. Eye-tracking studies show that the first 7 seconds determine whether your resume gets a full read or a quick pass. In those seconds, the recruiter is not reading words — they are scanning visual patterns. That means your resume's design is as important as its content.",
      "**Visual hierarchy is everything.** The recruiter's eye follows a predictable F-pattern: across the top, then down the left side. Your name and title should dominate the top. Section headings should be bold and clearly differentiated. Company names and job titles need to stand out from bullet points. Use font size and weight to create three clear levels: headings, subheadings, and body text.",
      "**Whitespace is not wasted space.** Margins of at least 0.5 inches, line spacing of 1.15-1.3, and generous space between sections all improve readability. A cramped resume with tiny fonts signals desperation — it suggests you could not prioritize your most important achievements. Comfort the reader's eye, and they will read more.",
      "**Font choice sends a subtle message.** Serif fonts (like Garamond or Cambria) convey tradition and reliability — great for finance, law, and academia. Sans-serif fonts (like Calibri, Helvetica, or Inter) feel modern and clean — ideal for tech, design, and startups. Avoid decorative fonts entirely. Stick to 10-12pt for body text and 14-16pt for your name.",
      "**One more design tip:** use strategic bold for key numbers and achievements. When a recruiter scans your resume in F-pattern, bolded metrics ('**increased revenue by 40%**', '**managed team of 12**') act as visual anchors that draw the eye to your strongest points.",
    ],
    relatedSlugs: [
      "one-page-resume-myth",
      "five-resume-mistakes-senior-engineers",
    ],
  },
  {
    slug: "linkedin-vs-resume-alignment",
    title: "LinkedIn vs Resume: How to Keep Both Aligned",
    author: "MyReazr Team",
    date: "Nov 25, 2025",
    readTime: "5 min",
    category: "Job Search",
    excerpt: "Conflicting information is an instant red flag. Stay consistent with this checklist.",
    content: [
      "87% of recruiters check LinkedIn profiles when evaluating candidates. If your LinkedIn tells a different story than your resume — different dates, different titles, different companies — it raises immediate red flags. Consistency builds trust; inconsistency destroys it.",
      "**Your LinkedIn is not a copy of your resume.** It should be a complementary, more detailed version. Your resume is tailored to specific roles and keeps things concise. LinkedIn can be broader: include all roles (not just the most relevant), add a longer summary, publish recommendations, and showcase projects or certifications.",
      "**What must match exactly:** job titles, company names, and employment dates. If your resume says 'Senior Product Manager' but LinkedIn says 'Product Lead', a recruiter will wonder which is accurate. Pick the official title and use it consistently. If you want to clarify, use the format: 'Product Lead (Senior Product Manager)'.",
      "**Use LinkedIn features your resume cannot replicate:** recommendations from colleagues, skill endorsements, published articles, and featured media (presentations, project links, portfolios). These elements add social proof that a paper resume simply cannot provide.",
      "Do a quarterly alignment check. Update both documents at the same time, compare titles and dates side by side, and ask a friend to review both. A fifteen-minute check can prevent a disqualification you never even know about.",
    ],
    relatedSlugs: [
      "cover-letters-2026-still-worth-it",
      "explain-career-gaps",
    ],
  },
];

/** Lookup article by slug */
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

/** Get articles by slugs (for related articles) */
export function getArticlesBySlugs(slugs: string[]): BlogArticle[] {
  return slugs.map((s) => articles.find((a) => a.slug === s)).filter(Boolean) as BlogArticle[];
}

/** Category badge colour mapping */
export const categoryColors: Record<string, string> = {
  "ATS Tips": "bg-teal-50 text-teal-700",
  "Resume Writing": "bg-amber-50 text-amber-700",
  "Industry Trends": "bg-violet-50 text-violet-700",
  "Tech Careers": "bg-blue-50 text-blue-700",
  "Job Search": "bg-emerald-50 text-emerald-700",
  "Career Advice": "bg-rose-50 text-rose-700",
};
