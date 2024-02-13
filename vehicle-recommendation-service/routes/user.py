from fastapi import APIRouter
from models.vehicle import Vehicle
from config.database import db
from schemas.vehicle import vehicleSerializer, vehiclesSerializer
from bson import ObjectId
import pprint


router = APIRouter()
printer = pprint.PrettyPrinter()

# Get all vehicles


@router.get("/vehicles")
async def get_vehicles():
    vehicles = vehiclesSerializer(db.Vehicles.find())
    # printer.pprint(vehicles)
    return vehicles
