# Serialize Vehicle NoSql JSON to python object
# def vehicleSerializer(vehicle):
#     return {
#         "id": str(vehicle["_id"]),
#         "plate_no": vehicle["plate_no"],
#         "merchant_id": vehicle["merchant_id"],
#     }
class Vehicle:
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if isinstance(value, object):
                value = str(value)
            setattr(self, key, value)

    # serialize all vehicles
    @staticmethod
    def vehiclesSerializer(vehicles) -> list:
        return [Vehicle(**vehicle) for vehicle in vehicles]


# serialize all vehicles
# def vehiclesSerializer(vehicles) -> list:
#     return [Vehicle(**vehicle) for vehicle in vehicles]


def serializeDict(a) -> dict:
    return {**{i: str(a[i]) for i in a if i == '_id'}, **{i: a[i] for i in a if i != '_id'}}


def serializeList(entity) -> list:
    return [serializeDict(a) for a in entity]
