from django.contrib.auth import get_user_model
from rest_framework import serializers

MyUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    role = serializers.CharField(max_length=20)

    class Meta:
        model = MyUser
        fields = ('id', 'email', 'password', 'first_name', 'last_name', 'phone_number', 'role')        
        extra_kwargs = {
            'password': {'write_only': True}, 
            'id': {'read_only': True}
            }

    def create(self, validated_data):
        return MyUser.objects.create_user(**validated_data)

    def create_admin(self, validated_data):
        return MyUser.objects.create_superuser(**validated_data)        



class UpdtaeUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'email', 'first_name', 'last_name', 'phone_number', 'role')        
        extra_kwargs = {
            'id': {'read_only': True}
            }

                         