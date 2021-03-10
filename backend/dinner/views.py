from .serializers import DinnerSerializer, CourseSerializer
from rest_framework import viewsets
from .models import Dinner, Course

class DinnerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows dinners to be viewed or edited.
    """
    queryset = Dinner.objects.all()
    serializer_class = DinnerSerializer

class CoursesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows courses to be viewed or edited.
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    
