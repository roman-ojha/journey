from typing import List, Optional
from pydantic import ConfigDict, BaseModel, Field
from bson import ObjectId
from models.vehicleImage import VehicleImage


class Vehicle(BaseModel):
    id: Optional[str] = Field(
        default_factory=lambda: str(ObjectId()), alias="_id")
    plate_no: str
    merchant_id: int
    model_id: str
    images: List[VehicleImage] = []
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    class Config(ConfigDict):
        # Disable protected namespaces
        protected_namespaces = ()
