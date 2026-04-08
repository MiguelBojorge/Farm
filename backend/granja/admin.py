from django.contrib import admin
from .models import LoteCerdos, Cultivo, RegistroSalud

@admin.register(LoteCerdos)
class LoteCerdosAdmin(admin.ModelAdmin):
    list_display = ('id_batch', 'raza', 'fecha_entrada', 'cantidad_actual', 'estado')
    list_filter = ('estado', 'raza')
    search_fields = ('id_batch', 'raza')

@admin.register(Cultivo)
class CultivoAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'area_manzanas', 'fecha_siembra', 'estado')
    list_filter = ('tipo', 'estado')

@admin.register(RegistroSalud)
class RegistroSaludAdmin(admin.ModelAdmin):
    list_display = ('lote', 'fecha', 'descripcion', 'responsable')