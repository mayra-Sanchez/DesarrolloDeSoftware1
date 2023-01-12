from django.db import models
from django.db.models.signals import post_save
from users.models import CustomUser, add_user_to_group

# Create your models here.

class Employees(CustomUser):
    pass


post_save.connect(add_user_to_group, sender=Employees)
