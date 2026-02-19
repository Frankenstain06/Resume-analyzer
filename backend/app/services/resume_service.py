from fastapi import UploadFile


class ResumeService:
    """Handles resume upload, parsing, and retrieval."""

    async def upload(self, file: UploadFile, user_id: str):
        # TODO: Save file, extract text, create DB record
        pass

    async def get_by_id(self, resume_id: str):
        # TODO: Fetch resume from DB
        pass

    async def list_by_user(self, user_id: str):
        # TODO: Fetch all resumes for a user
        pass
