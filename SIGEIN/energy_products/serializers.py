from rest_framework import serializers
from .models import ElectricityPrice, EnergyConsumptions


class ElectricityPriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ElectricityPrice
        fields = ('id', 'date', 'price')        
        extra_kwargs = {   
            'id': {'read_only': True},                                           
            }