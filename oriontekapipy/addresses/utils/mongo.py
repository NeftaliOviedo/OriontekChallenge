from pymongo import MongoClient
from django.conf import settings

# Get MongoDB URI and database name from settings
MONGO_URI = settings.MONGO_URI
MONGO_DB_NAME = settings.MONGO_DB_NAME

# Initialize the MongoDB client and database
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client[MONGO_DB_NAME]

def get_collection(collection_name):
    return mongo_db[collection_name]
