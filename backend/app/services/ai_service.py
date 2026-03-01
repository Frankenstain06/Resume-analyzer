"""
AI Resume Analysis Service
Rule-based resume analyzer that scores resumes across multiple dimensions.
No external API dependency — runs entirely locally.
"""

import re
from typing import Any


# ── Strong action verbs ──────────────────────────────────────────────────────
ACTION_VERBS = {
    "achieved", "administered", "analyzed", "architected", "automated",
    "built", "collaborated", "conducted", "consolidated", "coordinated",
    "created", "decreased", "delivered", "designed", "developed",
    "directed", "drove", "eliminated", "engineered", "established",
    "exceeded", "expanded", "facilitated", "founded", "generated",
    "grew", "headed", "identified", "implemented", "improved",
    "increased", "initiated", "innovated", "integrated", "introduced",
    "launched", "led", "managed", "mentored", "migrated",
    "negotiated", "optimized", "orchestrated", "organized", "oversaw",
    "pioneered", "planned", "produced", "programmed", "published",
    "raised", "reduced", "redesigned", "refactored", "resolved",
    "revamped", "saved", "scaled", "secured", "simplified",
    "spearheaded", "streamlined", "strengthened", "supervised",
    "surpassed", "transformed", "upgraded", "utilized",
}

# ── Section-heading patterns ─────────────────────────────────────────────────
SECTION_PATTERNS = {
    "contact": r"(?i)(contact|phone|email|address|linkedin|github|portfolio)",
    "summary": r"(?i)(summary|objective|profile|about\s*me|professional\s*summary)",
    "experience": r"(?i)(experience|employment|work\s*history|professional\s*experience)",
    "education": r"(?i)(education|academic|university|college|degree|certification)",
    "skills": r"(?i)(skills|technologies|technical\s*skills|competencies|proficiencies)",
    "projects": r"(?i)(projects|portfolio|personal\s*projects|key\s*projects)",
    "certifications": r"(?i)(certifications?|licenses?|credentials)",
    "awards": r"(?i)(awards?|honors?|achievements?|recognition)",
    "languages": r"(?i)(languages?|fluency|proficiency)",
    "volunteer": r"(?i)(volunteer|community|extracurricular)",
}

# ── ATS keyword pools ────────────────────────────────────────────────────────
ATS_KEYWORDS: dict[str, list[str]] = {
    "soft_skills": [
        "leadership", "communication", "teamwork", "problem-solving",
        "critical thinking", "adaptability", "time management",
        "collaboration", "decision-making", "analytical",
    ],
    "technical": [
        "python", "javascript", "typescript", "react", "node",
        "sql", "aws", "docker", "kubernetes", "git",
        "agile", "scrum", "ci/cd", "rest", "api",
        "machine learning", "data analysis", "cloud",
    ],
    "business": [
        "strategy", "revenue", "budget", "stakeholder",
        "cross-functional", "roi", "kpi", "metrics",
        "project management", "business development",
    ],
}


class AIService:
    """Rule-based resume analysis engine."""

    # ── public entry point ───────────────────────────────────────────────
    async def analyze_resume(self, resume_text: str) -> dict[str, Any]:
        """Run a full analysis on resume text and return structured results."""
        text = resume_text.strip()
        if not text:
            return self._empty_result()

        contact = self._analyze_contact(text)
        sections = self._analyze_sections(text)
        length = self._analyze_length(text)
        action_verbs = self._analyze_action_verbs(text)
        quantifiable = self._analyze_quantifiable(text)
        keywords = self._extract_keywords(text)
        formatting = self._analyze_formatting(text)

        # weighted scoring
        weights = {
            "contact_info": 0.10,
            "sections": 0.20,
            "length": 0.10,
            "action_verbs": 0.15,
            "quantifiable_achievements": 0.20,
            "keyword_optimization": 0.15,
            "formatting": 0.10,
        }
        section_details = {
            "contact_info": {**contact, "weight": weights["contact_info"]},
            "sections": {**sections, "weight": weights["sections"]},
            "length": {**length, "weight": weights["length"]},
            "action_verbs": {**action_verbs, "weight": weights["action_verbs"]},
            "quantifiable_achievements": {**quantifiable, "weight": weights["quantifiable_achievements"]},
            "keyword_optimization": {**keywords, "weight": weights["keyword_optimization"]},
            "formatting": {**formatting, "weight": weights["formatting"]},
        }
        overall_score = round(
            sum(section_details[k]["score"] * weights[k] for k in weights), 1
        )
        suggestions = self._generate_suggestions(section_details)

        return {
            "overall_score": overall_score,
            "sections": section_details,
            "suggestions": suggestions,
            "keywords": keywords.get("found", []),
        }

    # ── individual analysers ─────────────────────────────────────────────
    def _analyze_contact(self, text: str) -> dict:
        found: list[str] = []
        missing: list[str] = []
        if re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", text):
            found.append("email")
        else:
            missing.append("email")
        if re.search(r"(\+?\d[\d\s\-().]{7,}\d)", text):
            found.append("phone")
        else:
            missing.append("phone")
        if re.search(r"(?i)linkedin\.com/in/", text):
            found.append("linkedin")
        else:
            missing.append("linkedin")
        if re.search(r"(?i)github\.com/", text):
            found.append("github")
        score = min(100, round((len(found) / 3) * 100))
        return {"score": score, "found": found, "missing": missing, "label": "Contact Information"}

    def _analyze_sections(self, text: str) -> dict:
        found: list[str] = []
        missing: list[str] = []
        essential = {"summary", "experience", "education", "skills"}
        for name, pattern in SECTION_PATTERNS.items():
            if re.search(pattern, text):
                found.append(name)
            elif name in essential:
                missing.append(name)
        essential_found = len(essential & set(found))
        bonus = min(len(found) - essential_found, 3) * 6.67 if len(found) > essential_found else 0
        score = min(100, round((essential_found / len(essential)) * 80 + bonus))
        return {"score": score, "found": found, "missing": missing, "label": "Resume Sections"}

    def _analyze_length(self, text: str) -> dict:
        words = len(text.split())
        if 300 <= words <= 800:
            score, feedback = 100, "Great length for a one-page resume."
        elif 200 <= words < 300:
            score, feedback = 70, "A bit short — consider adding more detail to your experience."
        elif 800 < words <= 1200:
            score, feedback = 80, "Slightly long — consider trimming to keep it concise."
        elif words < 200:
            score, feedback = 40, "Too short — your resume likely lacks sufficient detail."
        else:
            score, feedback = 60, "Very long — consider limiting to 1-2 pages."
        return {"score": score, "word_count": words, "feedback": feedback, "label": "Resume Length"}

    def _analyze_action_verbs(self, text: str) -> dict:
        words_lower = set(re.findall(r"[a-z]+", text.lower()))
        found = sorted(words_lower & ACTION_VERBS)
        count = len(found)
        if count >= 10:
            score = 100
        elif count >= 6:
            score = 80
        elif count >= 3:
            score = 60
        elif count >= 1:
            score = 40
        else:
            score = 15
        return {"score": score, "found": found, "count": count, "label": "Action Verbs"}

    def _analyze_quantifiable(self, text: str) -> dict:
        patterns = [
            (r"\d+\s*%", "percentage"),
            (r"\$[\d,]+\.?\d*", "dollar_amount"),
            (r"\b\d{1,3}(?:,\d{3})+\b", "large_number"),
            (r"(?i)(?:increased|decreased|reduced|improved|grew|saved|generated|raised)\s+(?:by\s+)?\d", "impact_metric"),
        ]
        found_types: set[str] = set()
        total = 0
        for pat, ptype in patterns:
            matches = re.findall(pat, text)
            if matches:
                found_types.add(ptype)
                total += len(matches)
        if total >= 8:
            score = 100
        elif total >= 5:
            score = 85
        elif total >= 3:
            score = 70
        elif total >= 1:
            score = 50
        else:
            score = 15
        return {"score": score, "match_count": total, "types_found": sorted(found_types), "label": "Quantifiable Achievements"}

    def _extract_keywords(self, text: str) -> dict:
        text_lower = text.lower()
        found: list[str] = []
        by_category: dict[str, list[str]] = {}
        for category, kws in ATS_KEYWORDS.items():
            cat_found = [kw for kw in kws if kw.lower() in text_lower]
            if cat_found:
                by_category[category] = cat_found
            found.extend(cat_found)
        total_possible = sum(len(v) for v in ATS_KEYWORDS.values())
        ratio = len(found) / total_possible if total_possible else 0
        if ratio >= 0.35:
            score = 100
        elif ratio >= 0.25:
            score = 85
        elif ratio >= 0.15:
            score = 70
        elif ratio >= 0.08:
            score = 50
        else:
            score = 25
        return {"score": score, "found": sorted(set(found)), "by_category": by_category, "label": "Keyword Optimization"}

    def _analyze_formatting(self, text: str) -> dict:
        issues: list[str] = []
        lines = text.split("\n")
        if len(re.findall(r"\n{4,}", text)) > 2:
            issues.append("Excessive blank lines detected — tighten spacing.")
        caps_lines = sum(1 for ln in lines if ln.strip() and ln.strip().isupper() and len(ln.strip()) > 20)
        if caps_lines > 5:
            issues.append("Too many ALL-CAPS lines — use title case for headings.")
        if sum(1 for ln in lines if len(ln) > 120) > 10:
            issues.append("Many lines exceed 120 characters — improve text wrapping.")
        if not re.search(r"^[\s]*[•\-\*\u2022]", text, re.MULTILINE):
            issues.append("No bullet points found — use bullets to improve readability.")
        score = max(20, 100 - len(issues) * 20)
        return {"score": score, "issues": issues, "label": "Formatting Quality"}

    # ── suggestions generator ────────────────────────────────────────────
    def _generate_suggestions(self, sections: dict) -> list[str]:
        suggestions: list[str] = []
        contact = sections.get("contact_info", {})
        if "linkedin" in contact.get("missing", []):
            suggestions.append("Add your LinkedIn profile URL — 80% of recruiters check LinkedIn before reaching out.")
        if "email" in contact.get("missing", []):
            suggestions.append("Include a professional email address at the top of your resume.")
        if "phone" in contact.get("missing", []):
            suggestions.append("Add a phone number so recruiters can contact you directly.")
        for m in sections.get("sections", {}).get("missing", []):
            suggestions.append(f"Add a '{m.title()}' section — ATS systems look for standard resume sections.")
        length_data = sections.get("length", {})
        if length_data.get("score", 100) < 70:
            suggestions.append(length_data.get("feedback", "Adjust your resume length."))
        if sections.get("action_verbs", {}).get("score", 100) < 70:
            suggestions.append("Use stronger action verbs like 'achieved', 'led', 'designed', 'optimized' to start your bullet points.")
        if sections.get("quantifiable_achievements", {}).get("score", 100) < 70:
            suggestions.append("Add more numbers and metrics — e.g., 'Increased sales by 25%' or 'Managed a team of 12'.")
        if sections.get("keyword_optimization", {}).get("score", 100) < 70:
            suggestions.append("Include more industry-relevant keywords from the job description to improve ATS matching.")
        for issue in sections.get("formatting", {}).get("issues", []):
            suggestions.append(issue)
        if not suggestions:
            suggestions.append("Excellent resume! Covers all major areas. Keep it updated regularly.")
        return suggestions

    def _empty_result(self) -> dict:
        return {
            "overall_score": 0,
            "sections": {},
            "suggestions": ["Could not extract text from your resume. Please upload a valid PDF or DOCX file."],
            "keywords": [],
        }
