from datetime import datetime
from celery import shared_task
from .models import ElectricityPrice
from .electricity_price_generator import generate_kwh_price


@shared_task(ignore_result=True)
def generate_electricity_price_task():
    # your task logic here
    kwh_price = generate_kwh_price()
    elec_price = ElectricityPrice(date= datetime.now().date(), price= kwh_price)
    elec_price.save()

