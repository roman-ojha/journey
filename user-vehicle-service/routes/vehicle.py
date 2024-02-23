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
    vehicles = repository.get_user_explore_vehicles()
    return vehicles


@router.get("/{vehicle_slug}")
async def get_vehicle(vehicle_slug):
    return repository.get_vehicle_by_slug(vehicle_slug=vehicle_slug)
