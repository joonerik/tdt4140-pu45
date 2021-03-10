from django.contrib import admin

# Register your models here.
from .models import Dinner, Course
admin.site.register(Dinner)
admin.site.register(Course)