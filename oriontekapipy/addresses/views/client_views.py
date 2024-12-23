from django.http import JsonResponse
from bson import ObjectId
import json
from addresses.models.client import Client
from django.views.decorators.csrf import csrf_exempt

def serialize_client(client):
    client['_id'] = str(client['_id'])  
    return client

def get_clients(request):
    clients = Client.find_all()
    serialized_clients = [serialize_client(client) for client in clients]
    return JsonResponse(serialized_clients, safe=False, status=200)

@csrf_exempt
def create_client(request):
    data = json.loads(request.body) 
    client_id = Client.create(data)
    clients = Client.find_all()
    serialized_clients = [serialize_client(client) for client in clients]
    return JsonResponse(serialized_clients, safe=False, status=200)

@csrf_exempt
def update_client(request, client_id):
    data = json.loads(request.body) 
    updated = Client.update(client_id, data)
    print(updated)
    if updated:
        clients = Client.find_all()
        serialized_clients = [serialize_client(client) for client in clients]
        return JsonResponse(serialized_clients, safe=False, status=200)
    return JsonResponse({"message": "Client not found"}, status=404)

@csrf_exempt
def delete_client(request, client_id):
    deleted = Client.delete(client_id)
    if deleted:
        return JsonResponse({"message": "Deleted successfully"}, status=200)
    return JsonResponse({"message": "Client not found"}, status=404)
