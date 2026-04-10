# UNIVERSIDAD [NOMBRE DE LA UNIVERSIDAD]
## FACULTAD DE INGENIERÍA Y SISTEMAS
### TRABAJO FINAL: INGENIERÍA DE SOFTWARE II

**Proyecto:** Modernización y Refactorización del ERP "Finca la Primavera"  
**Autor:** [Nombre del Alumno]  
**Docente:** [Nombre del Docente]  
**Fecha:** 10 de Abril, 2026  

---

## 1. Introducción y Requisitos
El presente documento detalla la transformación técnica del sistema ERP de la Finca la Primavera, originalmente construido sobre una arquitectura monolítica y migrado hacia un diseño modular basado en principios SOLID, utilizando Django y React.

### 1.1 Trazabilidad de Requisitos (20)
1. **RF01:** Registro de lotes de cerdos con ID único.
2. **RF02:** Cálculo automático de edad en semanas.
3. **RF03:** Registro de peso inicial y biomasa actual.
4. **RF04:** Gestión de razas mediante catálogo.
5. **RF05:** Control de estados de salud (Saludable, Observación, Crítico).
6. **RF06:** Seguimiento de inversiones iniciales por lote.
7. **RF07:** Cálculo de rentabilidad por ciclo de engorde.
8. **RF08:** Inventario de insumos (concentrados, vacunas).
9. **RF09:** Alertas de stock mínimo.
10. **RF10:** Registro de ventas de ganado.
11. **RF11:** Gestión de clientes y pedidos.
12. **RF12:** Dashboards financieros de ingresos/egresos.
13. **RF13:** Gráficos de barra semestrales (P&L).
14. **RF14:** Seguimiento de cultivos (Papaya, Plátano).
15. **RF15:** Reportes de rendimiento por manzana cultivada.
16. **RF16:** Trazabilidad de aplicaciones sanitarias.
17. **RF17:** Gestión de roles de usuario.
18. **RF18:** Auditoría de transacciones contables.
19. **RF19:** Landing page interactiva para clientes externos.
20. **RF20:** Notificaciones de eventos críticos en corral.

---

## 2. Análisis del Sistema de Base de Datos
Se utilizó PostgreSQL 16 para garantizar la integridad referencial y el manejo de grandes volúmenes de datos financieros.

### 2.1 Diccionario de Datos (Resumen)
- **LoteCerdos:** Almacena la biomasa y edad de los animales.
- **Cultivo:** Registra la producción agrícola (Papaya/Plátano).
- **TransaccionContable:** Centraliza el flujo de efectivo.
- **StockInsumo:** Controla la disponibilidad de recursos (Alimentos/Medicinas).

---

## 3. Diagnóstico de Arquitectura y SOLID
Tras la auditoría técnica, se identificaron desviaciones que fueron corregidas bajo los siguientes principios:

- **Single Responsibility Principle (SRP):** Se separó el cálculo de biomasa de la gestión de ventas.
- **Dependency Inversion Principle (DIP):** Se implementaron interfaces para los repositorios de datos.
- **Interface Segregation (ISP):** Las APIs de ventas son ahora granulares.

---

## 6. Documentación Técnica del Proyecto
Esta sección describe la ingeniería interna del sistema, justificando la elección tecnológica y la estructura de componentes.

### 6.1 Arquitectura del Sistema
El sistema emplea un modelo **Decoupled Architecture (Arquitectura Desacoplada)**:
*   **Backend:** Desarrollado sobre el ecosistema **Python/Django**, proporcionando una capa de servicios RESTful segura y robusta. 
*   **Frontend:** Construido en **React**, permitiendo una interfaz de alta fidelidad, reactiva y orientada a la experiencia del usuario (UX).
*   **Comunicación:** Se utiliza el protocolo HTTP mediante mensajes **JSON**, garantizando que el cliente y el servidor puedan evolucionar de forma independiente.

### 6.2 Estructura del Proyecto
El código se organiza en micro-módulos o "Apps" de Django para maximizar la mantenibilidad:
*   `granja`: Gestiona la lógica ganadera y biológica.
*   `inventario`: Controla los niveles de stock y alertas.
*   `finanzas`: Centraliza el libro contable y reportes P&L.

### 6.4 Manejo de Base de Datos y Triggers
Para asegurar que los datos financieros siempre coincidan con la existencia física, se implementaron **Triggers Directos** en PostgreSQL. Un ejemplo crítico es la deducción automática de stock tras una venta, eliminando la posibilidad de "vender" insumos inexistentes.

### 6.6 Inteligencia Artificial Aplicada
El sistema no solo fue desarrollado usando IA (Antigravity), sino que se integraron validaciones lógicas asistidas para detectar anomalías en los registros de peso y salud, actuando como una "capa de inteligencia" adicional en la granja.

---

## 7. Manual de Usuario Final (Detallado)
Este manual guía al usuario a través de la gestión integral de Finca la Primavera, desde el ingreso hasta el análisis de rentabilidad.

### 7.1 Panel de Inicio y Experiencia de Entrada
Al iniciar el sistema, el usuario es recibido por una **Landing Page Dinámica** inspirada en una estética rural clásica (Noche de Granja).
1.  **Acceso:** El usuario visualiza la marca de la finca en un estilo retro-pixelado.
2.  **Menú:** El acceso a los paneles administrativos se realiza a través de la barra lateral, que permanece oculta para maximizar el área de trabajo.

### 7.1.2 Dashboard de Rentabilidad Operativa
Es el "Cerebro" de la finca. Aquí el administrador visualiza:
*   **Tarjetas de KPI:** Muestran el total de lotes activos, el número total de cabezas y la biomasa total en kg.
*   **Monitor de Salud:** Un recuento en tiempo real de cuántos animales están en estado "Saludable", "Observación" o "Revisión".
*   **Gráfico P&L:** Un análisis visual de Ingresos vs. Egresos mensuales.

### 7.1.3 Módulo de Gestión Ganadera (El Corazón del Sistema)
Este módulo permite el control total del ciclo de vida del cerdo.
1.  **Registro Inteligente:** Al presionar "Nuevo Ingreso", se despliega una "pantallita" (modal) profesional.
2.  **ID Personalizado:** El usuario puede asignar un ID manual (ej: L-502). El sistema **valida automáticamente** que el ID no esté repetido para evitar desorden.
3.  **Cálculo Automático de Edad:** Al ingresar la "Edad al Entrar", el sistema se encarga de actualizar los días de vida automáticamente cada semana, sin intervención manual.
4.  **Tabla Zebra:** La visualización de los lotes usa un diseño de "cebra" (azul claro/blanco) con iconos de salud (❤ para saludable, ⚠ para observación, 🩺 para revisión).

### 7.1.4 Módulo de Agricultura y Producción de Cultivos
Este módulo está diseñado para la administración de las manchas agrícolas de Papaya y Plátano.
1.  **Registro de Manzanas:** Permite documentar la extensión de tierra dedicada a cada fruto.
2.  **Estimación de Cosecha:** El sistema permite proyectar la cantidad de unidades que se esperan recolectar basándose en la fecha de siembra.
3.  **Estados de Crecimiento:** El usuario puede cambiar el estado de los cultivos (Crecimiento, Cosecha, Finalizado), permitiendo un seguimiento visual del campo.

### 7.1.5 Administración de Insumos y Bodega de Granja
Controla los recursos necesarios para la operación diaria.
*   **Alertas de Stock:** Si el alimento concentrado o las vacunas bajan de 10 unidades, el sistema resalta el registro en rojo para alertar al administrador.
*   **Categorización:** Insumos divididos en Alimentos, Medicinas y Herramientas.

### 7.1.6 Registro de Ventas y Trazabilidad Comercial
Cuando se realiza una venta de ganado o de frutas:
1.  Se registra el cliente y el monto.
2.  El sistema **deduce automáticamente** las cabezas vendidas del lote correspondiente.
3.  Se genera un movimiento contable que impacta inmediatamente en el Dashboard de Finanzas.

---

## 9. Bibliografía
- *Martin, R. C. (2017). Clean Architecture: A Craftsman's Guide to Software Structure and Design.*
- *Official Django Documentation (v4.2). https://docs.djangoproject.com/*
- *React - The Library for Web and Native User Interfaces. https://react.dev/*
- *Normas APA 7ma Edición.*

---

## 10. Anexos
1. Evidencia de validación de IDs duplicados.
2. Reporte de biomasa generado por el sistema.
3. Capturas del modal de registro y la tabla Zebra.
