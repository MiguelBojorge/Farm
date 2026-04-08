from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.http import HttpResponse
from .models import Cliente, Venta, Carrito
from .serializers import ClienteSerializer, VentaSerializer, CarritoSerializer
from utils.pdf_generator import generate_invoice_pdf

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

    @action(detail=True, methods=['get'])
    def download_factura(self, request, pk=None):
        venta = self.get_object()
        pdf_buffer = generate_invoice_pdf(venta)
        response = HttpResponse(pdf_buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="factura_{venta.id}.pdf"'
        return response

class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer