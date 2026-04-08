from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ConsumoAlimento
from finanzas.models import Transaccion

@receiver(post_save, sender=ConsumoAlimento)
def procesar_consumo_alimento(sender, instance, created, **kwargs):
    if created:
        # 1. Descontar Stock de Inventario
        producto = instance.alimento
        producto.cantidad -= int(instance.cantidad)
        if producto.cantidad < 0: producto.cantidad = 0
        producto.save()
        
        # 2. Registrar Egreso en Finanzas
        Transaccion.objects.create(
            tipo='EGRESO',
            descripcion=f"Consumo Alimento: {instance.lote.id_batch}",
            monto=instance.monto_total
        )
