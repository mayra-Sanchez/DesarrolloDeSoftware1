from django.db import models
from energy_products.models import EnergyConsumptions
from advertising_products.models import AdvertisingConsumption

# Create your models here.

class Payment(models.Model):

    TYPE_CHOICES = (
        ('in-house', 'in-house'),
        ('online', 'online'),
        ('bank', 'bank')
    )

    SERVICE_PAID_CHOICES = (
        ('energy consumption', 'energy consumption'),
        ('advertising consumption', 'advertising consumption'),
    )

    amount = models.DecimalField(default=0.0, max_digits=10, decimal_places=3, blank=False, null=False)
    penalty = models.DecimalField(default=0.0, max_digits=10, decimal_places=3, blank=False)
    date = models.DateTimeField(auto_now=True, blank=False, null=False)
    type = models.CharField(max_length=30, choices=TYPE_CHOICES, blank=False, null=False)
    payment_institution = models.CharField(max_length=50, blank=False, null=False)
    is_deposit = models.BooleanField(default=False, null=False, blank=False)
    service_paid = models.CharField(max_length=50, choices=SERVICE_PAID_CHOICES, null=False, blank=False)
    id_energy_consumption = models.ForeignKey(EnergyConsumptions, on_delete=models.DO_NOTHING, null=True, blank=False)
    id_advertising_consumption = models.ForeignKey(AdvertisingConsumption, on_delete=models.DO_NOTHING, related_name='payment', null=True, blank=False)

