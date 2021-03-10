from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Dinner, Course


class DinnerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dinner
        fields = ['id', 'title', 'description', 'host', 'email', 'phone', 'capacity', 'location', 'date_event', 'courses', 'price', 'split_bill', 'contains_gluten', 'contains_lactose', 'contains_nut', 'contains_shellfish', 'other_allergens']


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'description']
