from config.settings import settings
from pymongo import MongoClient
from pymongo.server_api import ServerApi

# Create a new client and connect to the server
client = MongoClient(
    settings.MERCHANT_V_AND_T_SERVICE_DB_URL, server_api=ServerApi('1'))
db = client.merchant_v_and_t_service

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("You successfully connected to MongoDB Database")
except Exception as e:
    raise RuntimeError(
        "Error: Could not connect to the database. Exiting..."+e)
