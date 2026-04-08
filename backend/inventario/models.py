from django.db import models

class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    contacto = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    CATEGORIA_CHOICES = [
        ('ALIMENTO', 'Alimento'),
        ('MEDICINA', 'Medicina'),
        ('HERRAMIENTA', 'Herramienta'),
        ('OTROS', 'Otros'),
    ]
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=20, choices=CATEGORIA_CHOICES)
    cantidad = models.IntegerField(default=0)
    stock_minimo = models.IntegerField(default=5)
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.SET_NULL, null=True, blank=True)
    fecha_ingreso = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} ({self.cantidad} disponibles)"

class OrdenCompra(models.Model):
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('RECIBIDO', 'Recibido'),
        ('CANCELADO', 'Cancelado'),
    ]
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    fecha_pedido = models.DateField(auto_now_add=True)
    total_estimado = models.DecimalField(max_digits=12, decimal_places=2)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='PENDIENTE')
    detalles = models.TextField(help_text="Lista de productos y cantidades")

    def __str__(self):
        return f"Orden {self.id} - {self.proveedor.nombre}"

class ConsumoAlimento(models.Model):
    lote = models.ForeignKey('granja.LoteCerdos', on_delete=models.CASCADE, related_name='consumos')
    alimento = models.ForeignKey(Producto, on_delete=models.CASCADE, limit_choices_to={'categoria': 'ALIMENTO'})
    cantidad = models.FloatField(help_text="Cantidad consumida (Sacos/Kilos)")
    fecha = models.DateField(auto_now_add=True)
    monto_total = models.DecimalField(max_digits=12, decimal_places=2, help_text="Costo de este consumo para finanzas")

    def __str__(self):
        return f"Consumo {self.lote.id_batch}: {self.cantidad} de {self.alimento.nombre}"