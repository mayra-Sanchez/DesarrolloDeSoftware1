from django.urls import path
from . import views

app_name='clients'

urlpatterns = [     
    path('list-payments/', views.ListAllPaymentsView.as_view(), name='list_all_payments'),
    path('create-payment/', views.CreatePaymentView.as_view(), name='create_payment'),

]