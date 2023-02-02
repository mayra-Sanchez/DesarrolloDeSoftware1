from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

app_name='users'

urlpatterns = [ 
    
     ## NOO usar estos que estan comentados, si hay dudas preguntete a Bailon el pq
     ## debe de usar las urls disponibles en las apps clients y employees

    # path("register-user/", views.RegisterUserView.as_view(), name='register_user'),
    # path("list-all/", views.ListAllUsersView.as_view(), name='list_all_users'),
    # path("update-info/<int:pk>/", views.UpdateUsersInfoView.as_view(), name='update_user_info'),
    # path("update-own-info/<int:pk>/", views.UpdateOwnInfoView.as_view(), name='update_own_info'),


    path('login/', views.MyTokenObtainPairView.as_view(), name='my_token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]