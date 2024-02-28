from pymongo import MongoClient, database
from pymongo.server_api import ServerApi
import os

# Create a new client and connect to the server
client = MongoClient(
    os.environ.get("MERCHANT_V_AND_T_SERVICE_DATABASE_URL"))


def connect():
    try:
        client.admin.command('ping')
        print("You successfully connected to MongoDB Database")
    except Exception as e:
        raise RuntimeError(
            "Error: Could not connect to the database. Exiting..."+e)
