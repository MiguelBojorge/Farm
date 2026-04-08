from django.db import models
from django.conf import settings
from granja.models import LoteCerdos, Cultivo
from inventario.models import Producto

class Cliente(models.Model):
    usuario = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    direccion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Venta(models.Model):
    METODO_PAGO_CHOICES = [
        ('EFECTIVO', 'Efectivo'),
        ('TRANSFERENCIA', 'Transferencia'),
        ('OTRO', 'Otro'),
    ]
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    metodo_pago = models.CharField(max_length=15, choices=METODO_PAGO_CHOICES, default='EFECTIVO')
    pagado = models.BooleanField(default=False)

    def __str__(self):
        return f"Venta {self.id} - {self.cliente}"

class VentaDetalle(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name='detalles')
    # Una venta puede ser de un producto, cerdo o cultivo
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True, blank=True)
    lote_cerdos = models.ForeignKey(LoteCerdos, on_delete=models.SET_NULL, null=True, blank=True)
    cultivo = models.ForeignKey(Cultivo, on_delete=models.SET_NULL, null=True, blank=True)
    
    cantidad = models.FloatField(help_text="Kilos, unidades o manzanas")
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    def save(self, *args, **kwargs):
        self.subtotal = float(self.cantidad) * float(self.precio_unitario)
        super().save(*args, **kwargs)

class Carrito(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True)

class CarritoItem(models.Model):
    carrito = models.ForeignKey(Carrito, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True, blank=True)
    lote_cerdos = models.ForeignKey(LoteCerdos, on_delete=models.SET_NULL, null=True, blank=True)
    cultivo = models.ForeignKey(Cultivo, on_delete=models.SET_NULL, null=True, blank=True)
    cantidad = models.FloatField()