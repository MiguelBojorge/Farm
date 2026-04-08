from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

def generate_invoice_pdf(venta):
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    
    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, 750,f"Factura de Venta")
    
    p.setFont("Helvetica", 12)
    p.drawString(100, 730, f"Venta ID: {venta.id}")
    p.drawString(100, 715, f"Cliente: {venta.cliente.nombre}")
    p.drawString(100, 700, f"Fecha: {venta.fecha.strftime('%Y-%m-%d %H:%M')}")
    
    p.drawString(100, 670, "--------------------------------------------------------")
    
    y = 650
    p.drawString(100, y, "Item")
    p.drawString(300, y, "Cantidad")
    p.drawString(400, y, "Precio")
    p.drawString(500, y, "Subtotal")
    
    y -= 20
    for detalle in venta.detalles.all():
        item_name = ""
        if detalle.producto: item_name = detalle.producto.nombre
        elif detalle.lote_cerdos: item_name = f"Lote {detalle.lote_cerdos.id_batch}"
        elif detalle.cultivo: item_name = detalle.cultivo.get_tipo_display()
        
        p.drawString(100, y, item_name[:25])
        p.drawString(300, y, str(detalle.cantidad))
        p.drawString(400, y, f"${detalle.precio_unitario}")
        p.drawString(500, y, f"${detalle.subtotal}")
        y -= 15
        if y < 100:
            p.showPage()
            y = 750
            
    p.drawString(100, y-20, "--------------------------------------------------------")
    p.setFont("Helvetica-Bold", 14)
    p.drawString(400, y-40, f"TOTAL: ${venta.total}")
    
    p.showPage()
    p.save()
    
    buffer.seek(0)
    return buffer
