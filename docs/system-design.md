# System Design — AI Resume Analyzer

## Overview
Full-stack AI-powered resume analysis platform.

## Architecture
- **Frontend**: Next.js 16 (App Router) with Tailwind CSS
- **Backend**: FastAPI (Python 3.12) with async SQLAlchemy
- **Database**: PostgreSQL 16
- **Cache/Queue**: Redis 7
- **AI**: OpenAI GPT API for resume analysis
- **Payments**: Stripe
- **Reverse Proxy**: Nginx

## Flow
1. User uploads resume (PDF/DOCX)
2. Backend parses text from document
3. Background worker sends text to AI for analysis
4. Results (score, suggestions, keywords) stored in DB
5. Frontend displays interactive analysis dashboard

## API Routes
| Method | Endpoint                     | Description               |
|--------|------------------------------|---------------------------|
| POST   | /api/auth/register           | Register new user         |
| POST   | /api/auth/login              | Login                     |
| POST   | /api/resume/upload           | Upload resume             |
| GET    | /api/resume/:id              | Get resume details        |
| GET    | /api/resume/:id/analysis     | Get analysis results      |
| GET    | /api/dashboard               | User dashboard data       |
| POST   | /api/payment/create-checkout | Start payment flow        |
| POST   | /api/payment/webhook         | Stripe webhook            |
