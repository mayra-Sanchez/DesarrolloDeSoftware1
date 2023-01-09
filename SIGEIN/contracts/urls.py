from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

app_name='contracts'

urlpatterns = [
    path("<int:contract_id>", views.contract),
    #path("", views.index, name='index'),
    
]