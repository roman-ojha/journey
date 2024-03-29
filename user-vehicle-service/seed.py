# Seeding Initial Data to 'Vehicle.csv' file
import pprint
from config.settings import settings
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
from schemas.serializer import Serializer
import pandas as pd
from database.index import Database
from train_model import train_model

printer = pprint.PrettyPrinter()


# Database Connection process =================================================
load_dotenv(os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env.dev'))
database = Database()

# Seeding process =============================================================


def seedTravels():
    # Get all travels which are active
    travels = database.merchant_v_and_t_service_db.Travels.aggregate([
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
    # In departure_at only store date without time
    dfTravels['departure_at'] = pd.to_datetime(
        dfTravels['departure_at']).dt.date
    # Save DataFrame to CSV
    dfTravels.to_csv('./data/dataset/travels.csv', index=False)
    print("Travels data saved to 'travels.csv' file")


def seedReviews():
    reviews = database.user_vehicle_reviews_db.Review.aggregate([
        {
            "$project": {
                "review": 0,
                "created_at": 0,
                "updated_at": 0
            }
        },
    ])
    reviews = Serializer(data=reviews, many=True).data
    # Convert reviews data to DataFrame
    dfReviews = pd.DataFrame(reviews)
    # # Rename columns
    dfReviews = dfReviews.rename(columns={'_id': 'id'})
    # # Reorder columns
    dfReviews = dfReviews[['id', 'vehicle_id',
                           'user_id', 'rating']]
    # Save DataFrame to CSV
    dfReviews.to_csv('./data/dataset/reviews.csv', index=False)
    print("Reviews data saved to 'reviews.csv' file")


if __name__ == "__main__":
    seedTravels()
    seedReviews()
    train_model()
