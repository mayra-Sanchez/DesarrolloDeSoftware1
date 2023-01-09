from django.shortcuts import render
from django.http import HttpResponse

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter


# Create your views here.

def userBill(request, user_id):
  c = canvas.Canvas("hola-mundo.pdf", pagesize=letter)

  w, h = letter
  c.drawString(50, h - 50, "Factura")
  c.showPage()

  c.save()
  return HttpResponse("user bill")