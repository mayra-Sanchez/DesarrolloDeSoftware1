from rest_framework import generics, permissions, serializers
from users.permissions import IsAdminPermission, IsOwnerPermission, IsClientPermission
from employees.permissions import IsEmployeePermission
from clients.models import Clients
from .models import ElectricityPrice
from .serializers import ElectricityPriceSerializer
from .filters import ElectricityPriceFilter


# Create your views here.

class ListAllElectricityPricesView(generics.ListAPIView):
    serializer_class = ElectricityPriceSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = ElectricityPrice.objects.all()


class SearchElectricityPriceView(generics.ListAPIView):
    serializer_class = ElectricityPriceSerializer
    filter_class = ElectricityPriceFilter
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = ElectricityPrice.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()

        # The qs attribute of the filter instance contains the filtered queryset.
        queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
        return queryset

