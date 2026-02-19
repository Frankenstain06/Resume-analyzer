from app.core.security import hash_password, verify_password, create_access_token


class AuthService:
    """Handles user registration, login, and token management."""

    async def register(self, email: str, password: str, full_name: str | None = None):
        # TODO: Check if user exists, create user, return token
        pass

    async def login(self, email: str, password: str):
        # TODO: Verify credentials, return token
        pass

    async def get_current_user(self, token: str):
        # TODO: Decode token, fetch user
        pass
