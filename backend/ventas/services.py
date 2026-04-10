from .models import Venta, VentaDetalle
from finanzas.services import FinanceService
from django.db import transaction

class SalesService:
    """
    SRP (Single Responsibility Principle): 
    Maneja el ciclo de vida completo de una venta.
    OCP: Diseñado para ser extensible a nuevos tipos de ítems vendibles.
    """

    def __init__(self, finance_service: FinanceService = None):
        self.finance_service = finance_service or FinanceService()

    @transaction.atomic
    def procesar_venta(self, cliente, detalles_data, metodo_pago):
        """
        Coordina la creación de la venta y sus impactos sistémicos.
        """
        # 1. Crear la Venta Principal
        venta = Venta.objects.create(
            cliente=cliente,
            metodo_pago=metodo_pago,
            pagado=True # Por defecto para este ERP
        )

        total_venta = 0

        # 2. Procesar cada detalle (Aplicando lógica de OCP/LSP internamente)
        for d in detalles_data:
            detalle = VentaDetalle.objects.create(venta=venta, **d)
            total_venta += detalle.subtotal
            
            # Descontar stock dependiendo del tipo de item
            self._actualizar_stock_item(detalle)

        # 3. Actualizar total de la venta
        venta.total = total_venta
        venta.save()

        # 4. Registrar en Finanzas (DIP)
        descripcion = f"Venta #{venta.id} - Cliente: {cliente.nombre}"
        self.finance_service.registrar_ingreso(descripcion, total_venta)

        return venta

    def _actualizar_stock_item(self, detalle):
        """
        Determina cómo actualizar el stock según el tipo de producto.
        LSP: Tratamos a todos los items vendibles con una lógica de 'reducción'.
        """
        if detalle.producto:
            item = detalle.producto
            item.cantidad -= int(detalle.cantidad)
            item.save()
        elif detalle.lote_cerdos:
            item = detalle.lote_cerdos
            item.cantidad_actual -= int(detalle.cantidad)
            item.save()
        elif detalle.cultivo:
            # En cultivos el stock puede funcionar diferente, 
            # pero mantenemos la consistencia de interfaz.
            pass
