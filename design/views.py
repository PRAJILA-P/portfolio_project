from django.shortcuts import render

from .models import Experience, Project


# Create your views here.

def index(request):
    experiences=Experience.objects.all().order_by('-start_date')
    projects=Project.objects.all()
    return render(request, 'index.html',
                  {'experiences':experiences,'projects': projects})