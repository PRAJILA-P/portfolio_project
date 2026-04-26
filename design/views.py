from django.shortcuts import render

from .models import Experience


# Create your views here.

def index(request):
    experiences=Experience.objects.all().order_by('-start_date')
    return render(request, 'index.html',{'experiences':experiences})