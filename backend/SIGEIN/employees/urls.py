from django.urls import path
from . import views

app_name='employees'

urlpatterns = [     
    path('create-employee/', views.CreateEmployeeView.as_view(), name='create_new_employee'),
    path('update-info/<int:pk>/', views.UpdateEmployeesInfoView.as_view(), name='update_client_info'),
    path('list-all/', views.ListEmployeesView.as_view(), name='list_all_clients'),
    path('update-own-info/<int:pk>/', views.UpdateOwnInfoView.as_view(), name='update_client_own_info'),
    path('search/', views.EmployeeSearchView.as_view(), name='search_employee'),
    
]