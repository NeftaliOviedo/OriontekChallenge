from pymongo import MongoClient
from django.conf import settings
from bson import ObjectId

MONGO_URI = settings.MONGO_URI
MONGO_DB_NAME = settings.MONGO_DB_NAME

mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client[MONGO_DB_NAME]

def get_collection(collection_name):
    return mongo_db[collection_name]

class Client:
    COLLECTION_NAME = "clients"

    @staticmethod
    def find_all():
        collection = get_collection(Client.COLLECTION_NAME)
        return list(collection.find())

    @staticmethod
    def find_by_id(client_id):
        collection = get_collection(Client.COLLECTION_NAME)
        return collection.find_one({"_id": client_id})

    @staticmethod
    def create(data):
        collection = get_collection(Client.COLLECTION_NAME)
        result = collection.insert_one(data)
        return str(result.inserted_id)

    @staticmethod
    def update(client_id, data):
        collection = get_collection(Client.COLLECTION_NAME)
        
        try:
            client_id = ObjectId(client_id)  # Ensure the client_id is an ObjectId
        except Exception as e:
            print(f"Error converting client_id to ObjectId: {e}")
            return False
        
        result = collection.update_one({"_id": client_id}, {"$set": data})
        print(result) 
        return result.matched_count > 0
    @staticmethod
    def delete(client_id):
        collection = get_collection(Client.COLLECTION_NAME)
        try:
            client_id = ObjectId(client_id)  
        except Exception as e:
            print(f"Error converting client_id to ObjectId: {e}")
            return False

        result = collection.delete_one({"_id": client_id})
        return result.deleted_count > 0