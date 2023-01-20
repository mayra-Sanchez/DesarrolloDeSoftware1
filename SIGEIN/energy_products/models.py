from django.db import models
from django.core.exceptions import ValidationError
from contracts.models import EnergyContract

# Create your models here.

class ElecticityPrice(models.Model):
    date = models.DateField(null=False, blank=False)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)

    # def clean(self):
    #     super().clean()
    #     if self.date.day != 1:
    #         raise ValidationError("The date should only contain the month and year.") 


class EnergyConsumptions(models.Model):
    id_contract = models.ForeignKey(EnergyContract, on_delete=models.DO_NOTHING, null=False, blank=False)
    price_kwh = models.ForeignKey(ElecticityPrice, on_delete=models.DO_NOTHING, blank=True, null=True)
    amount_kwh = models.IntegerField(blank=False, null=False)    
    billing_period_starts = models.DateField(blank=False, null=False)
    billing_period_ends = models.DateField(blank=False, null=False)
    issue_date = models.DateField(blank=False, null=False)
    due_date = models.DateField(blank=False, null=True)
    is_fully_paid = models.BooleanField(default=False, null=False, blank=False)
