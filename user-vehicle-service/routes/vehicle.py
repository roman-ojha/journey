from fastapi import APIRouter
from database.repository import repository
from utils.recommendation import Recommendation
import random


router = APIRouter()
recommendation = Recommendation()

# Get all vehicles


# TODO: you have to get the user_id from the authenticated user
@router.get("/explore")
async def get_travel_vehicles(user_id: int | None = None):
    try:
        recommended_travel_ids = recommendation.explore_vehicle(
            user_id=user_id)
        vehicles = repository.get_travels_from_travel_ids(
            travel_ids=recommended_travel_ids)
        shuffled_vehicles = sorted(
            vehicles, key=lambda x: random.random())
        return shuffled_vehicles
    except:
        # TODO: handle the exception
        return []


@router.get("/explore/search")
async def get_travel_vehicles(from_district: str, from_place: str, to_district: str, to_place: str, departure_at: str, user_id: int | None = None):
    try:
        recommended_travel_ids = recommendation.search_vehicle(
            from_location=from_place + ", "+from_district, to_location=to_place + ", "+to_district, departure_at=departure_at, user_id=user_id)
        vehicles = repository.get_travels_from_travel_ids(
            travel_ids=recommended_travel_ids)
        # shuffled_vehicles = sorted(
        #     vehicles, key=lambda x: random.random())
        return vehicles
    except:
        # TODO: handle the exception
        return []


@router.get("/{vehicle_slug}")
async def get_vehicle(vehicle_slug):
    return repository.get_vehicle_by_slug(vehicle_slug=vehicle_slug)
