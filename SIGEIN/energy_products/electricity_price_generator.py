import random
from .models import ElecticityPrice

# Generate a random float between 400.00 and 900.00
def generate_kwh_price(min=400.00, max=800.00):
    return random.uniform(min, max)

##print( generate_kwh_price() )