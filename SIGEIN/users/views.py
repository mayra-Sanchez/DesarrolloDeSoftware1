
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework import generics, permissions
from .serializers import UserSerializer, UpdtaeUserInfoSerializer
from .models import CustomUser, UserRoles

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        custom_user = CustomUser.objects.get(email=user.email)
        # Add custom claims            
        token['username'] = custom_user.username,
        token['email'] = custom_user.email,
        token['first_name'] = custom_user.first_name,
        token['last_name'] = custom_user.last_name,
        token['phone_number'] = custom_user.phone_number,
        token['role'] = custom_user.role,        
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAdminUser]

    def perform_create(self, serializer):        
        #serializer.save(username= serializer.validated_data.get('email'))

        data = serializer.validated_data
        print("hollaaaaaaaaaaaaaaaa")
        print(data)
        user = None
        user_role = UserRoles.objects.filter( role= serializer.validated_data.get('role') )

        
    
        if(serializer.validated_data.get('role') == 'admin'):
            CustomUser.objects.create_superuser(
                email= data['email'],
                password= self.request.data.get('password'),
                first_name= data['first_name'],
                last_name= data['last_name'],
                phone_number= data['phone_number'],
                role= data['role']
            )
        else:
            if not user_role:
                raise ValueError('The role field must be set to one of this values (admin, manager, operator, client)')
            else:            
                user = serializer.save(role= user_role[0])

    

class UpdateUserInfoView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UpdtaeUserInfoSerializer
    lookup_field = 'pk'

    permission_classes = [permissions.AllowAny]  


class ListAllUsersView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    

    permission_classes = [permissions.AllowAny]        

   