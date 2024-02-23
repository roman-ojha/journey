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

    def book_vehicle_seats(self, vehicle_id: str, seats: list, vehicle_model_id: str, user_id: int):
        if len(seats) == 0:
            return {"error": True, "message": "Please select at least one seat to booked it."}
        vehicle = self.merchant_v_and_t_service_db.Vehicles.find_one(
            {'_id': ObjectId(vehicle_id)})
        if not vehicle:
            return {"error": True, "message": "Vehicle not found"}

        modelSeats = self.merchant_v_and_t_service_db.ModelSeats.aggregate(
            [

                {"$match": {"name": {"$in": seats},
                            "vehicle_model_id": ObjectId(vehicle_model_id)}},
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
        # print(modelSeatsId)

        # check whether all the 'seats' are available on 'vehicleSeats'
        selectedVehicleSeats = self.merchant_v_and_t_service_db.VehicleSeats.aggregate(
            [
                {"$match": {"vehicle_id": ObjectId(vehicle_id), "seat_id": {
                    "$in": modelSeatsObjectId}}, },
                {
                    "$project": {
                        # "updated_at": 0,
                        # "created_at": 0,
                        "vehicle_id": 0,
                        "price": 0,
                        # "_id": 0,
                    }
                },
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
        if len(bookedSeats) > 0:
            return {"error": True, "message": f"Seat {[bookedSeats.get('name') for bookedSeats in bookedSeats]} are already booked"}

        # # Finally now update the vehicleSeats
        # # TODO: payment gateway integration
        unBookedSeatsId = [ObjectId(unBookedSeats['_id'])
                           for unBookedSeats in unBookedSeats]
        res = self.merchant_v_and_t_service_db.VehicleSeats.update_many(
            {"_id": {"$in": unBookedSeatsId}},
            {"$set": {"is_booked": True, "user_id": user_id}}
        )
        if res.modified_count == 0:
            return {"error": True, "message": "Failed to book the seats"}
        return {"error": False, "message": "Seats booked successfully."}


repository = Repository()
