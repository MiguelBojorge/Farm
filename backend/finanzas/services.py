from .repositories import DjangoFinanceRepository
from .interfaces import IFinanceRepository
from decimal import Decimal

class FinanceService:
    """
    SRP (Single Responsibility Principle): 
    Esta clase es la única responsable de coordinar acciones financieras.
    DIP: Recibe un repositorio por inyección (o usa uno por defecto).
    """
    
    def __init__(self, repository: IFinanceRepository = None):
        self.repository = repository or DjangoFinanceRepository()
    
    def registrar_egreso(self, descripcion: str, monto: Decimal):
        """Coordina el registro de una salida de dinero."""
        return self.repository.registrar_transaccion('EGRESO', descripcion, monto)

    def registrar_ingreso(self, descripcion: str, monto: Decimal):
        """Coordina el registro de una entrada de dinero."""
        return self.repository.registrar_transaccion('INGRESO', descripcion, monto)
