from rest_framework import serializers
from .models import Cliente, Venta, VentaDetalle, Carrito, CarritoItem
from .services import SalesService

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class VentaDetalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = VentaDetalle
        fields = '__all__'

class VentaSerializer(serializers.ModelSerializer):
    detalles = VentaDetalleSerializer(many=True)

    class Meta:
        model = Venta
        fields = '__all__'

    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles', [])
        cliente = validated_data.get('cliente')
        metodo_pago = validated_data.get('metodo_pago', 'EFECTIVO')
        
        service = SalesService()
        return service.procesar_venta(cliente, detalles_data, metodo_pago)

class CarritoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarritoItem
        fields = '__all__'

class CarritoSerializer(serializers.ModelSerializer):
    items = CarritoItemSerializer(many=True, read_only=True)
    class Meta:
        model = Carrito
        fields = '__all__'