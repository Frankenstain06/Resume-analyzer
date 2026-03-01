"""
Authentication Service
Handles user registration, login, and token management.
All database operations are async using SQLAlchemy.
"""

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserResponse, Token


class AuthService:
    """Handles user registration, login, and token management."""

    def __init__(self, db: AsyncSession):
        """Initialize with a database session dependency."""
        self.db = db

    async def register(self, user_data: UserCreate) -> Token:
        """
        Register a new user.
        - Checks if email is already taken
        - Hashes the password with bcrypt
        - Creates the user record
        - Returns a JWT access token
        """
        # Check if a user with this email already exists
        existing_user = await self.db.execute(
            select(User).where(User.email == user_data.email)
        )
        if existing_user.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email already exists.",
            )

        # Create the new user with a hashed password
        new_user = User(
            email=user_data.email,
            hashed_password=hash_password(user_data.password),
            full_name=user_data.full_name,
        )
        self.db.add(new_user)
        await self.db.flush()  # Flush to get the user ID before commit

        # Generate JWT token with user ID as the subject claim
        access_token = create_access_token(data={"sub": str(new_user.id)})
        return Token(access_token=access_token)

    async def login(self, user_data: UserLogin) -> Token:
        """
        Authenticate user credentials.
        - Looks up user by email
        - Verifies password against stored bcrypt hash
        - Returns a JWT access token on success
        """
        result = await self.db.execute(
            select(User).where(User.email == user_data.email)
        )
        user = result.scalar_one_or_none()

        # Verify user exists and password matches
        if not user or not verify_password(user_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password.",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Check if the account is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="This account has been deactivated.",
            )

        # Generate and return JWT token
        access_token = create_access_token(data={"sub": str(user.id)})
        return Token(access_token=access_token)

    async def get_user_by_id(self, user_id: str) -> User:
        """Fetch a user by their UUID. Used for token validation."""
        result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found.",
            )
        return user
