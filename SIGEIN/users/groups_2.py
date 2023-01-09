from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

custom_user = get_user_model()

# creating groups
admins_group = Group.objects.get_or_create(name='admins')
managers_group = Group.objects.get_or_create(name='managers')
operators_group = Group.objects.get_or_create(name='operators')
clients_group = Group.objects.get_or_create(name='clients')


# getting django default permissions
#content_type = 
view_users = Permission.objects.get(codename='view_user')
add_users = Permission.objects.get(codename='add_user')
change_users = Permission.objects.get(codename='change_user')


####  CREATING PERMISSIONS  ####
# client permissions
view_own_info = Permission.objects.get_or_create(
    codename='view_own_info',
    name='Can view its own info',
    content_type= ContentType.objects.get_for_model(custom_user)
     )

change_own_email = Permission.objects.get_or_create(
    codename='change_own_email',
    name='Can change its own email',
    content_type= ContentType.objects.get_for_model(custom_user)
     )  

change_own_password = Permission.objects.get_or_create(
    codename='change_own_password',
    name='Can change its own password',
    content_type= ContentType.objects.get_for_model(custom_user)
     )

change_own_phone_number =  Permission.objects.get_or_create(
    codename='change_own_phone_number',
    name='Can change its own phone number',
    content_type= ContentType.objects.get_for_model(custom_user)
     )            

# clients group
clients_group[0].permissions.add(
    view_own_info[0],
    change_own_email[0],
    change_own_password[0],
    change_own_phone_number[0]
    )



# operators permissions
view_all_clients =  Permission.objects.get_or_create(
    codename='view_all_cleints',
    name='Can view all clients',
    content_type= ContentType.objects.get_for_model(custom_user)
     )

""" this will allow the operator to change the info that doesnt involve the role, status and permissions """
change_clients_info = Permission.objects.get_or_create(
    codename='change_clients_info',
    name='Can change any client info',
    content_type= ContentType.objects.get_for_model(custom_user)
     ) 

# operators group
operators_group[0].permissions.add(
    *clients_group[0].permissions.all(),
    view_all_clients[0],
    change_clients_info[0]
    )


# Managers permissions
view_all_operators = Permission.objects.get_or_create(
    codename='view_all_operators',
    name='Can view all operators',
    content_type= ContentType.objects.get_for_model(custom_user)
     )

""" this will allow the manager to change the info that doesnt involve the role, status and permissions """
change_operators_info = Permission.objects.get_or_create(
    codename='change_operators_info',
    name='Can change any operator info',
    content_type= ContentType.objects.get_for_model(custom_user)
     )

# managers group
managers_group[0].permissions.add(
    *operators_group[0].permissions.all(),
    view_all_operators[0],
    change_operators_info[0]
    )     


# Admins permissions
""" this permission will allow to create any type of user except superusers """
create_company_user = Permission.objects.get_or_create(
    codename='create_company_user',
    name='Can create company user',
    content_type= ContentType.objects.get_for_model(custom_user)
     )

view_all_company_users = Permission.objects.get_or_create(
    codename='view_all_company_users',
    name='Can view all the company users',
    content_type= ContentType.objects.get_for_model(custom_user)
     )   

""" this will allow the manager to change all the info of the user, except the one related whit the superuser stuff """
change_all_non_admin_users_info = Permission.objects.get_or_create(
    codename='change_all_non_admin_users_info',
    name='Can change all non admin users info',
    content_type= ContentType.objects.get_for_model(custom_user)
     )
   
deactivate_non_admin_users = Permission.objects.get_or_create(
    codename='deactivate_non_admin_users',
    name='Can deactivate all non admin users',
    content_type= ContentType.objects.get_for_model(custom_user)
     )


# admins group
admins_group[0].permissions.add(
    *managers_group[0].permissions.all(),
    create_company_user[0],
    view_all_company_users[0],
    change_all_non_admin_users_info[0],
    deactivate_non_admin_users[0]
    )  

# ####  ASSIGNING PERMISSIONS TO THE GROUPS ####
# # clients group
# #clients_group[0].permissions.add()


# admins_group[0].permissions.add(add_users)


# print("holaaaaaa putos!!!!!!!!!!")
# print(admins_group)
# print(admins_group[0])
# print(type(admins_group))
# print(create_user)
# print(create_user[0])

#print(prueba)

