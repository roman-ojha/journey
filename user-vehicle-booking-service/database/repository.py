from database.index import Database
import pprint
from bson import ObjectId
from serializer.serializer import Serializer
from datetime import datetime
from typing import Dict

printer = pprint.PrettyPrinter()


class Repository(Database):
    def get_booked_vehicles(self, user_id):
        bookedVehicleSeats = self.merchant_v_and_t_service_db.VehicleSeats.aggregate([
            {
                "$match": {"user_id": user_id, "is_booked": True}
            },
            {
                "$lookup": {
                    "from": "Vehicles",
                    "localField": "vehicle_id",
                    "foreignField": "_id",
                    "as": "vehicle"
                }
            },
            {
                "$addFields": {
                    "vehicle": {"$arrayElemAt": ["$vehicle", 0]}
                }
            }
        ])
        bookedVehicleSeats = Serializer(
            data=bookedVehicleSeats, many=True).data
        bookedVehicles = [bookedVehicleSeat.get(
            'vehicle') for bookedVehicleSeat in bookedVehicleSeats]
        bookedVehiclesId = [bookedVehicle.get(
            '_id') for bookedVehicle in bookedVehicles]
        uniqueBookedVehicleId = list(set(bookedVehiclesId))
        vehicles = self.merchant_v_and_t_service_db.Vehicles.aggregate([
            {
                "$match": {"_id": {"$in": [ObjectId(vehicleId) for vehicleId in uniqueBookedVehicleId]}}
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
                "$addFields": {
                    "image": {"$arrayElemAt": ["$images", 0]}
                }
            },
            {
                "$project": {
                    "images": 0
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
            # filter active travel with 'is_active' = True
            {
                "$addFields": {
                    "travels": {"$filter": {
                        "input": "$travels",
                        "as": "travel",
                        "cond": {"$eq": ["$$travel.is_active", True]}
                    }}
                }
            },
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
                    "localField": "travel.from_",
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
        ])

        vehicles = Serializer(data=vehicles, many=True).data

        # Get Reviews for these vehicles
        vehicleReviews = self.user_vehicle_reviews_db.Review.aggregate([
            {
                "$match": {
                    "vehicle_id": {"$in": [ObjectId(vehicle.get("_id"))
                                           for vehicle in vehicles]}
                }
            },
            {
                "$project": {
                    "review": 0,
                    "created_at": 0,
                    "updated_at": 0,
                    "user_id": 0,
                }
            },
            # Here bellow is the format that we will get
            # [{'_id': '65db612df6835e192b749b1e',
            #   'rating': 5,
            #   'vehicle_id': '65d9743ab020df0fbbfc1d23'},
            #  {'_id': '65db612df6835e192b749b1f',
            #   'rating': 4,
            #      'vehicle_id': '65d9743ab020df0fbbfc1d2e'},
            #     {'_id': '65db612df6835e192b749b21',
            #      'rating': 2,
            #      'vehicle_id': '65d9743bb020df0fbbfc1d55'},
            #     {'_id': '65db612df6835e192b749b23',
            #      'rating': 1,
            #      'vehicle_id': '65d9743cb020df0fbbfc1dfa'},
            #     {'_id': '65db612df6835e192b749b26',
            #      'rating': 2,
            #      'vehicle_id': '65d9743cb020df0fbbfc1dfa'},
            #     {'_id': '65db612df6835e192b749b28',
            #      'rating': 5,
            #      'vehicle_id': '65d9743ab020df0fbbfc1d2e'},
            #     {'_id': '65db612df6835e192b749b29',
            #      'rating': 1,
            #      'vehicle_id': '65d9743bb020df0fbbfc1d9c'}]
            # Now I want to group the rating by vehicle_id in bellow format
            # [ {'_id': '65d9743ab020df0fbbfc1d23', 'rating': [5, 5], 'no_of_reviews': 2, 'average_rating': 5.0},],
            {
                "$group": {
                    "_id": "$vehicle_id",
                    "ratings": {"$push": "$rating"},
                    # count the number of ratings
                    "no_of_reviews": {"$sum": 1},
                    "average_rating": {"$avg": "$rating"}
                }
            },
            {
                "$project": {
                    "ratings": 0
                }
            }
        ])
        vehicleReviews = Serializer(data=vehicleReviews, many=True).data
        # NOTE: standard 'Serializer' class can't serialize list of rating in [5, 5] format so we will use custom serializer
        # vehicleReviews = [{"_id": str(vehicleReview.get('_id')),  "no_of_reviews": vehicleReview.get(
        #     "no_of_reviews"), "average_rating": vehicleReview.get("average_rating")} for vehicleReview in vehicleReviews]
        # Now push 'no_or_reviews' and 'average_rating' to the serializedVehicle
        newVehicles = []
        for vehicle in vehicles:
            vehicle_id = vehicle.get("_id")
            for vehicleReview in vehicleReviews:
                if vehicle_id == vehicleReview.get("_id"):
                    vehicle["no_of_reviews"] = vehicleReview.get(
                        "no_of_reviews")
                    vehicle["average_rating"] = vehicleReview.get(
                        "average_rating")
                    newVehicles.append(vehicle)
                    break
        return newVehicles

    def book_vehicle_seats(self, vehicle_id: str, seats: list,  user_id: int) -> Dict[str, str]:
        if len(seats) == 0:
            return {"error": True, "message": "Please select at least one seat to booked it."}
        vehicle = self.merchant_v_and_t_service_db.Vehicles.find_one(
            {'_id': ObjectId(vehicle_id)})
        if not vehicle:
            return {"error": True, "message": "Vehicle not found"}
        vehicle = Serializer(data=vehicle).data

        modelSeats = self.merchant_v_and_t_service_db.ModelSeats.aggregate(
            [

                {"$match": {"name": {"$in": seats},
                            "vehicle_model_id": ObjectId(vehicle.get('model_id'))}},
                {
                    "$project": {
                        "updated_at": 0,
                        "created_at": 0,
                        "vehicle_model_id": 0,
                        # "name": 0,
                        # "_id": 0,
                    }
                },
            ]
        )

        # check whether all the 'seats' are available on 'modelSeats'

        modelSeats = Serializer(data=modelSeats, many=True).data
        if len(seats) != len(modelSeats):
            return {"error": True, "message": "Provided some seats are invalid for this vehicle"}

        modelSeatsId = [modelSeats.get('_id')
                        for modelSeats in modelSeats]
        modelSeatsObjectId = [ObjectId(modelSeats.get('_id'))
                              for modelSeats in modelSeats]

        # check whether all the 'seats' are available on 'vehicleSeats'
        selectedVehicleSeats = self.merchant_v_and_t_service_db.VehicleSeats.aggregate(
            [
                {"$match": {"vehicle_id": ObjectId(vehicle_id), "seat_id": {
                    "$in": modelSeatsObjectId}}, },
                {
                    "$lookup": {
                        "from": "ModelSeats",
                        "localField": "seat_id",
                        "foreignField": "_id",
                        "as": "seat"
                    }
                },
                {
                    "$addFields": {
                        "seat": {"$arrayElemAt": ["$seat", 0]}
                    }
                },
                {
                    "$addFields": {
                        "name": "$seat.name"
                    }
                },
                {
                    "$project": {
                        "seat": 0
                    }
                }
            ]
        )

        selectedVehicleSeats = Serializer(
            data=selectedVehicleSeats, many=True).data

        unBookedSeats = []
        bookedSeats = []
        for selectedVehicleSeat in selectedVehicleSeats:
            if selectedVehicleSeat.get('seat_id') in modelSeatsId:
                if selectedVehicleSeat.get('is_booked') == True:
                    bookedSeats.append(selectedVehicleSeat)
                else:
                    unBookedSeats.append(selectedVehicleSeat)

        bookedExpiredSeatsObjectId = []
        if len(bookedSeats) > 0:
            for bookedSeat in bookedSeats:
                # Check whether the booked seats are payed if it is not payed then Check whether seats are booked before 15 minutes
                if not bookedSeat.get('is_payed'):
                    current_time = datetime.utcnow()
                    # Get time seats have been booked
                    booked_time = bookedSeat.get('booked_at')
                    time_difference = current_time - booked_time
                    if time_difference.total_seconds() >= 900:  # 900 seconds = 15 minutes
                        bookedExpiredSeatsObjectId.append(
                            ObjectId(bookedSeat.get('_id')))
                        # Update Booked seats
                        bookedSeats = [tBookedSeat for tBookedSeat in bookedSeats if tBookedSeat.get(
                            '_id') != bookedSeat.get('_id')]
            if len(bookedExpiredSeatsObjectId) > 0:
                # UnBook expired seats
                unBookedSeatsRes = self.merchant_v_and_t_service_db.VehicleSeats.update_many(
                    {"_id": {"$in": bookedExpiredSeatsObjectId}},
                    {"$set": {"is_booked": False, "user_id": None, "booked_at": None}}
                )
                if unBookedSeatsRes.modified_count == 0:
                    return {"error": True, "message": "Something went wrong Please try again."}

        # If Updated Booked Seats still contain some booked seats then return error
        if len(bookedSeats) > 0:
            return {"error": True, "message": f"Seats {[bookedSeats.get('name') for bookedSeats in bookedSeats]} are already booked, Please choose another seats."}

        # # Finally now Book the seats
        unBookedSeatsObjectId = [ObjectId(unBookedSeats['_id'])
                                 for unBookedSeats in unBookedSeats]
        # Add bookedExpiredSeatsObjectId into unBookedSeatsObjectId
        unBookedSeatsObjectId.extend(bookedExpiredSeatsObjectId)
        res = self.merchant_v_and_t_service_db.VehicleSeats.update_many(
            {"_id": {"$in": unBookedSeatsObjectId}},
            {"$set": {"is_booked": True, "user_id": user_id,
                      "is_payed": False, "booked_at": datetime.utcnow()}}
        )
        if res.modified_count == 0:
            return {"error": True, "message": "Failed to book the seats"}
        if res.modified_count != len(unBookedSeatsObjectId):
            return {"error": True, "message": "Some seats were not been able to get booked, Causing some problems."}

        # # Calculate Total price
        total_price = 0
        for selectedVehicleSeat in selectedVehicleSeats:
            total_price += selectedVehicleSeat.get('price')
        return {"error": False, "message": "Seats booked successfully.", "data": {'total_price': total_price}}

    def get_booked_vehicles_detail(self, vehicle_slug, user_id):
        # TODO: Needs to check whether user booked the vehicles or not
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
                    "localField": "travel.from_",
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
                                "user_id": "$$seat.user_id",
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
            },
            # add 'travel.from' field from 'travel.from_'
            {
                "$addFields": {
                    "travel.from": "$travel.from_"
                }
            },
            # remove "from_" field now
            {
                "$project": {
                    "travel.from_": 0
                }
            },
        ])

        vehicle = vehicle.try_next()
        if vehicle is None:
            return {"message": "Vehicle not found"}
        vehicle = Serializer(data=vehicle).data

        # Get Reviews for selected vehicle
        vehicleReviews = self.user_vehicle_reviews_db.Review.aggregate([
            {
                "$match": {
                    "vehicle_id": ObjectId(vehicle.get("_id"))
                }
            },
            # {
            #     "$limit": 1
            # },
            {
                "$project": {
                    "review": 0,
                    "created_at": 0,
                    "updated_at": 0,
                    "user_id": 0,
                }
            },
            # Here bellow is the format that we will get
            # [{'_id': '65db612df6835e192b749b1e',
            #   'rating': 5,
            #   'vehicle_id': '65d9743ab020df0fbbfc1d23'},
            #  {'_id': '65db612df6835e192b749b1f',
            #   'rating': 4,
            #      'vehicle_id': '65d9743ab020df0fbbfc1d2e'},
            #     {'_id': '65db612df6835e192b749b21',
            #      'rating': 2,
            #      'vehicle_id': '65d9743bb020df0fbbfc1d55'},
            #     {'_id': '65db612df6835e192b749b23',
            #      'rating': 1,
            #      'vehicle_id': '65d9743cb020df0fbbfc1dfa'},
            #     {'_id': '65db612df6835e192b749b26',
            #      'rating': 2,
            #      'vehicle_id': '65d9743cb020df0fbbfc1dfa'},
            #     {'_id': '65db612df6835e192b749b28',
            #      'rating': 5,
            #      'vehicle_id': '65d9743ab020df0fbbfc1d2e'},
            #     {'_id': '65db612df6835e192b749b29',
            #      'rating': 1,
            #      'vehicle_id': '65d9743bb020df0fbbfc1d9c'}]
            # Now I want to group the rating by vehicle_id in bellow format
            # {'_id': '65d9743ab020df0fbbfc1d23', 'rating': [5, 5], 'no_of_reviews': 2, 'average_rating': 5.0},
            {
                "$group": {
                    "_id": "$vehicle_id",
                    "ratings": {"$push": "$rating"},
                    # count the number of ratings
                    "no_of_reviews": {"$sum": 1},
                    "average_rating": {"$avg": "$rating"}
                }
            },
            {
                "$project": {
                    "ratings": 0
                }
            },
            {
                "$limit": 1
            }
        ])
        vehicleReviews = Serializer(data=vehicleReviews, many=True).data
        if len(vehicleReviews) > 0:
            vehicle["no_of_reviews"] = vehicleReviews[0].get("no_of_reviews")
            vehicle["average_rating"] = vehicleReviews[0].get("average_rating")
        else:
            vehicle["no_of_reviews"] = 0
            vehicle["average_rating"] = 0
        return vehicle


repository = Repository()
