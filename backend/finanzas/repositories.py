from .models import Transaccion
from .interfaces import IFinanceRepository
from decimal import Decimal

class DjangoFinanceRepository(IFinanceRepository):
    """
    DIP: Implementación concreta (Adaptador) usando el ORM de Django.
    Si en el futuro se cambia a otra base de datos o API externa, solo se crea otro Repositorio.
    """
    
    def registrar_transaccion(self, tipo: str, descripcion: str, monto: Decimal):
        return Transaccion.objects.create(
            tipo=tipo,
            descripcion=descripcion,
            monto=monto
        )
