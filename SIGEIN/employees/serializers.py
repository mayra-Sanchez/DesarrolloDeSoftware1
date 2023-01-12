from rest_framework import serializers
from users.models import CustomUser, UserRoles
from .models import Employees


class EmployeeSerializer(serializers.ModelSerializer):

    ROLE_CHOICES = (
        ("admin", "admin"),
        ("manager", "manager"),
        ("operator", "operator"),
    )

    role = serializers.ChoiceField(choices=ROLE_CHOICES)

    class Meta:
        model = Employees
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'role', 'is_active')        
        extra_kwargs = {
            'password': {'write_only': True}, 
            'id': {'read_only': True},                                           
            }


    def validate(self, data):
        # Perform validation on email field        
        email = data.get('email', None)
        if email:
            if CustomUser.objects.filter(username= email).exists():
                raise serializers.ValidationError("A username with this email already exists.")

        # Assign email to username field
        data['username'] = email

        return data     


    def create(self, validated_data):
        return Employees.objects.create_user(**validated_data)     


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



class updtaeOwnInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employees
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