from django.contrib import admin
from .models import Cliente
from .models import usuarios
from .models import Consumos
from .models import Contratos
from .models import tiposCliente
from .models import roles

# Register your models here.
admin.site.register(usuarios)
admin.site.register(Consumos)
admin.site.register(Contratos)
admin.site.register(tiposCliente)
admin.site.register(roles)
