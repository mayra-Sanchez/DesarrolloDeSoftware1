from rest_framework import generics, permissions, serializers
from users.models import CustomUser, UserRoles
from users.permissions import IsAdminPermission, IsOwnerPermission, IsClientPermission
from employees.permissions import IsEmployeePermission
from .serializers import ClientSerializer, updtaeOwnInfoSerializer
from .models import Clients
from .filter import ClientFilter
# Create your views here.


class CreateClientView(generics.CreateAPIView):
    queryset = Clients.objects.all()
    serializer_class = ClientSerializer    
    permission_classes = [ permissions.IsAuthenticated, IsAdminPermission | permissions.IsAdminUser]

    def perform_create(self, serializer):                
        data = serializer.validated_data
        role_name = 'client'        
        user_role = UserRoles.objects.filter( role= role_name )   

        if not user_role.exists():
            raise serializers.ValidationError(f"The role <{role_name}> DOES NOT exist in the system")
        else:
            print(serializer)
            serializer.validated_data['role'] = user_role[0]            
            serializer.save()


class ListAllClientsView(generics.ListAPIView):        
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployeePermission]
    queryset = Clients.objects.all()


class ListOwnInfoView(generics.ListAPIView):
    serializer_class = ClientSerializer
    permission_classes = [permissions.IsAuthenticated, IsClientPermission]
    
    def get_queryset(self):        
        return Clients.objects.filter(id= self.request.user.id)


class UpdateClientsInfoView(generics.UpdateAPIView):
    serializer_class = ClientSerializer
    lookup_field = 'pk'
    queryset = Clients.objects.all()

    permission_classes = [permissions.IsAuthenticated, 
                          permissions.IsAdminUser | IsEmployeePermission]  
  

class UpdateOwnInfoView(generics.UpdateAPIView):
    serializer_class = updtaeOwnInfoSerializer
    lookup_field = 'pk'    
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission] 

    def get_queryset(self):        
        return Clients.objects.filter(id= self.request.user.id)


class ClientSearchView(generics.ListAPIView):
    serializer_class = ClientSerializer
    filter_class = ClientFilter
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser | IsEmployeePermission]
    queryset = Clients.objects.all()

    def get_queryset(self):        
        queryset = super().get_queryset()        

        # The qs attribute of the filter instance contains the filtered queryset.
        queryset = self.filter_class(self.request.query_params, queryset=queryset).qs
        return queryset

