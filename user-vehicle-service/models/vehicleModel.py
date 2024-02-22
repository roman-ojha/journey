from typing import List, Optional
from pydantic import BaseModel, Field
from bson import ObjectId
from models.modelSeat import ModelSeat


class VehicleModel(BaseModel):
    id: Optional[str] = Field(
        default_factory=lambda: str(ObjectId()), alias="_id")
    name: str
    no_of_seats: int
    seats: List[ModelSeat] = []
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
