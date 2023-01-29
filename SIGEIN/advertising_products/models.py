from django.db import models
from contracts.models import AdvertisingContract

# Create your models here.

class AdvertisingService(models.Model):
    service_name = models.CharField(max_length=40, null=False, blank=False)
    price = models.DecimalField(decimal_places=3, null=False, blank=False)
    service_description = models.TextField(blank=False, null=False)


class AdvertisingConsumption(models.Model):
    id_contract = models.ForeignKey(AdvertisingContract, on_delete=models.DO_NOTHING, null=False, blank=False)
    advertising_serivice = models.ForeignKey(AdvertisingService, on_delete=models.DO_NOTHING, null=False, blank=False)
