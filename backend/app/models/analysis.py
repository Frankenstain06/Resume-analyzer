from sqlalchemy import Column, String, DateTime, ForeignKey, Float, JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from app.core.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    resume_id = Column(UUID(as_uuid=True), ForeignKey("resumes.id"), nullable=False)
    overall_score = Column(Float, nullable=True)
    sections = Column(JSON, nullable=True)  # Detailed section-by-section scores
    suggestions = Column(JSON, nullable=True)  # AI-generated improvement suggestions
    keywords = Column(JSON, nullable=True)  # Extracted keywords
    created_at = Column(DateTime, default=datetime.utcnow)
