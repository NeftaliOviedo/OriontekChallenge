from django.urls import path
from .views import address_views, client_views

urlpatterns = [
    path('clients', client_views.get_clients),
    path('clients/create', client_views.create_client),
    path('clients/<str:client_id>/update', client_views.update_client),
    path('clients/<str:client_id>/delete', client_views.delete_client),

    path('addresses/<str:client_id>', address_views.get_addresses),
    path('addresses/<str:client_id>/create', address_views.create_address),
    path('addresses/<str:address_id>/update', address_views.update_address),
    path('addresses/<str:address_id>/delete', address_views.delete_address),
]
