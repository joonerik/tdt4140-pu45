from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Dinner


class DinnerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dinner
        fields = ['title', 'beskrivelse', 'food', 'location', 'host', 'capacity']