from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId


class Place(BaseModel):
    id: Optional[str] = Field(
        default_factory=lambda: str(ObjectId()), alias="_id")
    name: str
    district_id: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
