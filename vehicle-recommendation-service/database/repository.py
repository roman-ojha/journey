from schemas.vehicle import Vehicle
from database.index import Database


class Repository(Database):
    def get_vehicles(self):
        # return vehiclesSerializer(self.merchant_v_and_t_service_db.Vehicles.find())
        # return self.merchant_v_and_t_service_db.Vehicles.find()
        return Vehicle.vehiclesSerializer(
            self.merchant_v_and_t_service_db.Vehicles.find())


repository = Repository()
