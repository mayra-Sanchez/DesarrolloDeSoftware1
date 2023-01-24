from django.urls import path
from . import views

app_name='clients'

urlpatterns = [     
    path('list-electricity-prices/', views.ListAllElectricityPricesView.as_view(), name='list_all_electricity_prices'),
    path('search-electricity-prices/', views.SearchElectricityPriceView.as_view(), name='search_electricity_prices'),
    
]