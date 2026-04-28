import os

from django.core.mail import send_mail
from django.http import FileResponse
from django.shortcuts import render, redirect
from django.conf import settings

from .models import Experience, Project


# Create your views here.

def index(request):
    experiences=Experience.objects.all().order_by('-start_date')
    projects=Project.objects.all()
    return render(request, 'index.html',
                  {'experiences':experiences,'projects': projects})


def send_message(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        project_type = request.POST.get("type")
        message = request.POST.get("message")

        full_message = f"""
        Name: {name}
        Email: {email}
       

        Message:
        {message}
        """

        send_mail(
            subject=f"New Contact Message from {name}",
            message=full_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
        )

        return redirect("index")  # or show success message

    return redirect("index")


def download_resume(request):
    file_path = os.path.join(settings.BASE_DIR, 'static/files/resume.pdf')
    return FileResponse(open(file_path, 'rb'), as_attachment=True, filename='Prajila_Resume.pdf')
