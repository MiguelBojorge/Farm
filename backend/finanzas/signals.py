from django.db.models.signals import post_save
from django.dispatch import receiver
from granja.models import LoteCerdos
from .models import Transaccion

@receiver(post_save, sender=LoteCerdos)
def registrar_inversion_lote(sender, instance, created, **kwargs):
    if created and instance.costo_inicial > 0:
        Transaccion.objects.create(
            tipo='EGRESO',
            descripcion=f"Inversión inicial: Lote {instance.id_batch} ({instance.raza})",
            monto=instance.costo_inicial
        )
