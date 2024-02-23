from fastapi import APIRouter
from routes.vehicle import router as user_router
from routes.place import router as place_router

router = APIRouter()
router.include_router(user_router, prefix="/api/user/vehicle", tags=["user"])
router.include_router(place_router, prefix="/api/user/place", tags=["place"])
