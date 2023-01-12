from rest_framework import permissions
from users.models import  UserRoles
from users.groups import company_groups
from .models import Employees


class IsEmployeePermission(permissions.BasePermission):
    def has_permission(self, request, view):

        role_names = ['admin', 'manager', 'operator', 'root']

        roles = UserRoles.objects.filter(role__in= role_names)        
        employee = Employees.objects.filter(id= request.user.id)      

        if(roles.exists() and employee.exists()):                      
            return employee[0].role in roles and employee[0].groups.filter(name__in= company_groups.keys()).exists()
        else:
            return False