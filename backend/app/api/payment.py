from fastapi import APIRouter, Depends

router = APIRouter()


@router.post("/create-checkout")
async def create_checkout():
    """Create a payment checkout session."""
    pass


@router.post("/webhook")
async def payment_webhook():
    """Handle payment provider webhook events."""
    pass
