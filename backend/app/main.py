from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, resume, payment, dashboard
from app.core.config import settings

app = FastAPI(
    title="AI Resume Analyzer",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(resume.router, prefix="/api/resume", tags=["resume"])
app.include_router(payment.router, prefix="/api/payment", tags=["payment"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])


@app.get("/health")
async def health_check():
    return {"status": "ok"}
