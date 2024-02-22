from fastapi import APIRouter
from routes.vehicle import router as user_router

router = APIRouter()
router.include_router(user_router, prefix="/api/user/vehicle", tags=["user"])
