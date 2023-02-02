from django.contrib.auth.admin import UserAdmin
from django.contrib import admin

# Register your models here.
from .models import CustomUser

admin.site.register(CustomUser, UserAdmin)