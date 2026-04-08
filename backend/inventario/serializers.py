from rest_framework import serializers
from .models import Producto, Proveedor, OrdenCompra, ConsumoAlimento

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class OrdenCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenCompra
        fields = '__all__'

class ConsumoAlimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsumoAlimento
        fields = '__all__'