from collections import OrderedDict
from rest_framework import serializers
from energy_products.models import EnergyConsumptions
from advertising_products.models import AdvertisingConsumption
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):

    SERVICE_PAID_CHOICES = (
        ('energy consumption', 'energy consumption'),
        ('advertising consumption', 'advertising consumption'),
    )

    service_paid = serializers.ChoiceField(choices=SERVICE_PAID_CHOICES)
    client_national_id = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = (
            'id',
            'amount',
            'penalty',
            'date',
            'type',
            'payment_institution',
            'is_deposit',
            'service_paid',
            'id_energy_consumption',
            'id_advertinsing_consumption',
            'client_national_id'
        )        
        extra_kwargs = {   
            'id': {'read_only': True},
            'client_national_id': {'read_only': True},                                           
            }

    
    def get_client_national_id(self, obj):
        national_id: int

        if(obj.service_paid == self.SERVICE_PAID_CHOICES[0][0]):
            national_id = obj.id_energy_consumption.id_contract.id_client.national_id
        elif(obj.service_paid == self.SERVICE_PAID_CHOICES[1][0]):
            national_id = obj.id_advertising_consumption.id_contract.id_client.national_id

        return national_id

    def validate(self, data):
        amount = data.get('amount', 0.0)
        if amount<=0:
            raise serializers.ValidationError(f'the amount being deposit/pay has to be grater than zero')            

        return super().validate(data)


    def create(self, validated_data):
        print(validated_data)
        return Payment.objects.create(**validated_data)

