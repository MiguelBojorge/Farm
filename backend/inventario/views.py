from rest_framework import viewsets
from .models import Producto, Proveedor, OrdenCompra, ConsumoAlimento
from .serializers import ProductoSerializer, ProveedorSerializer, OrdenCompraSerializer, ConsumoAlimentoSerializer

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class OrdenCompraViewSet(viewsets.ModelViewSet):
    queryset = OrdenCompra.objects.all()
    serializer_class = OrdenCompraSerializer

class ConsumoAlimentoViewSet(viewsets.ModelViewSet):
    queryset = ConsumoAlimento.objects.all()
    serializer_class = ConsumoAlimentoSerializer
