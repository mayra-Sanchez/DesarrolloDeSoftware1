from django.db import models
from users.models import CustomUser

# Create your models here.

class Contracts(models.Model):
    cliente = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    no_medidor = models.CharField(max_length=200)
    direccion = models.CharField(max_length=200)