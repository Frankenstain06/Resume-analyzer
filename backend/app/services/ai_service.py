class AIService:
    """Handles AI-powered resume analysis using OpenAI or other providers."""

    async def analyze_resume(self, resume_text: str) -> dict:
        # TODO: Send resume text to AI, parse response
        pass

    async def score_resume(self, resume_text: str) -> float:
        # TODO: Generate overall score
        pass

    async def extract_keywords(self, resume_text: str) -> list[str]:
        # TODO: Extract relevant keywords
        pass

    async def generate_suggestions(self, resume_text: str) -> list[str]:
        # TODO: Generate improvement suggestions
        pass
