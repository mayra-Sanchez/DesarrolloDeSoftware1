from django.utils import timezone
from rest_framework import serializers
from payments.models import Payment
from .models import ElectricityPrice, EnergyConsumptions


class ElectricityPriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ElectricityPrice
        fields = ('id', 'date', 'price')        
        extra_kwargs = {   
            'id': {'read_only': True},                                           
            }


class EnergyConsumptionSerializer(serializers.ModelSerializer):

    PAYMENT_PENALTY = 2/100 # 2%

    client_national_id = serializers.SerializerMethodField()
    subtotal_amount_to_pay = serializers.SerializerMethodField()
    penalty_percentage = serializers.SerializerMethodField()
    missing_subtotal_amount_to_pay = serializers.SerializerMethodField()
    total_amount_to_pay = serializers.SerializerMethodField()
    contract_address = serializers.SerializerMethodField()

    class Meta:
        model = EnergyConsumptions
        fields = (
         'id',
         'id_contract',
         'client_national_id',
         'contract_address',
         'price_kwh',
         'amount_kwh', 
         'billing_period_starts', 
         'billing_period_ends', 
         'issue_date', 
         'due_date', 
         'is_fully_paid',
         'subtotal_amount_to_pay',
         'penalty_percentage',
         'missing_subtotal_amount_to_pay',
         'total_amount_to_pay',
         )        
        extra_kwargs = {   
            'id': {'read_only': True},
            'id_contract': {'read_only': True},
            'missing_amount_to_pay': {'read_only': True},
            'total_amount_to_pay': {'read_only': True},
            }

    def get_client_national_id(self, obj):
        return obj.id_contract.id_client.national_id


    def get_missing_subtotal_amount_to_pay(self, obj):
        all_payments = Payment.objects.filter(id_energy_consumption= obj.id)
        total = obj.price_kwh.price * obj.amount_kwh

        if not all_payments.exists():
            return total
        else:
            for payment in all_payments:
                total -= payment.amount

            return total

    def get_subtotal_amount_to_pay(self, obj):
        all_payments = Payment.objects.filter(id_energy_consumption= obj.id)
        total = obj.price_kwh.price * obj.amount_kwh  

        return total

    def get_penalty_percentage(self, obj):
        total = 0.0

        if(obj.due_date < timezone.now().date()):            
            total = self.PAYMENT_PENALTY

        return total

    def get_total_amount_to_pay(self, obj):
        total = float( self.get_missing_subtotal_amount_to_pay(obj) )
        total = total*self.get_penalty_percentage(obj) + total

        return total


    def get_contract_address(self, obj):
            return obj.id_contract.address   


