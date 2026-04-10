from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ConsumoAlimento
from .services import InventoryService

@receiver(post_save, sender=ConsumoAlimento)
def procesar_consumo_alimento_signal(sender, instance, created, **kwargs):
    """
    SRP: El signal ahora solo tiene una responsabilidad: reaccionar al evento post_save.
    La lógica de negocio se delega al InventoryService.
    """
    if created:
        service = InventoryService()
        service.procesar_consumo_alimento(instance)
