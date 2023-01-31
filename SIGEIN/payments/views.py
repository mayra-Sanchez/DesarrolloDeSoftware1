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

        data = serializer.data
        consumption_id = data.get('id_energy_consumption')      
        service_paid = data.get('service_paid')
        amount = data.get('amount', 0.0)
        is_deposit = data.get('is_deposit', False)
        
        #queryset = super().get_queryset()
        penalty = 0.0
        consumption = []
        all_payments = []

        if service_paid == self.serializer_class().SERVICE_PAID_CHOICES[0][0]:
            consumption = EnergyConsumptions.objects.get(pk= consumption_id)
            data['id_energy_consumption'] = consumption   
            all_payments = Payment.objects.filter(id_energy_consumption= consumption_id) 

        elif service_paid == self.serializer_class().SERVICE_PAID_CHOICES[1][0]:
            consumption = AdvertisingConsumption.objects.get(pk= consumption_id)
            data['id_advertising_consumption'] = consumption 
            all_payments = Payment.objects.filter(id_advertising_consumption= consumption_id) 

        if consumption.is_fully_paid:
            raise serializers.ValidationError(f'this consumption is alredy completly paid.')


        if(all_payments.exists()):
            total = 0
            for payment in all_payments:
                total += payment.amount

            total_payment = consumption.amount_kwh*consumption.price_kwh.price
      
            print(type(amount))
            print(consumption.is_fully_paid)
            if(total >= total_payment ):
                raise serializers.ValidationError(f'this consumption is alredy completly paid.')
            elif(float(total) + float(amount) == float(total_payment)):
                print("holaaaaaaaa")
                consumption.is_fully_paid = True
                print(consumption.is_fully_paid)
                consumption.save()
            print(consumption.is_fully_paid)

        if not is_deposit:
            total_payment = consumption.amount_kwh*consumption.price_kwh.price
            if(float(amount) >= float(total_payment)):
                consumption.is_fully_paid = True
                consumption.save()
            else:
                data['is_deposit'] = True
                is_deposit = True

        if consumption.due_date < timezone.now().date():
            penalty= self.payment_penalty
            data['penalty'] = penalty
            
        data.pop('client_national_id')

        return Payment.objects.create(**data)

