
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages 

# Create your views here.


def index(request):
    return HttpResponse("Hello, world. You're at the SEGEIN index.")

def login_user(request):

    if request.method == 'GET':
        return HttpResponse("Estas viendo la pagina de login")
        
    elif request.method == 'POST':
    
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Redirect to a success page.
            return redirect('index')
            
        else:
            # Return an 'invalid login' error message.
            return HttpResponse('fail')


    
    