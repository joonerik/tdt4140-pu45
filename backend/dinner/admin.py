from django.contrib import admin

# Register your models here.
from .models import Dinner, Course, User
admin.site.register(Dinner)
admin.site.register(User)
admin.site.register(Course)