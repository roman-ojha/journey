from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId


class VehicleSeat(BaseModel):
    id: Optional[str] = Field(
        default_factory=lambda: str(ObjectId()), alias="_id")
    price: int
    is_booked: bool = False
    seat_id: str
    vehicle_id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
