from django.db import models

class Animal(models.Model):
    tipo = models.CharField(max_length=100)
    peso = models.FloatField()