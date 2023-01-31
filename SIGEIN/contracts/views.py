from rest_framework import generics, permissions, serializers
from users.models import CustomUser, UserRoles
from users.permissions import IsAdminPermission, IsOwnerPermission, IsClientPermission,IsManagerPermission
from employees.permissions import IsEmployeePermission
from .serializer import ContractSerializer
from .models import Contract
# Create your views here.


class createContractView(generics.CreateAPIView):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer    
    permission_classes = [ permissions.IsAuthenticated, IsAdminPermission | permissions.IsAdminUser | IsManagerPermission]

    def perform_create(self, serializer):                
        data = serializer.validated_data
        print(serializer)          
        serializer.save()


class listAllContract(generics.ListAPIView):        
    serializer_class = ContractSerializer
    permission_classes = [permissions.IsAuthenticated, IsEmployeePermission]
    queryset = Contract.objects.all()

class updateContractView(generics.UpdateAPIView):
    serializer_class = ContractSerializer
    lookup_field = 'pk'
    queryset = Contract.objects.all()

    permission_classes = [permissions.IsAuthenticated, 
                          permissions.IsAdminUser | IsEmployeePermission]  
  

class findIdContract(generics.UpdateAPIView):
    serializer_class = ContractSerializer
    lookup_field = 'pk'    
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission] 

    def get_queryset(self):        
        return Contract.objects.filter(id= self.request.contract.id)

