from django.db import models


# Create your models here.
class tiposCliente(models.Model):
    tipoCliente=models.CharField(max_length=255)
    precioHw=models.DecimalField(decimal_places=2,max_digits=20)
    
class Cliente(models.Model):
    nombre=models.CharField(max_length=255)
    celular=models.CharField(max_length=255)
    email=models.EmailField( max_length=254)
    password=models.CharField(max_length=255)
    estado=models.BooleanField()
    tiposCliente=models.ForeignKey(tiposCliente,on_delete=models.CASCADE)
    
class Contratos(models.Model):
    cliente=models.ForeignKey(Cliente,on_delete=models.CASCADE)
    noMedidor=models.CharField(max_length=255)
    direccion=models.CharField(max_length=255)
    
class Consumos(models.Model):
    contrato=models.ForeignKey(Contratos,on_delete=models.CASCADE)
    consumo=models.CharField(max_length=255)
    ciclo=models.CharField(max_length=255)

class Pagos(models.Model):
    consumos:models.ForeignKey(Consumos,on_delete=models.CASCADE)
    valor:models.DecimalField(decimal_places=2,max_digits=20)
    banco:models.CharField()
    fecha:models.DateField()
    
    
class roles(models.Model):
    rol=models.CharField(max_length=255)
    
class usuarios(models.Model):
    nombre=models.CharField(max_length=255)
    celular=models.CharField(max_length=255)
    email=models.EmailField( max_length=254)
    password=models.CharField(max_length=255)
    estado=models.BooleanField()
    tipos_Cliente=models.ForeignKey(roles,on_delete=models.CASCADE)