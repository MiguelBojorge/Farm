from django.contrib import admin
from .models import Transaccion

@admin.register(Transaccion)
class TransaccionAdmin(admin.ModelAdmin):
    list_display = ('tipo', 'descripcion', 'monto', 'fecha')
    list_filter = ('tipo', 'fecha')
    search_fields = ('descripcion',)
