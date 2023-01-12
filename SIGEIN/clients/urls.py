from django.urls import path
from . import views

app_name='clients'

urlpatterns = [     
    path('create-client/', views.CreateClientView.as_view(), name='create_new_client'),
    path('update-info/<int:pk>/', views.UpdateClientsInfoView.as_view(), name='update_client_info'),
    path('list-all/', views.ListAllClientsView.as_view(), name='list_all_clients'),
    path('list-own-info/', views.ListOwnInfoView.as_view(), name='list_own_info'),
    path('update-own-info/<int:pk>/', views.UpdateOwnInfoView.as_view(), name='update_client_own_info'),
    path('search/', views.ClientSearchView.as_view(), name='search_client'),
    
]