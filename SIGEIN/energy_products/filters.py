from django_filters import rest_framework as filters
from .models import ElectricityPrice, EnergyConsumptions


class ElectricityPriceFilter(filters.FilterSet):
   
    month = filters.NumberFilter(field_name="date", lookup_expr='month')
    year = filters.NumberFilter(field_name="date", lookup_expr='year')

    class Meta:
        model = ElectricityPrice
        fields = ['date', 'price', 'year', 'month']


class EnergyConsumptionFilter(filters.FilterSet):
   
    issue_month = filters.NumberFilter(field_name="issue_date", lookup_expr='month')
    issue_year = filters.NumberFilter(field_name="issue_date", lookup_expr='year')
    due_month = filters.NumberFilter(field_name="due_date", lookup_expr='month')
    due_year = filters.NumberFilter(field_name="due_date", lookup_expr='year')
    billing_period_start_month = filters.NumberFilter(field_name="billing_period_starts", lookup_expr='month')
    billing_period_start_year = filters.NumberFilter(field_name="billing_period_starts", lookup_expr='year')
    billing_period_ends_month = filters.NumberFilter(field_name="billing_period_ends", lookup_expr='month')
    billing_period_ends_year = filters.NumberFilter(field_name="billing_period_ends", lookup_expr='year')

    national_id = filters.CharFilter(method= 'filter_by_national_id')

    extra_fields = (
        'national_id'
    )

    class Meta:
        model = EnergyConsumptions
        fields = [
         'id',
         'id_contract',
         'price_kwh',
         'amount_kwh', 
         'billing_period_starts', 
         'billing_period_ends', 
         'issue_date', 
         'due_date', 
         'is_fully_paid',

         'issue_month',
         'issue_year',
         'due_month',
         'due_year',
         'billing_period_start_month',
         'billing_period_start_year',
         'billing_period_ends_month',
         'billing_period_ends_year',
         ]


    def filter_by_national_id(self, queryset, name, value):
        return queryset.filter(id_contract__id_client__national_id = value)

