from django.db import models
from django.utils import timezone
from django import forms
from django.contrib.auth.models import User as Django_User

class User(Django_User):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)

class Course(models.Model):

    description = models.CharField(max_length=30, default="coursename")

    def __str__(self):
        return self.description

class Dinner(models.Model):
    title = models.CharField(max_length = 30)
    description = models.CharField(max_length = 200, default="ikke oppgitt")
    host = models.ForeignKey(User, on_delete=models.CASCADE, default=None)
    email = models.CharField(max_length = 50, default="ikke oppgitt")
    phone = models.CharField(max_length = 15, default="ikke oppgitt")
    participants = models.ManyToManyField(User, related_name='participant+', blank=True)
    capacity = models.IntegerField(default = 0)
    location = models.CharField(max_length = 50)
    date_created = models.DateTimeField(default=timezone.now)
    date_event = models.DateTimeField(default=timezone.now)
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
