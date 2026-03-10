from django.db import models
from granja.models import Animal
from inventario.models import Producto

class Venta(models.Model):
    fecha = models.DateField(auto_now_add=True)
    cliente = models.CharField(max_length=100)
    animales = models.ManyToManyField(Animal, blank=True)   # si vendes animales
    productos = models.ManyToManyField(Producto, blank=True) # si vendes insumos
    total = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"Venta a {self.cliente} por {self.total}"