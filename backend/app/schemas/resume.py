from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional


class ResumeUploadResponse(BaseModel):
    id: UUID
    filename: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class ResumeDetail(BaseModel):
    id: UUID
    filename: str
    status: str
    raw_text: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
