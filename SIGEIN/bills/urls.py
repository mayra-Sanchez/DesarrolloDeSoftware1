from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

app_name='bills'

urlpatterns = [
    path("user_bill/<int:user_id>", views.userBill, name='user_bill'),
    #path("", views.index, name='index'),
    
]