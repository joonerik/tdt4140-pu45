from .serializers import DinnerSerializer, CourseSerializer
from rest_framework import viewsets
from .models import Dinner, Course
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
#Register API

class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,    context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, I am a very protected view ;))'}
        return Response(content)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows dinners to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

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

    
