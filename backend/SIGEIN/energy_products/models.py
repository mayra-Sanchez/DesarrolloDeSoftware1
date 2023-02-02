from django.db import models
from django.core.exceptions import ValidationError
from contracts.models import EnergyContract

# Create your models here.

class ElectricityPrice(models.Model):
    date = models.DateField(null=False, blank=False)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)

    def validate_unique_month_year_combination(self):
        # Check if there is already an instance with the same month and year
        existing = ElectricityPrice.objects.filter(date__month=self.date.month, date__year=self.date.year)
    
        if existing.exists():
            raise ValidationError("An electricity price for this month and year already exists.")


    def save(self, *args, **kwargs):
        self.validate_unique_month_year_combination()
        super().save(*args, **kwargs)



class EnergyConsumptions(models.Model):
    id_contract = models.ForeignKey(EnergyContract, on_delete=models.DO_NOTHING, null=False, blank=False)
    price_kwh = models.ForeignKey(ElectricityPrice, on_delete=models.DO_NOTHING, blank=True, null=True)
    amount_kwh = models.IntegerField(blank=False, null=False)    
    billing_period_starts = models.DateField(blank=False, null=False)
    billing_period_ends = models.DateField(blank=False, null=False)
    issue_date = models.DateField(blank=False, null=False)
    due_date = models.DateField(blank=False, null=True)
    is_fully_paid = models.BooleanField(default=False, null=False, blank=False)

