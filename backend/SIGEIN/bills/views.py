from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from io import BytesIO
from django.views.generic import ListView, View
from users.models import CustomUser
from energy_products.models import EnergyConsumptions, ElectricityPrice
from contracts.models import EnergyContract,Estrato,ContractType,Contract
from clients.models import Clients

from xhtml2pdf import pisa

# Create your views here.

class CreateClientPdf(View):
  def get(self, request, *args, **kwargs):
    lookup_field = 'pk'
    pdf = createPdf('bill.html', {"usuario":"usuario de prueba"})
    return HttpResponse(pdf, content_type='application/pdf')
  
def pdf(request, user_id):
  usuario = CustomUser.objects.get(id=user_id)
  clients = Clients.objects.get(customuser_ptr_id=usuario.id)
  contract = Contract.objects.get(id_client_id=clients.customuser_ptr_id)
  energycontract = EnergyContract.objects.get(contract_ptr_id=contract.id)
  estrato = Estrato.objects.get(id=energycontract.estrato_id)
  energyconsumptions = EnergyConsumptions.objects.filter(id_contract=contract.id).order_by('-issue_date')[0]
  price = ElectricityPrice.objects.get(id=energyconsumptions.price_kwh_id)
  total = energyconsumptions.amount_kwh * price.price
  print(total)
  context = {'usuario':usuario, 'clients':clients,
             'contract':contract, 'context_dict':energycontract,
             'estrato':estrato, 'energyconsumptions':energyconsumptions, 'price':price,
             'total': total}
  pdf = createPdf('bill.html', context)
  return HttpResponse(pdf, content_type='application/pdf')

def createPdf(template, context_dict):
  template = get_template(template)
  html = template.render(context_dict)
  result = BytesIO()
  pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
  if not pdf.err:
    return HttpResponse(result.getvalue(), content_type='application/pdf')
  return None