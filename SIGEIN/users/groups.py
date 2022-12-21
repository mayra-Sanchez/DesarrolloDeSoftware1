from django.contrib.auth.models import Group

ADMINS = Group.objects.create(name='Admins')
MANAGERS = Group.objects.create(name='Managers')
OPERATORS = Group.objects.create(name='Operators')
CLIENTS = Group.objects.create(name='Clinets')
