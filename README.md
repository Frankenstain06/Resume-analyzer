# MyReazr — AI-Powered Resume Analyzer

A full-stack application with **Next.js** frontend and **FastAPI** backend for AI-powered resume analysis with user authentication, ATS scoring, and more.

---

## Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | Next.js 16, React 19, Tailwind CSS 4, shadcn/ui    |
| Backend    | Python, FastAPI, SQLAlchemy (async), Alembic        |
| Database   | PostgreSQL 16                                       |
| Auth       | JWT (python-jose), bcrypt (passlib)                 |
| Infra      | Docker Compose, Nginx, Redis                        |

---

## Project Structure

```
my-reazr/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/             # Route handlers (auth, dashboard, resume, payment)
│   │   ├── core/            # Config, database, security utilities
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── services/        # Business logic layer
│   │   ├── dependencies.py  # FastAPI dependency injection (auth)
│   │   └── main.py          # App entry point with CORS
│   ├── alembic/             # Database migrations
│   ├── requirements.txt
│   └── .env                 # Environment variables
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── app/             # Pages (login, register, dashboard)
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React context (AuthContext)
│   │   ├── services/        # API client and auth service
│   │   ├── types/           # TypeScript interfaces
│   │   └── lib/             # Utilities
│   ├── .env.local           # Frontend env vars
│   └── package.json
├── docker-compose.yml       # Full-stack Docker setup
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 16 (or use Docker)
- **Redis** (optional, for background tasks)

---

### Option 1: Run with Docker (Recommended)

```bash
# Clone the repo
git clone <repo-url> && cd my-reazr

# Start all services (frontend, backend, database, redis, nginx)
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

### Option 2: Run Locally

#### 1. Start PostgreSQL

Make sure PostgreSQL is running. Create the database:

```sql
CREATE DATABASE resume_db;
CREATE USER "user" WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE resume_db TO "user";
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate    # macOS/Linux
# venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment (edit .env with your DB credentials)
cp .env.example .env

# Run database migrations
alembic upgrade head

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```

Backend runs at: http://localhost:8000  
Swagger docs at: http://localhost:8000/docs

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Frontend runs at: http://localhost:3000

---

## API Endpoints

### Authentication

| Method | Endpoint              | Description             | Auth Required |
|--------|-----------------------|-------------------------|---------------|
| POST   | `/api/auth/register`  | Register a new user     | No            |
| POST   | `/api/auth/login`     | Login & get JWT token   | No            |
| GET    | `/api/auth/me`        | Get current user profile| Yes (Bearer)  |

### Dashboard (Protected)

| Method | Endpoint              | Description             | Auth Required |
|--------|-----------------------|-------------------------|---------------|
| GET    | `/api/dashboard/`     | Get dashboard data      | Yes (Bearer)  |
| GET    | `/api/dashboard/stats`| Get user statistics     | Yes (Bearer)  |

### Request Examples

**Register:**
```json
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "MyPassword1",
  "full_name": "John Doe"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "MyPassword1"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

---

## Database Schema

### Users Table

| Column          | Type         | Constraints              |
|-----------------|--------------|--------------------------|
| id              | UUID         | Primary Key, auto-generated |
| email           | VARCHAR      | Unique, Not Null, Indexed |
| hashed_password | VARCHAR      | Not Null                 |
| full_name       | VARCHAR      | Nullable                 |
| is_active       | BOOLEAN      | Default: true            |
| tier            | VARCHAR      | Default: "free"          |
| created_at      | TIMESTAMP    | Auto-set on creation     |
| updated_at      | TIMESTAMP    | Auto-updated             |

---

## Authentication Flow

1. **Register/Login** → Backend validates credentials → Returns JWT token
2. **Frontend** stores token in `localStorage`
3. **Protected requests** include `Authorization: Bearer <token>` header
4. **Backend** decodes JWT, extracts user ID, fetches user from DB
5. **Token expiry** is configurable (default: 30 minutes)

---

## Environment Variables

### Backend (`backend/.env`)

| Variable                    | Description                      | Default                              |
|-----------------------------|----------------------------------|--------------------------------------|
| `DATABASE_URL`              | PostgreSQL connection string     | `postgresql+asyncpg://...`           |
| `SECRET_KEY`                | JWT signing secret               | Change in production!                |
| `ACCESS_TOKEN_EXPIRE_MINUTES`| Token validity duration         | `30`                                 |
| `ALLOWED_ORIGINS`           | CORS allowed origins             | `["http://localhost:3000"]`          |
| `DEBUG`                     | Enable debug mode                | `False`                              |

### Frontend (`frontend/.env.local`)

| Variable              | Description            | Default                    |
|-----------------------|------------------------|----------------------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL   | `http://localhost:8000`    |

---

## License

MIT
