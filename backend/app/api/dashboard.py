from fastapi import APIRouter, Depends

router = APIRouter()


@router.get("/")
async def get_dashboard():
    """Get user dashboard data."""
    pass


@router.get("/stats")
async def get_stats():
    """Get user statistics and analytics."""
    pass
