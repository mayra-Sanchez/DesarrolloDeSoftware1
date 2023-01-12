from django.db import models
from clients.models import Clients

# Create your models here.

class ContractType(models.Model):
    contract_type = models.CharField(max_length=30, null=False, blank=False, unique=True)


class Estrato(models.Model):
    estrato_number = models.PositiveIntegerField(null=False, blank=False, unique=True)
    subsidy = models.DecimalField(default=0.0, max_digits=5, decimal_places=3, null=False, blank=False)


class Contract(models.Model):
    id_client = models.ForeignKey(Clients, on_delete=models.SET_NULL, null=True)
    address = models.CharField(max_length=60, blank=False, null=False)
    city = models.CharField(max_length=20, blank=False, null=False)
    zip_code = models.CharField(max_length=20, blank=False, null=False)
    contract_type = models.ForeignKey(ContractType, on_delete=models.DO_NOTHING, null=False, blank=False)


class EnergyContract(Contract):
    estrato = models.ForeignKey(Estrato, on_delete=models.DO_NOTHING, null=False, blank=False)


class AdvertisingContract(Contract):
    pass
