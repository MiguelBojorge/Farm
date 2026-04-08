from django.contrib import admin
from .models import Cliente, Venta, VentaDetalle, Carrito

class VentaDetalleInline(admin.TabularInline):
    model = VentaDetalle
    extra = 1

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'telefono', 'email')
    search_fields = ('nombre', 'email')

@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'fecha', 'total', 'pagado')
    list_filter = ('pagado', 'metodo_pago')
    inlines = [VentaDetalleInline]

@admin.register(Carrito)
class CarritoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'creado_en')
