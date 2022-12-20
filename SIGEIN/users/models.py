from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, first_name, last_name, phone_number, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not first_name:
            raise ValueError('The firts_name field must be set')            
        if not last_name:
            raise ValueError('The last_name field must be set')            

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, phone_number=phone_number, **extra_fields)
        user.set_password(password)
        user.save()
       
        return user
    

    def create_superuser(self, email, password, first_name="admin", last_name="admin", phone_number="1234567899", **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, first_name, last_name, phone_number, **extra_fields)



class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    password = models.CharField(max_length=200, validators=[validators.MinLengthValidator(8)], blank=False)
    first_name = models.CharField(max_length=30, blank=False)
    last_name = models.CharField(max_length=30, blank=False)
    phone_number = models.CharField(max_length=10, validators=[validators.MinLengthValidator(10)], blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number']
