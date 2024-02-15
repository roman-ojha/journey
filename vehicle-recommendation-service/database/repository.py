from schemas.vehicle import Vehicle
from database.index import Database


class Repository(Database):
    def get_vehicles(self):
        vehicles = self.merchant_v_and_t_service_db.Vehicles.find()
        return Vehicle.serializeList(list=vehicles, exclude=["created_at", "updated_at",])


repository = Repository()
