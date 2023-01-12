from django_filters import rest_framework as filters
from users.models import UserRoles
from .models import Employees


class EmployeeFilter(filters.FilterSet):

    email = filters.CharFilter(field_name="email", lookup_expr='iexact')
    name = filters.CharFilter(field_name="first_name", lookup_expr="icontains")
    last_name = filters.CharFilter(field_name="last_name", lookup_expr="icontains")
    phone_number = filters.CharFilter(field_name="phone_number", lookup_expr="exact")
    #role = filters.MultipleChoiceFilter(field_name="role", exclude=['client'], method='filter') #NO FUNCIONO
    role = filters.ModelChoiceFilter(queryset= UserRoles.objects.exclude(role='client'), to_field_name='role')
    is_active = filters.BooleanFilter(field_name="is_active", lookup_expr="exact")

    class Meta:
        model = Employees
        fields = ['email', 'name', 'last_name', 'phone_number', 'role', 'is_active']