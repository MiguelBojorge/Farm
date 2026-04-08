from django.http import JsonResponse
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from granja.views import LoteCerdosViewSet, CultivoViewSet, RegistroSaludViewSet
from inventario.views import ProductoViewSet, ProveedorViewSet, OrdenCompraViewSet, ConsumoAlimentoViewSet
from finanzas.views import TransaccionViewSet
from ventas.views import VentaViewSet, ClienteViewSet

def api_root(request):
    return JsonResponse({
        "message": "Bienvenido al API de la Granja Universidad",
        "endpoints": {
            "admin": "/admin/",
            "api": "/api/",
            "auth": "/api/auth/"
        }
    })

router = routers.DefaultRouter()
router.register(r'lotes-cerdos', LoteCerdosViewSet)
router.register(r'cultivos', CultivoViewSet)
router.register(r'registros-salud', RegistroSaludViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'proveedores', ProveedorViewSet)
router.register(r'ordenes-compra', OrdenCompraViewSet)
router.register(r'consumos-alimento', ConsumoAlimentoViewSet)
router.register(r'transacciones', TransaccionViewSet)
router.register(r'ventas', VentaViewSet)
router.register(r'clientes', ClienteViewSet)

urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('allauth.urls')), # Structure for Google Auth
]
