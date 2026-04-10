from abc import ABC, abstractmethod
from decimal import Decimal

class IFinanceRepository(ABC):
    """
    DIP (Dependency Inversion Principle): 
    Interfaz abstracta para el almacenamiento de transacciones financieras.
    Cualquier módulo que necesite registrar ingresos/egresos usará esta abstracción.
    """
    
    @abstractmethod
    def registrar_transaccion(self, tipo: str, descripcion: str, monto: Decimal):
        pass
