from fastapi import APIRouter
from database.repository import repository

router = APIRouter()


@router.get("/")
async def get_all_places():
    return repository.get_all_places()
