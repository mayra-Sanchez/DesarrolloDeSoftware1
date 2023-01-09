from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import UserRoles

custom_user_model = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        custom_user = custom_user_model.objects.get(email=user.email)
        # Add custom claims            
        token['username'] = custom_user.username,
        token['email'] = custom_user.email,
        token['first_name'] = custom_user.first_name,
        token['last_name'] = custom_user.last_name,
        token['phone_number'] = custom_user.phone_number,
        token['role'] = custom_user.role.__str__(),        
        # ...

        return token    


class UserSerializer(serializers.ModelSerializer):

    ROLE_CHOICES = (
        ("admin", "admin"),
        ("manager", "manager"),
        ("operator", "operator"),
        ("client", "client"),
        ("root", "root")
    )

    role = serializers.ChoiceField(choices=ROLE_CHOICES)    

    class Meta:
        model = custom_user_model
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'role', 'is_active')        
        extra_kwargs = {
            'password': {'write_only': True}, 
            'id': {'read_only': True},                      
            'is_active': {'read_only': True}            
            }
        

    def validate(self, data):
        # Perform validation on email field
        email = data.get('email', None)
        if email:
            if custom_user_model.objects.filter(username= email).exists():
                raise serializers.ValidationError("A username with this email already exists.")

        # Assign email to username field
        data['username'] = email

        return data


    def create(self, validated_data):
         return custom_user_model.objects.create_user(**validated_data)


    def update(self, instance, validated_data):                
        role_name = validated_data.get('role')
        password = validated_data.get('password')

        if(role_name is not None):
            user_role = UserRoles.objects.filter( role= role_name )
            if(not user_role.exists()):
                raise serializers.ValidationError(f"The role <{role_name}> DOES NOT exist in the system")
            validated_data['role'] = user_role[0]        

        if(password is not None):            
            instance.set_password(password)
            instance.save()
            validated_data.pop('password')


        return super().update(instance, validated_data)

                         