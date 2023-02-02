from django_filters import rest_framework as filters
from .models import Clients


class ClientFilter(filters.FilterSet):

    PERSON_TYPE_CHOICES = (
        ('natural', 'natural'),
        ('juridica', 'juridica')
    )

    email = filters.CharFilter(field_name="email", lookup_expr='iexact')
    national_id = filters.NumberFilter(field_name='national_id', lookup_expr='exact')
    name = filters.CharFilter(field_name="first_name", lookup_expr="icontains")
    last_name = filters.CharFilter(field_name="last_name", lookup_expr="icontains")
    phone_number = filters.CharFilter(field_name="phone_number", lookup_expr="exact")    
    person_type = filters.ChoiceFilter(choices= PERSON_TYPE_CHOICES)
    is_active = filters.BooleanFilter(field_name="is_active", lookup_expr="exact")

    class Meta:
        model = Clients
        fields = ['email', 'national_id', 'name', 'last_name', 'phone_number', 'role', 'person_type', 'is_active']