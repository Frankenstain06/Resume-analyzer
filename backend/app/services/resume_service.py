"""
Resume Service
Handles file upload, text extraction, CRUD operations, and analysis orchestration.
"""

import os
import uuid
from pathlib import Path

from fastapi import UploadFile, HTTPException, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.resume import Resume
from app.models.analysis import Analysis
from app.services.ai_service import AIService

# Upload directory (auto-created)
UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".docx", ".doc", ".txt"}


class ResumeService:
    """Handles resume upload, parsing, analysis, and retrieval."""

    def __init__(self, db: AsyncSession):
        self.db = db
        self.ai = AIService()

    # ── Upload + analyse ─────────────────────────────────────────────────
    async def upload_and_analyze(self, file: UploadFile, user_id: uuid.UUID) -> dict:
        """Upload a resume file, extract text, run analysis, and store results."""
        filename = file.filename or "resume"
        ext = Path(filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Unsupported file type '{ext}'. Allowed: {', '.join(ALLOWED_EXTENSIONS)}",
            )

        # Save file to disk
        file_id = uuid.uuid4()
        safe_name = f"{file_id}{ext}"
        file_path = UPLOAD_DIR / safe_name
        content = await file.read()
        file_path.write_bytes(content)

        # Extract text
        raw_text = self._extract_text(file_path, ext)
        if not raw_text or len(raw_text.strip()) < 20:
            file_path.unlink(missing_ok=True)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not extract meaningful text from the file. Please upload a valid resume.",
            )

        # Create resume record
        resume = Resume(
            id=file_id,
            user_id=user_id,
            filename=filename,
            file_path=str(file_path),
            raw_text=raw_text,
            status="processing",
        )
        self.db.add(resume)
        await self.db.flush()

        # Run AI analysis
        result = await self.ai.analyze_resume(raw_text)

        # Store analysis
        analysis = Analysis(
            resume_id=resume.id,
            overall_score=result["overall_score"],
            sections=result["sections"],
            suggestions=result["suggestions"],
            keywords=result["keywords"],
        )
        self.db.add(analysis)
        resume.status = "analyzed"
        await self.db.flush()

        return {
            "resume_id": str(resume.id),
            "analysis_id": str(analysis.id),
            "filename": filename,
            "overall_score": result["overall_score"],
            "status": "analyzed",
        }

    # ── Text extraction ──────────────────────────────────────────────────
    def _extract_text(self, file_path: Path, ext: str) -> str:
        try:
            if ext == ".pdf":
                return self._extract_pdf(file_path)
            elif ext in (".docx", ".doc"):
                return self._extract_docx(file_path)
            elif ext == ".txt":
                return file_path.read_text(encoding="utf-8", errors="ignore")
            return ""
        except Exception:
            return ""

    def _extract_pdf(self, path: Path) -> str:
        from PyPDF2 import PdfReader
        reader = PdfReader(str(path))
        return "\n".join(page.extract_text() or "" for page in reader.pages)

    def _extract_docx(self, path: Path) -> str:
        from docx import Document
        doc = Document(str(path))
        return "\n".join(p.text for p in doc.paragraphs if p.text.strip())

    # ── Read operations ──────────────────────────────────────────────────
    async def get_resume_with_analysis(self, resume_id: str, user_id: uuid.UUID) -> dict:
        """Get a resume and its analysis by ID, ensuring ownership."""
        rid = uuid.UUID(resume_id)
        result = await self.db.execute(select(Resume).where(Resume.id == rid))
        resume = result.scalar_one_or_none()
        if not resume:
            raise HTTPException(status_code=404, detail="Resume not found.")
        if resume.user_id != user_id:
            raise HTTPException(status_code=403, detail="Access denied.")

        result = await self.db.execute(select(Analysis).where(Analysis.resume_id == rid))
        analysis = result.scalar_one_or_none()

        return {
            "resume": {
                "id": str(resume.id),
                "filename": resume.filename,
                "status": resume.status,
                "created_at": resume.created_at.isoformat(),
                "raw_text": resume.raw_text,
            },
            "analysis": {
                "id": str(analysis.id),
                "overall_score": analysis.overall_score,
                "sections": analysis.sections,
                "suggestions": analysis.suggestions,
                "keywords": analysis.keywords,
                "created_at": analysis.created_at.isoformat(),
            } if analysis else None,
        }

    async def list_user_resumes(self, user_id: uuid.UUID) -> list[dict]:
        """List all resumes for a user with their scores."""
        result = await self.db.execute(
            select(Resume, Analysis.overall_score)
            .outerjoin(Analysis, Resume.id == Analysis.resume_id)
            .where(Resume.user_id == user_id)
            .order_by(Resume.created_at.desc())
        )
        rows = result.all()
        return [
            {
                "id": str(row[0].id),
                "filename": row[0].filename,
                "status": row[0].status,
                "overall_score": row[1],
                "created_at": row[0].created_at.isoformat(),
            }
            for row in rows
        ]

    async def get_user_stats(self, user_id: uuid.UUID) -> dict:
        """Get aggregated stats for a user."""
        result = await self.db.execute(
            select(
                func.count(Resume.id),
                func.avg(Analysis.overall_score),
            )
            .outerjoin(Analysis, Resume.id == Analysis.resume_id)
            .where(Resume.user_id == user_id)
        )
        row = result.one()
        return {
            "resumes_analyzed": row[0] or 0,
            "average_score": round(float(row[1]), 1) if row[1] else None,
        }
