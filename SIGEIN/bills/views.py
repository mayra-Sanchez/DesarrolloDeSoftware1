from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from io import BytesIO
from django.views.generic import ListView, View

from xhtml2pdf import pisa

# Create your views here.

class CreateClientPdf(View):
  def get(self, request, *args, **kwargs):
    pdf = createPdf('bill.html')
    return HttpResponse(pdf, content_type='application/pdf')

def createPdf(template, context_dict={}):
  template = get_template(template)
  html = template.render(context_dict)
  result = BytesIO()
  pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
  if not pdf.err:
    return HttpResponse(result.getvalue(), content_type='application/pdf')
  return None