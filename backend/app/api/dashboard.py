"""
Dashboard API Routes
Protected routes that require authentication.
Returns real resume stats from the database.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse
from app.services.resume_service import ResumeService

router = APIRouter()


@router.get("/", response_model=dict)
async def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get user dashboard data with resume stats and recent resumes."""
    service = ResumeService(db)
    stats = await service.get_user_stats(current_user.id)
    resumes = await service.list_user_resumes(current_user.id)
    return {
        "message": f"Welcome back, {current_user.full_name or current_user.email}!",
        "user": UserResponse.model_validate(current_user).model_dump(),
        "stats": stats,
        "recent_resumes": resumes[:5],
    }


@router.get("/stats", response_model=dict)
async def get_stats(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get user statistics and analytics."""
    service = ResumeService(db)
    stats = await service.get_user_stats(current_user.id)
    return {
        "user_id": str(current_user.id),
        "tier": current_user.tier,
        **stats,
    }
