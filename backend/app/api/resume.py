"""
Resume API Routes
Upload, analyse, and retrieve resumes.
All endpoints require authentication.
"""

from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.services.resume_service import ResumeService

router = APIRouter()


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Upload a resume (PDF / DOCX / TXT) for AI analysis."""
    service = ResumeService(db)
    return await service.upload_and_analyze(file, current_user.id)


@router.get("/")
async def list_resumes(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """List all resumes for the authenticated user."""
    service = ResumeService(db)
    resumes = await service.list_user_resumes(current_user.id)
    return {"resumes": resumes}


@router.get("/{resume_id}")
async def get_resume(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get resume details and analysis by ID."""
    service = ResumeService(db)
    return await service.get_resume_with_analysis(resume_id, current_user.id)


@router.get("/{resume_id}/analysis")
async def get_analysis(
    resume_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get just the AI analysis for a resume."""
    service = ResumeService(db)
    data = await service.get_resume_with_analysis(resume_id, current_user.id)
    return data.get("analysis")
