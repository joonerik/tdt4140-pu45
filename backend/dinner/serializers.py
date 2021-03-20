from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Dinner, Course, User as Our_User

from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

# Register serializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Our_User
        fields = ('id', 'email', 'password', 'name', 'phone', 'address')
        extra_kwargs = {
            'password':{'write_only': True},
        }
    def create(self, validated_data):
        user = Our_User.objects.create_user(username = validated_data['email'], password = validated_data['password'],
            name=validated_data['name'], email=validated_data['email'], 
            phone =validated_data['phone'], address=validated_data['address'], )
        return user

# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class DinnerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dinner
        fields = '__all__'


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'description']
