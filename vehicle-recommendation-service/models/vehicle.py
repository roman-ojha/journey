from pydantic import BaseModel


class Vehicle(BaseModel):
    plate_no: str
    merchant_id: int
    # model_id:
    # model:
    # images:
