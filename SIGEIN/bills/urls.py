from django.urls import path

from . import views

app_name='bills'

urlpatterns = [
    path("user_bill/<int:user_id>", views.pdf),
    
]