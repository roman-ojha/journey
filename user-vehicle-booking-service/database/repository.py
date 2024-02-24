from database.index import Database
import pprint
from bson import ObjectId
from serializer.serializer import Serializer
from datetime import datetime
from typing import Dict

printer = pprint.PrettyPrinter()


class Repository(Database):
    def get_vehicles(self):
        vehicles = self.merchant_v_and_t_service_db.Vehicles.find()
        return Serializer(data=vehicles, many=True).data

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


repository = Repository()
