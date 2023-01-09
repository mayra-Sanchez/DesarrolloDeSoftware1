from django.shortcuts import render
from django.http import HttpResponse
from .models import Contracts

# Create your views here.

def contract(request, contract_id):
  #sql = Contracts.objects.get(cliente_id=contract_id)
  return HttpResponse("Contrato")