from rest_framework import serializers
from .models import LoteCerdos, Cultivo, RegistroSalud, RegistroPeso

class RegistroPesoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroPeso
        fields = '__all__'

class LoteCerdosSerializer(serializers.ModelSerializer):
    historial_pesos = RegistroPesoSerializer(many=True, read_only=True)
    
    class Meta:
        model = LoteCerdos
        fields = '__all__'

class CultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cultivo
        fields = '__all__'

class RegistroSaludSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistroSalud
        fields = '__all__'