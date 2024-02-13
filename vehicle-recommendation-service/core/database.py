from core.config import settings
from pymongo import MongoClient

client = MongoClient(settings.MERCHANT_V_AND_T_SERVICE_DB_URL)
db = client['merchant_v_and_t_service']
