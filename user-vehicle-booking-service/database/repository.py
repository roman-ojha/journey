from database.index import Database
import pprint
from bson import ObjectId
from random import sample
from serializer.serializer import Serializer

printer = pprint.PrettyPrinter()


class Repository(Database):
    def get_vehicles(self):
        vehicles = self.merchant_v_and_t_service_db.Vehicles.find()
        return Serializer(data=vehicles, many=True).data


repository = Repository()
