from fastapi import APIRouter
from database.repository import repository


router = APIRouter()

# Get all vehicles


@router.get("/explore")
async def get_travel_vehicles():
    vehicles = repository.get_user_explore_vehicles()
    return vehicles


@router.get("/explore/search")
async def get_travel_vehicles(from_district: str, from_place: str, to_district: str, to_place: str, departure_at: str):
    print(from_district, from_place, to_district, to_place, departure_at)
    vehicles = repository.get_user_explore_vehicles()
    return vehicles


@router.get("/{vehicle_slug}")
async def get_vehicle(vehicle_slug):
    return repository.get_vehicle_by_slug(vehicle_slug=vehicle_slug)
