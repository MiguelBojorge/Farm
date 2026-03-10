"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from granja.views import AnimalViewSet
from inventario.views import ProductoViewSet
from finanzas.views import TransaccionViewSet
from ventas.views import VentaViewSet



router = routers.DefaultRouter()
router.register(r'animales', AnimalViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'transacciones', TransaccionViewSet)
router.register(r'ventas', VentaViewSet)




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

]
