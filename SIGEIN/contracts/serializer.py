from django.utils import timezone
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import CustomUser
from .models import Clients
from .models import Contract


class ContractSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contract
        fields = ('id_client', 'address', 'city', 'zip_code', 'is_active', 'contract_type', 'end_date')        
        



    #def create(self, validated_data):
         #return Contract.objects.create_contracts(**validated_data)


    def update(self, instance, validated_data):                

        return super().update(instance, validated_data)

                         