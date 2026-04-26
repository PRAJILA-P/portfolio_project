from django.urls import re_path, path
from .import views
urlpatterns = [
        re_path(r'^$', views.index, name='index'),
        path('send-message/', views.send_message, name='send_message'),
        path('download-resume/', views.download_resume, name='download_resume'),
           ]