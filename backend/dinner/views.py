from .serializers import DinnerSerializer, AllergySerializer
from rest_framework import viewsets
from .models import Dinner, Allergy

class DinnerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows dinners to be viewed or edited.
    """
    queryset = Dinner.objects.all()
    serializer_class = DinnerSerializer

class AllergiesViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows allergies to be viewed or edited.
    """
    queryset = Allergy.objects.all()
    serializer_class = AllergySerializer

    
