from django.db import models

# Create your models here.

class About(models.Model):
    title = models.CharField(max_length=100, default="About Me")
    description = models.TextField()

    def __str__(self):
        return self.title


class Experience(models.Model):
    role = models.CharField(max_length=100)  # e.g. Python Developer Intern
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)  # Added properly
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)  # null if present
    description = models.TextField()

    def __str__(self):
        return f"{self.role} at {self.company}"


