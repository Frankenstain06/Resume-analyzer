from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional, Dict, List, Any


class AnalysisResponse(BaseModel):
    id: UUID
    resume_id: UUID
    overall_score: Optional[float]
    sections: Optional[Dict[str, Any]]
    suggestions: Optional[List[str]]
    keywords: Optional[List[str]]
    created_at: datetime

    class Config:
        from_attributes = True
