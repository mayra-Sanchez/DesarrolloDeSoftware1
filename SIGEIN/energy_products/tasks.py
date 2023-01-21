from datetime import datetime, timedelta
from django.utils import timezone
from celery import shared_task
from clients.models import Clients
from contracts.models import EnergyContract
from .models import ElectricityPrice, EnergyConsumptions
from .electricity_price_generator import generate_kwh_price
from .energy_consumption_generator import generate_kwh_electricity_comsumption


@shared_task(ignore_result=True)
def generate_electricity_price_task():
    # your task logic here
    kwh_price = generate_kwh_price()
    elec_price = ElectricityPrice(date= datetime.now().date(), price= kwh_price)
    elec_price.save()




@shared_task(ignore_result=True)
def generate_electricity_consumption_task():
    # your task logic here

    all_energy_contracts = EnergyContract.objects.all()
    today = datetime.now()
    today = timezone.make_aware(today).date()

    previous_month_date = today 
    if(today.month > 1):
        previous_month_date = previous_month_date.replace(month= today.month -  1)
    else:
        previous_month_date = previous_month_date.replace(year= today.year - 1, month= 12)


    elec_price = ElectricityPrice.objects.filter(date__month= previous_month_date.month, date__year= previous_month_date.year)    
    

    for contract in all_energy_contracts:
        if (contract.start_date.day == today.day):

            billing_begin = datetime(today.year, today.month, contract.start_date.day)
            kwh_consumption = generate_kwh_electricity_comsumption()

            energy_consumption = EnergyConsumptions(
                id_contract= contract,
                price_kwh=  elec_price[0],
                amount_kwh= kwh_consumption,
                billing_period_starts= billing_begin,
                billing_period_ends= billing_begin + timedelta(days=30),
                issue_date= today,
                due_date= today + timedelta(days=15)
                )

            energy_consumption.save()


    
