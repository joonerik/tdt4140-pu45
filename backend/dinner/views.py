from .serializers import DinnerSerializer
from rest_framework import viewsets
from .models import Dinner

class DinnerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows dinners to be viewed or edited.
    """
    queryset = Dinner.objects.all()
    serializer_class = DinnerSerializer
