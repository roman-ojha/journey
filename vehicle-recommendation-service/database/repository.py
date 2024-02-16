from schemas.vehicle import VehicleSerializer
from database.index import Database
import pprint
from bson import ObjectId

printer = pprint.PrettyPrinter()


class Repository(Database):
    def get_vehicles(self):
        vehicles = self.merchant_v_and_t_service_db.Vehicles.aggregate([
            {
                "$lookup": {
                    "from": "VehicleSeats",
                    "localField": "_id",  # _id of Vehicles collection
                    "foreignField": "vehicle_id",  # vehicle_id of VehicleSeats collection
                    "as": "seats"
                }
            }
        ])
        # _id = ObjectId("65d6741784ee6d403f68462e")
        # vehicles = self.merchant_v_and_t_service_db.Vehicles.find_one({
        #                                                               "_id": _id})
        # vehicles = self.merchant_v_and_t_service_db.Vehicles.find()
        serializedVehicle = VehicleSerializer(data=vehicles, many=True)
        # return serializedVehicle.data
        return serializedVehicle.data


repository = Repository()
