from schemas.vehicle import VehicleSerializer
from database.index import Database
import pprint
from bson import ObjectId
from random import sample

printer = pprint.PrettyPrinter()


class Repository(Database):
    # Getting random travels
    # NOTE: we will going to replace this with recommendation algorithm in future
    def get_random_travels(self):
        random_travels = self.merchant_v_and_t_service_db.Travels.aggregate([
            {"$sample": {'size': 10}}
        ])
        # return the _id fields from the fetched documents
        return [travel['_id'] for travel in random_travels]

    def get_vehicles(self):
        travel_ids = self.get_random_travels()
        # here 'travel_ids' is of list of type ObjectId('<id>')
        vehicles = self.merchant_v_and_t_service_db.Travels.aggregate([
            {
                "$match": {
                    # Filter by the list of travel _id values
                    "_id": {"$in": travel_ids}
                }
            },
            {
                "$lookup": {
                    "from": "Vehicles",
                    "localField": "vehicle_id",  # _id of Travel collection
                    "foreignField": "_id",  # vehicle_id of Vehicle collection
                    "as": "vehicle"
                },
            },
            {
                "$unwind": "$vehicle"
            },
            # Getting vehicle images
            {
                "$lookup": {
                    "from": "VehicleImages",
                    "localField": "vehicle._id",  # _id of Vehicles collection
                    "foreignField": "vehicle_id",  # vehicle_id of VehicleImage collection
                    "as": "images"
                }
            },
            {
                "$addFields": {
                    "vehicle.images": "$images"  # Add the 'images' array to the 'vehicle' object
                }
            },
            {
                "$project": {
                    "images": 0  # Exclude the 'images' field from the output
                }
            },
            # Getting Vehicle Model
            {
                "$lookup": {
                    "from": "VehicleModel",
                    "localField": "vehicle.model_id",
                    "foreignField": "_id",
                    "as": "model"
                }
            },
            {
                "$addFields": {
                    "vehicle.model": {"$arrayElemAt": ["$model", 0]}
                }
            },
            {
                "$project": {
                    "model": 0  # Exclude the 'images' field from the output
                }
            },
            # Now get from place
            {
                "$lookup": {
                    "from": "Places",
                    "localField": "from",
                    "foreignField": "_id",
                    "as": "from_place"
                },
            },
            {
                "$addFields": {
                    "from_place": {"$arrayElemAt": ["$from_place", 0]}
                }
            },
            {
                "$unwind": "$from_place"
            },
            {
                "$lookup": {
                    "from": "District",
                    "localField": "from_place.district_id",
                    "foreignField": "_id",
                    "as": "district"
                }
            },
            {
                "$addFields": {
                    "from_place.district": {"$arrayElemAt": ["$district", 0]}
                }
            },
            {
                "$project": {
                    "district": 0
                }
            },
            # Now get from & to location
            {
                "$lookup": {
                    "from": "Places",
                    "localField": "to",
                    "foreignField": "_id",
                    "as": "to_place"
                },
            },
            {
                "$addFields": {
                    "to_place": {"$arrayElemAt": ["$to_place", 0]}
                }
            },
            {
                "$unwind": "$to_place"
            },
            {
                "$lookup": {
                    "from": "District",
                    "localField": "to_place.district_id",
                    "foreignField": "_id",
                    "as": "district"
                }
            },
            {
                "$addFields": {
                    "to_place.district": {"$arrayElemAt": ["$district", 0]}
                }
            },
            {
                "$project": {
                    "district": 0
                }
            },
        ])
        # _id = ObjectId("65d6741784ee6d403f68462e")
        # vehicles = self.merchant_v_and_t_service_db.Vehicles.find_one({
        #                                                               "_id": _id})
        # vehicles = self.merchant_v_and_t_service_db.Vehicles.find()
        serializedVehicle = VehicleSerializer(data=vehicles, many=True)
        return serializedVehicle.data


repository = Repository()
