from django.contrib.auth.models import Group
from rest_framework import permissions
from .models import CustomUser, UserRoles


class IsAdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        role = UserRoles.objects.filter(role= 'admin')        
        user = CustomUser.objects.filter(id= request.user.id)      

        if(role.exists() and user.exists()):
            return user[0].role == role[0] and user[0].groups.filter(name='admins').exists()
        else:
            return False


class IsManagerPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        role = UserRoles.objects.filter(role= 'manager')        
        user = CustomUser.objects.filter(id= request.user.id)      

        if(role.exists() and user.exists()):
            return user[0].role == role[0] and user[0].groups.filter(name='managers').exists()
        else:
            return False            


class IsOperatorPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        role = UserRoles.objects.filter(role= 'operator')        
        user = CustomUser.objects.filter(id= request.user.id)      

        if(role.exists() and user.exists()):
            return user[0].role == role[0] and user[0].groups.filter(name='operators').exists()
        else:
            return False     


class IsClientPermission(permissions.BasePermission):
    def has_permission(self, request, view):

        role = UserRoles.objects.filter(role= 'client')        
        user = CustomUser.objects.filter(id= request.user.id)      

        if(role.exists() and user.exists()):
            return user[0].role == role[0] and user[0].groups.filter(name='clients').exists()
        else:
            return False   


class IsOwnerPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Allow access if the user is the owner of the object        
        return obj.id == request.user.id