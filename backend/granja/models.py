from django.db import models

class LoteCerdos(models.Model):
    ESTADO_CHOICES = [
        ('ENGORDE', 'Engorde'),
        ('CRIA', 'Cría'),
        ('DESTETE', 'Destete'),
    ]
    id_batch = models.CharField(max_length=50, unique=True, verbose_name="ID de Lote")
    fecha_entrada = models.DateField()
    cantidad_inicial = models.IntegerField()
    cantidad_actual = models.IntegerField()
    peso_promedio_inicial = models.FloatField(help_text="Peso en kg al entrar")
    peso_actual = models.FloatField(default=0, help_text="Peso promedio actual en kg")
    costo_inicial = models.DecimalField(max_digits=12, decimal_places=2, default=0, help_text="C$ invertidos inicialmente")
    raza = models.CharField(max_length=100)
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='ENGORDE')
    observaciones = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Lote {self.id_batch} - {self.raza}"

class Cultivo(models.Model):
    TIPO_CHOICES = [
        ('PAPAYA', 'Papaya'),
        ('PLATANO', 'Plátano'),
    ]
    ESTADO_CHOICES = [
        ('CRECIMIENTO', 'En Crecimiento'),
        ('COSECHA', 'En Cosecha'),
        ('FINALIZADO', 'Finalizado'),
    ]
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    area_manzanas = models.FloatField()
    fecha_siembra = models.DateField()
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='CRECIMIENTO')
    cantidad_estimada = models.IntegerField(help_text="Unidades estimadas")

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.area_manzanas} Manzanas"

class RegistroPeso(models.Model):
    lote = models.ForeignKey(LoteCerdos, on_delete=models.CASCADE, related_name='historial_pesos')
    fecha = models.DateField(auto_now_add=True)
    peso = models.FloatField(help_text="Peso registrado en esta fecha")

    def __str__(self):
        return f"Peso {self.lote.id_batch} - {self.fecha}: {self.peso}kg"

class RegistroSalud(models.Model):
    lote = models.ForeignKey(LoteCerdos, on_delete=models.CASCADE, related_name='registros_salud')
    fecha = models.DateField()
    descripcion = models.CharField(max_length=200, help_text="Ej: Vacuna contra parvovirus")
    tratamiento = models.TextField()
    responsable = models.CharField(max_length=100)

    def __str__(self):
        return f"Salud {self.lote.id_batch} - {self.fecha}"