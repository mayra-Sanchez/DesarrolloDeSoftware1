from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

app_name='users'

urlpatterns = [ 
    #path("", views.index, name='index'),
    path("register-user/", views.RegisterUserView.as_view(), name='register_user'),

    path("list-all/", views.ListAllUsersView.as_view(), name='list_all_users'),
    path("update-info/<int:pk>/", views.UpdateUsersInfoView.as_view(), name='update_user_info'),
    path("update-own-info/<int:pk>/", views.UpdateOwnInfoView.as_view(), name='update_own_info'),


    path('login/', views.MyTokenObtainPairView.as_view(), name='my_token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]