from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group, Permission

custom_user = get_user_model()

group_names = (
    'admins',
    'managers',
    'operators',
    'clients'    
    )

# creating groups
company_groups = {}

for g_name in group_names:
    group = Group.objects.get_or_create(name= g_name)
    company_groups[g_name] = group[0]


#print('company_groups: ', company_groups)