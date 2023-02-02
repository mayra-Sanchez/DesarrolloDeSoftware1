from django.db import models
from django.db.models.signals import post_save
from users.models import CustomUser, add_user_to_group

# Create your models here.

class Clients(CustomUser):

    PERSON_TYPE_CHOICES = (
        ('natural', 'natural'),
        ('juridica', 'juridica')
    )

    national_id = models.PositiveIntegerField(unique=True, null=False, blank=False)
    person_type = models.CharField(max_length=20, choices=PERSON_TYPE_CHOICES, blank=False, null=False)


post_save.connect(add_user_to_group, sender=Clients)