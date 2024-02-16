from fastapi import APIRouter
from models.vehicle import Vehicle
from bson import ObjectId
import pprint
from database.repository import repository


router = APIRouter()
printer = pprint.PrettyPrinter()

# Get all vehicles


@router.get("/explore")
async def get_travel_vehicles():
    vehicles = repository.get_vehicles()
    return vehicles
