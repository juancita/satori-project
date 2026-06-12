import './BotonWhatsApp.css'

export default function BotonWhatsApp({ producto, texto = 'Comprar por WhatsApp' }) {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '5491234567890'
  const mensaje = producto
    ? `Hola, estoy interesado en: ${producto.nombre} - ${producto.talla ? `Talla: ${producto.talla}` : ''} - $${producto.precio}`
    : 'Hola, tengo una consulta'

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="boton-whatsapp">
      <span className="whatsapp-icon">💬</span>
      {texto}
    </a>
  )
}
