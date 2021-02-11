from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Dinner, Allergy


class DinnerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dinner
        fields = ['id', 'title', 'beskrivelse', 'food', 'location', 'host', 'capacity', 'allergies']


class AllergySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Allergy
        fields = ['description']
