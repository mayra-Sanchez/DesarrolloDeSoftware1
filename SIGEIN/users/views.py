
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, permissions
from .serializers import UserSerializer
from .models import CustomUser

# Create your views here.

class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(username= serializer.validated_data.get('email'))
    
    