from django.http import JsonResponse
from bson import ObjectId
from addresses.models.address import Address
from django.views.decorators.csrf import csrf_exempt
import json


def serialize_address(address):
    address['_id'] = str(address['_id'])  
    return address

def get_addresses(request, client_id):
    addresses = Address.find_by_client(client_id)
    serialized_address = [serialize_address(address) for address in addresses]
    return JsonResponse(serialized_address, safe=False, status=200)

@csrf_exempt
def create_address(request, client_id):
    data = json.loads(request.body) 
    data['client'] = client_id
    address_id = Address.create(data)
    addresses = Address.find_by_client(client_id)
    serialized_address = [serialize_address(address) for address in addresses]
    return JsonResponse(serialized_address, safe=False, status=200)

@csrf_exempt
def update_address(request, address_id):
    data = json.loads(request.body) 
    updated = Address.update(address_id, data)
    if updated:
        return JsonResponse({"message": "Updated successfully"}, status=200)
    return JsonResponse({"message": "Address not found"}, status=404)

@csrf_exempt
def delete_address(request, address_id):
    deleted = Address.delete(address_id)
    if deleted:
        return JsonResponse({"message": "Deleted successfully"}, status=200)
    return JsonResponse({"message": "Address not found"}, status=404)
