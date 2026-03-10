from django.shortcuts import render
from rest_framework import viewsets
from .models import Transaccion
from .serializers import TransaccionSerializer

class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer