from django.contrib import admin

# Register your models here.
from .models import Dinner, Allergy
admin.site.register(Dinner)
admin.site.register(Allergy)