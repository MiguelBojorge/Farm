from django.contrib import admin
from .models import Producto, Proveedor, OrdenCompra

@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'contacto', 'telefono')

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'cantidad', 'precio_unitario', 'stock_minimo')
    list_filter = ('categoria', 'proveedor')
    search_fields = ('nombre',)

@admin.register(OrdenCompra)
class OrdenCompraAdmin(admin.ModelAdmin):
    list_display = ('id', 'proveedor', 'fecha_pedido', 'estado', 'total_estimado')
    list_filter = ('estado', 'proveedor')
