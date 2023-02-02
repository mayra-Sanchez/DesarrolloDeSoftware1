from rest_framework import generics, permissions, serializers

from users.models import UserRoles
from users.groups import company_groups
from users.permissions import IsAdminPermission,IsManagerPermission, IsOperatorPermission, IsOwnerPermission

from .models import Employees
from .serializers import EmployeeSerializer, updtaeOwnInfoSerializer
from .permissions import IsEmployeePermission
from .filters import EmployeeFilter

# Create your views here.

class CreateEmployeeView(generics.CreateAPIView):
    queryset = Employees.objects.all()
    serializer_class = EmployeeSerializer   
    permission_classes = [ permissions.IsAuthenticated, IsAdminPermission | permissions.IsAdminUser]

    def perform_create(self, serializer):                
        data = serializer.validated_data
        role_name = serializer.validated_data.get('role')      
        user_role = UserRoles.objects.filter( role= role_name )   

        if not user_role.exists():
            raise serializers.ValidationError(f"The role <{role_name}> DOES NOT exist in the system")
        else:            
            serializer.validated_data['role'] = user_role[0]            
            serializer.save()


class ListEmployeesView(generics.ListAPIView):        
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployeePermission | permissions.IsAdminUser] 

    def get_queryset(self):        
        user = self.request.user
        user_groups = user.groups.all()
        
        if(self.request.user and self.request.user.is_staff): ## this if for superusers, user with root as their role            
            return Employees.objects.all()

        elif(company_groups['admins'] in user_groups):
            root = UserRoles.objects.get(role='root')            
            return Employees.objects.exclude(role= root)
        
        elif(company_groups['managers'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in= ['root', 'admin'])
            return Employees.objects.exclude(role__in= unaccessible_users)

        elif(company_groups['operators'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in= ['root', 'admin', 'manager'])
            return Employees.objects.exclude(role__in= unaccessible_users)
      


class UpdateEmployeesInfoView(generics.UpdateAPIView):
    serializer_class = EmployeeSerializer
    lookup_field = 'pk'    

    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsAdminPermission]        

    def get_queryset(self):        
        user = self.request.user
        user_groups = user.groups.all()
        
        if(self.request.user and self.request.user.is_staff): ## this if for superusers, user with root as their role            
            return Employees.objects.all()

        elif(company_groups['admins'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in=['root', 'admin'])            
            return Employees.objects.exclude(role__in= unaccessible_users)



class UpdateOwnInfoView(generics.UpdateAPIView):
    serializer_class = updtaeOwnInfoSerializer
    lookup_field = 'pk'    
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission] 

    def get_queryset(self):        
        return Employees.objects.filter(id= self.request.user.id) 


class EmployeeSearchView(generics.ListAPIView):
    serializer_class = EmployeeSerializer
    filter_class = EmployeeFilter
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = Employees.objects.all()

    def get_queryset(self):
        user = self.request.user
        user_groups = user.groups.all()
        queryset = super().get_queryset()        

        if(self.request.user and self.request.user.is_staff): ## this if for superusers, user with root as their role            
            return self.filter_class(self.request.query_params, queryset=queryset).qs

        elif(company_groups['admins'] in user_groups):
            return self.filter_class(self.request.query_params, queryset=queryset).qs

        elif(company_groups['managers'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in= ['root', 'admin'])
            queryset = Employees.objects.exclude(role__in= unaccessible_users)
            
            # The qs attribute of the filter instance contains the filtered queryset.
            queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
            return queryset

        elif(company_groups['operators'] in user_groups):
            unaccessible_users = UserRoles.objects.filter(role__in= ['root', 'admin', 'manager'])
            queryset = Employees.objects.exclude(role__in= unaccessible_users)
            queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
            return queryset
