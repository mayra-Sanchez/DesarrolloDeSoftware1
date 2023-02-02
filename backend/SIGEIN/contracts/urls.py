from django.urls import path


from . import views

app_name='contracts'

urlpatterns = [ 
  
    path("create-contract/", views.createContractView.as_view(), name='create_contract'),
    path("find-id-contract/<int:pk>", views.findIdContract.as_view(), name='find_contract_id'),
    path("find-list-contract/", views.listAllContract.as_view(), name='find_list_contract'),
    path("update-contract/<int:pk>", views.updateContractView.as_view(), name='update_contract'),
   
    
]