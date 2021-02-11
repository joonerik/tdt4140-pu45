from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Dinner, Allergy


class DinnerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dinner
        fields = ['id', 'title', 'description', 'host', 'contact', 'capacity', 'location', 'date_event', 'allergies', 'price', 'split_bill']


class AllergySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Allergy
        fields = ['description']
