import os
from celery import Celery
from celery.schedules import crontab

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'SIGEIN.settings')

app = Celery('SIGEIN')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.beat_schedule = {
    'create_instance_electricity_price': {
        'task': 'energy_products.tasks.generate_electricity_price_task',
        'schedule': crontab(day_of_month='2', month_of_year='*')        
    },
}

# Load task modules from all registered Django apps.
app.autodiscover_tasks()