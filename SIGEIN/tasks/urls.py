from django.urls import path
from .views import UsuariosView
from .views import RolesView
from .views import UsuarioIdView

urlpatterns = [
    path('users/',UsuariosView.as_view(),name='Usuario_list'),
    path('roles/<int:id>',RolesView.as_view(),name='roles_list'),
    path('users/<int:id>',UsuarioIdView.as_view(),name='UsuarioId')


]
