import { Link } from 'react-router-dom'
import BotonWhatsApp from '../components/BotonWhatsApp'
import './Inicio.css'

export default function Inicio() {
  return (
    <div className="pagina-inicio">
      <section className="hero">
        <div className="container">
          <h1>Bienvenido a Satori</h1>
          <p>Descubre nuestras colecciones de ropa moderna y de calidad</p>
          <Link to="/catalogo" className="btn-inicio">
            Ver Catálogo
          </Link>
        </div>
      </section>

      <section className="destacados">
        <div className="container">
          <h2>Destacados</h2>
          <div className="grid-destacados">
            <div className="card-destacado">
              <h3>📦 Envíos Rápidos</h3>
              <p>Entrega en todo el país</p>
            </div>
            <div className="card-destacado">
              <h3>💳 Múltiples Formas de Pago</h3>
              <p>Efectivo, transferencia o WhatsApp</p>
            </div>
            <div className="card-destacado">
              <h3>⭐ Productos de Calidad</h3>
              <p>100% auténticos y certificados</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contacto" id="contacto">
        <div className="container">
          <h2>¿Preguntas?</h2>
          <p>¡Contáctanos por WhatsApp!</p>
          <BotonWhatsApp texto="Chatear Ahora" />
        </div>
      </section>
    </div>
  )
}
