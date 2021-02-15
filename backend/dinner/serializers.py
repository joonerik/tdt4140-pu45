from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Dinner, Course


class DinnerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dinner
        fields = ['id', 'title', 'description', 'host', 'contact', 'capacity', 'location', 'date_event', 'courses', 'price', 'split_bill']


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ['description']
