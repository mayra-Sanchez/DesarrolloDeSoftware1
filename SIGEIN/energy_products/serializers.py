from rest_framework import serializers
from .models import ElectricityPrice, EnergyConsumptions


class ElectricityPriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ElectricityPrice
        fields = ('id', 'date', 'price')        
        extra_kwargs = {   
            'id': {'read_only': True},                                           
            }


class EnergyConsumptionSerializar(serializers.ModelSerializer):

    class Meta:
        model = EnergyConsumptions
        fields = (
         'id',
         'id_contract',
         'price_kwh',
         'amount_kwh', 
         'billing_period_starts', 
         'billing_period_ends', 
         'issue_date', 
         'due_date', 
         'is_fully_paid'
         )        
        extra_kwargs = {   
            'id': {'read_only': True},
            'id_contract': {'read_only': True},                                           
            }
           