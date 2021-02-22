from django.db import models
from django.utils import timezone
from django import forms

from unixtimestampfield.fields import UnixTimeStampField

class Course(models.Model):

    description = models.CharField(max_length=30, default="coursename")

    def __str__(self):
        return self.description

class Dinner(models.Model):
    title = models.CharField(max_length = 30)
    description = models.CharField(max_length = 200, default="ikke oppgitt")
    host = models.CharField(max_length = 30)
    email = models.CharField(max_length = 50, default="ikke oppgitt")
    phone = models.CharField(max_length = 15, default="ikke oppgitt")
    # participants = []
    capacity = models.IntegerField(default = 0)
    location = models.CharField(max_length = 50)
    date_created = models.DateTimeField(default=timezone.now)
    date_event = UnixTimeStampField(default=0.0)
    courses = models.ManyToManyField(Course)
    price = models.FloatField(default=0)
    split_bill = models.BooleanField(default = False)
    contains_gluten = models.BooleanField(default = False)
    contains_lactose = models.BooleanField(default = False)
    contains_nut = models.BooleanField(default = False)
    contains_shellfish = models.BooleanField(default = False)
    other_allergens = models.CharField(max_length=30, default="ikke oppgitt")

    def __str__(self):
        return self.title
