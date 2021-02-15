from django.test import TestCase

# Create your tests here.
from django.utils import timezone

from .models import Dinner
import datetime


class DinnerTestCase(TestCase):
    def setUp(self):
        Dinner.objects.create(title="test_object", capacity="100")
        Dinner.objects.create(title="test_object_2", capacity="1")

    def test_dinner_creation(self):
        test_object_2 = Dinner.objects.get(capacity=1)
        self.assertEqual(test_object_2.title, 'test_object_2')