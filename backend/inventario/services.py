from .models import Producto, ConsumoAlimento
from finanzas.services import FinanceService
from decimal import Decimal

class InventoryService:
    """
    SRP (Single Responsibility Principle): 
    Maneja la lógica de negocio exclusiva de inventario.
    DIP: Se comunica con finanzas a través de su servicio (que ya usa abstracciones).
    """

    def __init__(self, finance_service: FinanceService = None):
        self.finance_service = finance_service or FinanceService()

    def procesar_consumo_alimento(self, consumo_instance: ConsumoAlimento):
        """
        Coordina las acciones necesarias cuando se consume un alimento.
        Dividimos la tarea en dos responsabilidades claras:
        1. Actualizar stock.
        2. Notificar a finanzas.
        """
        # 1. Actualización de Stock (Lógica de Inventario)
        producto = consumo_instance.alimento
        producto.cantidad -= int(consumo_instance.cantidad)
        if producto.cantidad < 0:
            producto.cantidad = 0
        producto.save()

        # 2. Notificar a Finanzas (Desacoplado)
        descripcion = f"Consumo Alimento: {consumo_instance.lote.id_batch}"
        self.finance_service.registrar_egreso(descripcion, consumo_instance.monto_total)
        
        return True
