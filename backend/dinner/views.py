from .serializers import DinnerSerializer, CourseSerializer, UserRegistrationSerializer
from rest_framework import viewsets
from .models import Dinner, Course, DinnerpoolUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, I am a very protected view ;))'}
        return Response(content)


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

class CreateUserView(APIView):
    queryset = DinnerpoolUser.objects.all()
    serializer_class = UserRegistrationSerializer
