# Serialize Vehicle NoSql JSON to python object

# serialize one vehicle
def vehicleSerializer(vehicle):
    return {
        "id": str(vehicle["_id"]),
        "plate_no": vehicle["plate_no"],
        "merchant_id": vehicle["merchant_id"],
    }


# serialize all vehicles
def vehiclesSerializer(vehicles) -> list:
    return [vehicleSerializer(vehicle) for vehicle in vehicles]
