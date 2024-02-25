# Seeding Initial Data to 'Vehicle.csv' file
import pprint
from config.settings import settings
from pymongo import MongoClient, database
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
from schemas.serializer import Serializer
import pandas as pd

printer = pprint.PrettyPrinter()


# Database Connection process =================================================
load_dotenv(os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env.dev'))
# Create a new client and connect to the server
client = MongoClient(
    settings.MERCHANT_V_AND_T_SERVICE_DB_URL, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("You successfully connected to MongoDB Database")
except Exception as e:
    raise RuntimeError(
        "Error: Could not connect to the database. Exiting..."+e)


# Seeding process =============================================================
def seed():
    # Get all travels which are active
    travels = client.merchant_v_and_t_service.Travels.aggregate([
        # {
        #     "$match": {
        #         "is_active": True
        #     }
        # },
        # Get To Places
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
                "to_place.district": {"$arrayElemAt": ["$district", 0]},
            }
        },
        # Now get from place
        {
            "$lookup": {
                "from": "Places",
                "localField": "from_",
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
                # concat district name with place name into 'to' field
                "to": {
                    "$concat": ["$to_place.name", ", ", "$to_place.district.name"]
                },
                "from": {
                    "$concat": ["$from_place.name", ", ", "$from_place.district.name"]
                }
            }
        },
        {
            "$project": {
                "from_place": 0,
                "to_place": 0,
                "from_": 0,
                "created_at": 0,
                "updated_at": 0,
                "route": 0,
                # "vehicle_id": 0,
                "driver_no": 0,
                "seat_average_price": 0,
                "is_active": 0,
            }
        },
    ]
    )
    travels = Serializer(data=travels, many=True).data
    # Convert travel data to DataFrame
    dfTravels = pd.DataFrame(travels)
    # Rename columns
    dfTravels = dfTravels.rename(columns={'_id': 'travel_id'})
    # Reorder columns
    dfTravels = dfTravels[['vehicle_id', 'travel_id',
                           'departure_at', 'from', 'to']]
    # Convert departure_at column to datetime
    dfTravels['departure_at'] = pd.to_datetime(dfTravels['departure_at'])
    # Save DataFrame to CSV
    dfTravels.to_csv('travels.csv', index=False)
    print("Travels data saved to 'travels.csv' file")


seed()
