from django.core.mail import send_mail
from django.utils import timezone
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.models import Group
from django.conf import settings
from email.utils import formatdate
from rest_framework import generics, permissions, serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from user_agents import parse
from ipware import get_client_ip
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from .models import CustomUser, UserRoles
from .groups import company_groups ## DO NOT erase this line
from .permissions import IsAdminPermission, IsManagerPermission, IsOwnerPermission, IsOperatorPermission

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def send_login_email(self, request, user):
        ua = request.META.get('HTTP_USER_AGENT')
        user_agent = parse(ua)
        OS = user_agent.os.family
        OS_version = user_agent.os.version_string
        browser = user_agent.browser.family
        browser_version = user_agent.browser.version_string
        is_mobile = user_agent.is_mobile
        is_PC = user_agent.is_pc

        ip_address, is_routable = get_client_ip(request)
        login_time = timezone.localtime(timezone.now()).strftime('%A, %b %d, %Y %H:%M')

        subject = "New Login in your SIGEIN account"
        email_body = f"You logged in from ip:{ip_address}\n \
                        At: {login_time}\n \
                        Browser: {browser} {browser_version}\n \
                        OS: {OS} {OS_version}\n \
                        Divice: {'mobile' if is_mobile else ('PC' if is_PC else 'unknown') }\n \
                        "
        
        if(settings.SEND_EMAIL_AFTER_LOGIN):
            # this function returns 1 if the email was successfully sent, false otherwise
            send_mail(
                subject= subject,
                message= email_body,
                from_email= settings.EMAIL_HOST_USER,
                recipient_list= [user.email],
                fail_silently=True,
            # headers={'Date': formatdate()}
            )


    def post(self, request, *args, **kwargs):        
        # Call the `post` method of the parent class to obtain the tokens
        response = super().post(request, *args, **kwargs)

        # Update the `last_login` attribute of the authenticated user        
        user = CustomUser.objects.get(email= request.data['email'])           
        if user:
            user.last_login = timezone.now()            
            user.save()
            self.send_login_email(request, user)

        return response




class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [ permissions.IsAuthenticated, IsAdminPermission | permissions.IsAdminUser]
   

    def perform_create(self, serializer):                
        data = serializer.validated_data
        role_name = serializer.validated_data.get('role')
        user_role = UserRoles.objects.filter( role= role_name )        
  
        if(serializer.validated_data.get('role') == 'root'):
            if(permissions.IsAdminUser.has_permission(self=self, request=self.request, view=self)):
                CustomUser.objects.create_superuser(
                    email= data['email'],
                    password= self.request.data.get('password'),
                    first_name= data['first_name'],
                    last_name= data['last_name'],
                    phone_number= data['phone_number'],
                    role= data['role']
                )
            else:
                self.permission_denied(request=self.request, message='you dont have the permissions to create root users')                
        else:
            if not user_role.exists():
                raise serializers.ValidationError(f"The role <{role_name}> DOES NOT exist in the system")
            else:            
                user = serializer.save(role= user_role[0])

    

class UpdateUsersInfoView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    lookup_field = 'pk'

    permission_classes = [permissions.IsAuthenticated, 
                          permissions.IsAdminUser | IsAdminPermission | IsManagerPermission | IsOperatorPermission]  

    def get_queryset(self):        
        user = self.request.user
        user_groups = user.groups.all()
        
        if(self.request.user and self.request.user.is_staff): ## this if for superusers, user with root as their role            
            return CustomUser.objects.all()

        elif(company_groups['admins'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in=['root', 'admin'])            
            return CustomUser.objects.exclude(role__in= unaccessible_users)
        
        elif(company_groups['managers'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in= ['root', 'admin', 'manager'])
            return CustomUser.objects.exclude(role__in= unaccessible_users)

        elif(company_groups['operators'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in= ['root', 'admin', 'manager', 'operator'])
            return CustomUser.objects.exclude(role__in= unaccessible_users)
       


class UpdateOwnInfoView(generics.UpdateAPIView):
    serializer_class = UserSerializer
    lookup_field = 'pk'    
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission] 

    def get_queryset(self):        
        return CustomUser.objects.filter(id= self.request.user.id)



class ListAllUsersView(generics.ListAPIView):        
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


    def get_queryset(self):        
        user = self.request.user
        user_groups = user.groups.all()
        
        if(self.request.user and self.request.user.is_staff): ## this if for superusers, user with root as their role            
            return CustomUser.objects.all()

        elif(company_groups['admins'] in user_groups):
            root = UserRoles.objects.get(role='root')            
            return CustomUser.objects.exclude(role= root)
        
        elif(company_groups['managers'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in= ['root', 'admin'])
            return CustomUser.objects.exclude(role__in= unaccessible_users)

        elif(company_groups['operators'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in= ['root', 'admin', 'manager'])
            return CustomUser.objects.exclude(role__in= unaccessible_users)

        elif(company_groups['clients'] in user_groups):            
            return CustomUser.objects.filter(id= self.request.user.id) 
                         
        



       

   