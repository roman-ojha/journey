from fastapi import APIRouter
from models.vehicle import Vehicle
from bson import ObjectId
import pprint
from database.repository import repository


router = APIRouter()
printer = pprint.PrettyPrinter()

# Get all vehicles


@router.get("/vehicles")
async def get_vehicles():
    vehicles = repository.get_vehicles()
    return list(vehicles)
