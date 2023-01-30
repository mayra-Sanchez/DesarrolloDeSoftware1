from django.utils import timezone
from rest_framework import generics, permissions, serializers
from users.permissions import IsAdminPermission, IsManagerPermission, IsOwnerPermission, IsClientPermission
from employees.permissions import IsEmployeePermission
from energy_products.models import EnergyConsumptions
from advertising_products.models import AdvertisingConsumption
from .models import Payment
from .serializers import PaymentSerializer

# Create your views here.


class ListAllPaymentsView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = Payment.objects.all()


class CreatePaymentView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = Payment.objects.all()

    payment_penalty = 2/100 # 2%


    def perform_create(self, serializer):

        data = serializer.validated_data
        consumption_id = data.get('id_energy_consumption')      
        service_paid = data.get('service_paid')
        amount = data.get('amount', 0.0)
        is_deposit = data.get('is_deposit', False)
        
        queryset = super().get_queryset()
        penalty = 0.0
        consumption: object

        if service_paid == self.serializer_class().SERVICE_PAID_CHOICES[0][0]:
            consumption = EnergyConsumptions.objects.filter(pk= consumption_id)            
        elif service_paid == self.serializer_class().SERVICE_PAID_CHOICES[1][0]:
            consumption = AdvertisingConsumption.objects.filter(pk= consumption_id)

        if consumption.is_fully_paid:
            raise serializers.ValidationError(f'this consumption is alredy completly paid.')

        if not is_deposit:
            total_payment = consumption.amount_kwh*consumption.price_kwh.price
            if(amount >= total_payment):
                consumption.is_fully_paid = True
            else:
                data['is_deposit'] = True
                is_deposit = True

        if consumption.due_date < timezone.now().date():
            penalty= self.payment_penalty
            data['penalty'] = penalty
            

        super().perform_create(data)

