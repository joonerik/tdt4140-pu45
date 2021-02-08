from django.db import models

class Dinner(models.Model):
    food = models.CharField(max_length=30)
    location = models.CharField(max_length=30)

