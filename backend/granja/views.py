from rest_framework import viewsets
from .models import LoteCerdos, Cultivo, RegistroSalud
from .serializers import LoteCerdosSerializer, CultivoSerializer, RegistroSaludSerializer

class LoteCerdosViewSet(viewsets.ModelViewSet):
    queryset = LoteCerdos.objects.all()
    serializer_class = LoteCerdosSerializer

class CultivoViewSet(viewsets.ModelViewSet):
    queryset = Cultivo.objects.all()
    serializer_class = CultivoSerializer

class RegistroSaludViewSet(viewsets.ModelViewSet):
    queryset = RegistroSalud.objects.all()
    serializer_class = RegistroSaludSerializer
