from rest_framework import serializers
from .models import ElectricityPrice, EnergyConsumptions


class ElectricityPriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ElectricityPrice
        fields = ('id', 'date', 'price')        
        extra_kwargs = {   
            'id': {'read_only': True},                                           
            }


class EnergyConsumptionSerializer(serializers.ModelSerializer):

    client_national_id = serializers.SerializerMethodField()

    class Meta:
        model = EnergyConsumptions
        fields = (
         'id',
         'id_contract',
         'client_national_id',
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

    def get_client_national_id(self, obj):
        return obj.id_contract.id_client.national_id

        
           