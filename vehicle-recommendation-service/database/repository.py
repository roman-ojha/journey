from schemas.vehicle import vehicleSerializer, vehiclesSerializer
from database.index import Database


class Repository(Database):
    def get_vehicles(self):
        return vehiclesSerializer(self.merchant_v_and_t_service_db.Vehicles.find())
