# Serialize Vehicle NoSql JSON to python object
# def vehicleSerializer(vehicle):
#     return {
#         "id": str(vehicle["_id"]),
#         "plate_no": vehicle["plate_no"],
#         "merchant_id": vehicle["merchant_id"],
#     }
# Better way
# class Vehicle:
#     def __init__(self, **kwargs):
#         for key, value in kwargs.items():
#             if isinstance(value, object):
#                 value = str(value)
#             setattr(self, key, value)

#     # serialize all vehicles
#     @staticmethod
#     def vehiclesSerializer(vehicles) -> list:
#         return [Vehicle(**vehicle) for vehicle in vehicles]

# Inherit from Serializer class
from schemas.serializer import Serializer
from schemas.vehicleSeat import VehicleSeatSerializer


class VehicleSerializer(Serializer):
    # seats = VehicleSeatSerializer()
    def __init__(self, data: dict | list | None, many=False, exclude: list = []):
        super().__init__(data, many, exclude)


def serializeDict(a) -> dict:
    return {**{i: str(a[i]) for i in a if i == '_id'}, **{i: a[i] for i in a if i != '_id'}}


def serializeList(entity) -> list:
    return [serializeDict(a) for a in entity]
