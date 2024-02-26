from pymongo import MongoClient
from config.database import client


class Database:
    def __init__(self):
        # self.client = client
        self.merchant_v_and_t_service_db = client.merchant_v_and_t_service
        self.user_vehicle_reviews_db = client.user_vehicle_review_service
        # self.db = client.merchant_v_and_t_service
