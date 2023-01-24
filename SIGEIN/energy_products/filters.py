from django_filters import rest_framework as filters
from .models import ElectricityPrice


class ElectricityPriceFilter(filters.FilterSet):
   
    month = filters.NumberFilter(field_name="date", lookup_expr='month')
    year = filters.NumberFilter(field_name="date", lookup_expr='year')

    class Meta:
        model = ElectricityPrice
        fields = ['date', 'price', 'year', 'month']