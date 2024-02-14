from pymongo import MongoClient


class Database:
    def __init__(self, client: MongoClient):
        # self.client = client
        self.merchant_v_and_t_service_db = client.merchant_v_and_t_service
        # self.db = client.merchant_v_and_t_service
