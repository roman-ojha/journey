from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId


class Travel(BaseModel):
    id: Optional[str] = Field(
        default_factory=lambda: str(ObjectId()), alias="_id")
    from_: str
    to: str
    is_active: bool = True
    departure_at: str
    route: str
    driver_no: int
    vehicle_id: str
    seat_average_price: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
