from pymongo import MongoClient
from django.conf import settings
from bson import ObjectId

MONGO_URI = settings.MONGO_URI
MONGO_DB_NAME = settings.MONGO_DB_NAME

mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client[MONGO_DB_NAME]

def get_collection(collection_name):
    return mongo_db[collection_name]

class Address:
    COLLECTION_NAME = "addresses"

    @staticmethod
    def find_by_client(client_id):
        collection = get_collection(Address.COLLECTION_NAME)
        return list(collection.find({"client": client_id}))

    @staticmethod
    def create(data):
        collection = get_collection(Address.COLLECTION_NAME)
        result = collection.insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def update(address_id, data):
        collection = get_collection(Address.COLLECTION_NAME)
        result = collection.update_one({"_id": address_id}, {"$set": data})
        return result.matched_count > 0

    @staticmethod
    def delete(address_id):
        collection = get_collection(Address.COLLECTION_NAME)

        try:
            address_id = ObjectId(address_id)  
        except Exception as e:
            print(f"Error converting address_id to ObjectId: {e}")
            return False

        result = collection.delete_one({"_id": address_id})
        print(result)  
        return result.deleted_count > 0 

