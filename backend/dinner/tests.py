from django.test import TestCase

# Create your tests here.
from django.utils import timezone

from .models import Dinner, Course
import datetime


class DinnerTestCase(TestCase):
    def setUp(self):
        Dinner.objects.create(title="test_object", capacity="100")
        Dinner.objects.create(title="test_object_2", capacity="1")

    def test_dinner_creation(self):
        test_object_2 = Dinner.objects.get(capacity=1)
        self.assertEqual(test_object_2.title, 'test_object_2')

class CourseTestCase(TestCase):
    def setUp(self):
        Course.objects.create(description="taco")
    
    def test_course_creation(self):
        test_course = Course.objects.get(description="taco")
        self.assertEqual(test_course.description, "taco")