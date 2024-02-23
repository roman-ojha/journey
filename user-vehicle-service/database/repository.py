from schemas.vehicle import VehicleSerializer
from database.index import Database
import pprint
from bson import ObjectId
from random import sample
from schemas.serializer import Serializer

printer = pprint.PrettyPrinter()


class Repository(Database):
    # Getting random travels
    # NOTE: we will going to replace this with recommendation algorithm in future
    def get_random_travels(self):
        random_travels = self.merchant_v_and_t_service_db.Travels.aggregate([
            {"$sample": {'size': 17}}
        ])
        # return the _id fields from the fetched documents
        return [travel['_id'] for travel in random_travels]

    def get_user_explore_vehicles(self):
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
            # Now get to place
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

    def get_vehicle_by_slug(self, vehicle_slug):
        vehicle = self.merchant_v_and_t_service_db.Vehicles.aggregate([
            {
                "$match": {
                    "slug": vehicle_slug
                }
            },
            # only get one vehicle and return as object
            {
                "$limit": 1
            },
            {
                "$lookup": {
                    "from": "VehicleModel",
                    "localField": "model_id",
                    "foreignField": "_id",
                    "as": "model"
                }
            },
            {
                "$addFields": {
                    "model": {"$arrayElemAt": ["$model", 0]}
                }
            },
            {
                "$lookup": {
                    "from": "VehicleImages",
                    "localField": "_id",
                    "foreignField": "vehicle_id",
                    "as": "images"
                }
            },
            {
                "$lookup": {
                    "from": "Travels",
                    "localField": "_id",
                    "foreignField": "vehicle_id",
                    "as": "travels"
                }
            },
            # Get only those trave having 'is_active' field set to True
            {
                "$match": {
                    "travels.is_active": True
                }
            },
            # Filter travels based on the condition "is_active" is True
            {
                "$addFields": {
                    "travels": {
                        "$filter": {
                            "input": "$travels",
                            "as": "travel",
                            "cond": {"$eq": ["$$travel.is_active", True]}
                        }
                    }
                }
            },
            # Converting travels key to travel
            {
                "$addFields": {
                    "travel": {"$arrayElemAt": ["$travels", 0]}
                }
            },
            {
                "$project": {
                    "travels": 0
                }
            },
            # Get To Places
            {
                "$lookup": {
                    "from": "Places",
                    "localField": "travel.to",
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
            {
                "$addFields": {
                    "travel.to_place": "$to_place"
                }
            },
            {
                "$project": {
                    "to_place": 0
                }
            },
            # Now get from place
            {
                "$lookup": {
                    "from": "Places",
                    "localField": "travel.from",
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
            {
                "$addFields": {
                    "travel.from_place": "$from_place"
                }
            },
            {
                "$project": {
                    "from_place": 0
                }
            },
            # Get all seats
            {
                "$lookup": {
                    "from": "VehicleSeats",
                    "localField": "_id",
                    "foreignField": "vehicle_id",
                    "as": "seats"
                }
            },
            {
                "$lookup": {
                    "from": "ModelSeats",
                    "localField": "seats.seat_id",
                    "foreignField": "_id",
                    "as": "seat_details"
                }
            },
            # Project the desired fields for the seat details
            {
                "$addFields": {
                    "seats": {
                        "$map": {
                            "input": "$seats",
                            "as": "seat",
                            "in": {
                                "_id": "$$seat._id",
                                "price": "$$seat.price",
                                "is_booked": "$$seat.is_booked",
                                "seat_id": "$$seat.seat_id",
                                "vehicle_id": "$$seat.vehicle_id",
                                "seat": {
                                    "$arrayElemAt": [
                                        {
                                            "$filter": {
                                                "input": "$seat_details",
                                                "cond": {
                                                    "$eq": ["$$this._id", "$$seat.seat_id"]
                                                }
                                            }
                                        },
                                        0
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            {
                "$project": {
                    "seat_details": 0
                }
            }
        ])

        vehicle = vehicle.try_next()
        if vehicle is None:
            return {"message": "Vehicle not found"}
        return Serializer(data=vehicle).data

    def get_all_places(self):
        places = self.merchant_v_and_t_service_db.District.aggregate([
            {
                "$lookup": {
                    "from": "Places",
                    "localField": "_id",
                    "foreignField": "district_id",
                    "as": "places"
                }
            }
        ])
        # printer.pprint(places)
        return Serializer(data=places, many=True).data


repository = Repository()
