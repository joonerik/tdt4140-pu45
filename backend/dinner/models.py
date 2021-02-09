from django.db import models
from django.utils import timezone

class Dinner(models.Model):
    title = models.CharField(max_length=30, default="ikke oppgitt")
    food = models.CharField(max_length=30, default="ikke oppgitt")
    beskrivelse = models.CharField(max_length=200, default="ikke oppgitt")
    location = models.CharField(max_length=30, default="ikke oppgitt")
    host = models.CharField(max_length=30, default="ikke oppgitt")
    date_posted = models.DateTimeField(default=timezone.now)
    capacity = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title