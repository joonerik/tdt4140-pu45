from django.test import TestCase

# Create your tests here.
from django.utils import timezone

from .models import Dinner, Course
import datetime


class DinnerTestCase(TestCase):
    def setUp(self):
        Dinner.objects.create(title="dinner_test", capacity="100")
        Dinner.objects.create(title="dinner_test2", capacity="1")

    def test_dinner_creation(self):
        dinner_test2 = Dinner.objects.get(capacity=1)
        self.assertEqual(dinner_test2.title, 'dinner_test2')
    
    def test_dinner_defaults(self):
        dinner_test = Dinner.objects.get(capacity=100)
        self.assertEqual(dinner_test.price, 0.0)
        self.assertEqual(dinner_test.description, "ikke oppgitt")

class CourseTestCase(TestCase):
    def setUp(self):
        Course.objects.create(description="taco")
    
    def test_course_creation(self):
        test_course = Course.objects.get(description="taco")
        self.assertEqual(test_course.description, "taco")
    
    def test_course_defaults(self):
        course_test2 = Course.objects.create()
        self.assertEqual(course_test2.description, "coursename")