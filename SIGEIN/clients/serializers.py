from rest_framework import serializers
from users.models import CustomUser
from .models import Clients


class ClientSerializer(serializers.ModelSerializer):

    PERSON_TYPE_CHOICES = (
        ('natural', 'natural'),
        ('juridica', 'juridica')
    )

    person_type = serializers.ChoiceField(choices=PERSON_TYPE_CHOICES) 
    role = serializers.CharField(default='client') 

    class Meta:
        model = Clients
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'role','national_id', 'person_type', 'is_active')        
        extra_kwargs = {
            'password': {'write_only': True}, 
            'id': {'read_only': True},  
            'role': {'read_only': True},                                           
            }


    def validate(self, data):
        # Perform validation on email field
        role_name = data.pop('role', None)
        email = data.get('email', None)
        if email:
            if CustomUser.objects.filter(username= email).exists():
                raise serializers.ValidationError("A username with this email already exists.")

        # Assign email to username field
        data['username'] = email

        return data


    def create(self, validated_data):        
        return Clients.objects.create_user(**validated_data)   
       



class updtaeOwnInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Clients
        fields = ('id', 'email', 'password', 'phone_number')        
        extra_kwargs = {
            'password': {'write_only': True}, 
            'id': {'read_only': True},                                           
            }


    def update(self, instance, validated_data):                        
        password = validated_data.get('password')       

        if(password is not None):            
            instance.set_password(password)
            instance.save()
            validated_data.pop('password')


        return super().update(instance, validated_data)              