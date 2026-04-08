from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import VentaDetalle
from finanzas.models import Transaccion

@receiver(post_save, sender=VentaDetalle)
def procesar_venta_detalle(sender, instance, created, **kwargs):
    if created:
        # 1. Descontar Stock de Cerdos
        if instance.lote_cerdos:
            lote = instance.lote_cerdos
            lote.cantidad_actual -= int(instance.cantidad)
            if lote.cantidad_actual < 0: lote.cantidad_actual = 0
            lote.save()
        
        # 2. Descontar Stock de Productos (Alimento/Medicina)
        if instance.producto:
            prod = instance.producto
            prod.cantidad -= int(instance.cantidad)
            prod.save()
            
        # 3. Descontar Cultivos
        if instance.cultivo:
            cult = instance.cultivo
            # Si se vende por manzanas, restamos del área
            cult.area_manzanas -= instance.cantidad
            if cult.area_manzanas <= 0:
                cult.estado = 'FINALIZADO'
            cult.save()

        # 4. Registrar Ingreso en Finanzas
        Transaccion.objects.create(
            tipo='INGRESO',
            descripcion=f"Venta: {instance.lote_cerdos or instance.producto or instance.cultivo}",
            monto=instance.subtotal
        )
