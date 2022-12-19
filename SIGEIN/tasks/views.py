from django.shortcuts import render
from django.views import View
from django.http.response import JsonResponse
from .models import usuarios
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import roles
import json
# Create your views here.


class UsuariosView(View):
    #Impide el error cross origin   
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    
    
    #Obtiene la lista de todos los usuarios
    def get(self, request):
        list_usuarios=list(usuarios.objects.values())
        if len(list_usuarios)>0:
            datos={'message':"Exito",'usuarios':list_usuarios}
        else:
            datos={'message':"Usuarios no encontrados"}
        return JsonResponse(datos)
    
 
    
    #Agregar un nuevo usuario, con su respectivo id foraneo
    def post(self, request):
        jd = json.loads(request.body)
        
        usuarios.objects.create(nombre=jd['nombre'],celular=jd['celular'],email=jd['email'],password=jd['password'],estado=jd['estado'],tipos_Cliente_id=jd['tipos_Cliente'])
        datos={'message':"Exito"}
        return JsonResponse(datos)
    
    def put(self, request):
        pass
    
    def delete(self, request):
        pass
    
    
#Clase para vistas de los roles en la que busca los roles por id
class RolesView(View):
    
    def get(self, request, id=0):
        if (id > 0):
            rol = list(roles.objects.filter(id=id).values())
            if len(rol) > 0:
                rolid = rol[0]
            else:
                datos = {'message': "Company not found..."}
            return JsonResponse(rolid)
        else:
            rol = list(roles.objects.values())
            if len(rol) > 0:
                datos = {'message': "Success", 'companies': rol}
            else:
                datos = {'message': "Companies not found..."}
            return JsonResponse(rolid)
   
   
   #Clase para operar con un solo usuario buscado por su id 
class UsuarioIdView(View):
       #Busca usuario por id
    def get(self, request,id=0):
        if (id > 0):
            usuario = list(usuarios.objects.filter(id=id).values())
            if len(usuario) > 0:
                usuarioId = usuario[0]
            else:
                datos = {'message': "Company not found..."}
            return JsonResponse(usuarioId)
        else:
            usuario = list(usuarios.objects.values())
            if len(usuario) > 0:
                datos = {'message': "Success", 'companies': usuario}
            else:
                datos = {'message': "Companies not found..."}
            return JsonResponse(usuarioId)