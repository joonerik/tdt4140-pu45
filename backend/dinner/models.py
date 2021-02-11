from django.db import models
from django.utils import timezone
from django import forms

class Allergy(models.Model):
    class Meta:
        verbose_name_plural = 'Allergies'

    description = models.CharField(max_length=30, default="allerginavn")

    def __str__(self):
        return self.description

class Dinner(models.Model):
    title = models.CharField(max_length=30, default="ikke oppgitt")
    food = models.CharField(max_length=30, default="ikke oppgitt")
    beskrivelse = models.CharField(max_length=200, default="ikke oppgitt")
    location = models.CharField(max_length=30, default="ikke oppgitt")
    host = models.CharField(max_length=30, default="ikke oppgitt")
    date_posted = models.DateTimeField(default=timezone.now)
    capacity = models.IntegerField(default=0)
    allergies = models.ManyToManyField(Allergy)
    
    def __str__(self):
        return self.title
