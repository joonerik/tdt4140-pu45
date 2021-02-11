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
    title = models.CharField(max_length = 30, default="ikke oppgitt")
    description = models.CharField(max_length = 200, default="ikke oppgitt")
    host = models.CharField(max_length = 30, default="ikke oppgitt")
    contact = models.CharField(max_length = 50, default="ikke oppgitt")
    # participants = models.CharField(max_length=30, default="ikke oppgitt")
    capacity = models.IntegerField(default = 0)
    location = models.CharField(max_length = 30, default="ikke oppgitt")
    date_created = models.DateTimeField(default=timezone.now)
    date_event = models.DateTimeField(default=timezone.now)
    allergies = models.ManyToManyField(Allergy)
    course = models.CharField(max_length = 20, default="ikke oppgitt")
    price = models.FloatField(default = 0)
    split_bill = models.BooleanField(default = False)


    def __str__(self):
        return self.title
