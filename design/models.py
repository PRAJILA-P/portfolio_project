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


class Project(models.Model):

    CATEGORY_CHOICES = [
        ('fullstack', 'Full Stack'),
        ('backend', 'Backend'),
        ('api', 'API'),
    ]

    title = models.CharField(max_length=200)

    # store bullet points (each line = one point)
    description = models.TextField(
        help_text="Enter each point on a new line"
    )

    technologies = models.CharField(
        max_length=200,
        help_text="Comma separated (e.g. Django, React, PostgreSQL)"
    )

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='fullstack'
    )

    featured = models.BooleanField(default=False)

    source_code = models.URLField(blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def tech_list(self):
        return [tech.strip() for tech in self.technologies.split(',')]

    def __str__(self):
        return self.title

