# Generated by Django 4.1.3 on 2023-01-12 23:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contracts', '0002_alter_contracttype_contract_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='contract',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='contracttype',
            name='contract_type',
            field=models.CharField(choices=[('energy', 'energy'), ('advertising', 'advertising')], max_length=30, unique=True),
        ),
    ]
