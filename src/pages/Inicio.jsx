import { Link } from 'react-router-dom'
import BotonWhatsApp from '../components/BotonWhatsApp'
import './Inicio.css'

function EstrellaDivisor() {
  return (
    <div className="estrella-divisor" aria-hidden="true">
      <img src="/logo-estrella-militar.png" alt="" />
    </div>
  )
}

export default function Inicio() {
  return (
    <div className="pagina-inicio">

      {/* ── Hero: logo grande como protagonista ── */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-logo-wrap">
            <img
              src="/logo-pagina-principal.png"
              alt="Satori"
              className="hero-logo"
            />
          </div>
          <div className="hero-content">
            <p className="hero-eyebrow">Nueva Colección 2025</p>
            <h1>Define<br />tu estilo.</h1>
            <p className="hero-sub">
              Ropa de calidad premium, diseño minimalista.<br />
              Para los que entienden la diferencia.
            </p>
            <Link to="/catalogo" className="btn-catalogo">
              Ver Colección
            </Link>
          </div>
        </div>
      </section>

      <EstrellaDivisor />

      {/* ── Features ── */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <h3>Envíos Nacionales</h3>
              <p>Entrega a todo el país en 3–5 días hábiles.</p>
            </div>
            <div className="feature-item">
              <h3>Calidad Premium</h3>
              <p>Materiales seleccionados y confección de alto estándar.</p>
            </div>
            <div className="feature-item">
              <h3>Atención Directa</h3>
              <p>Pedidos y consultas personalizadas por WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      <EstrellaDivisor />

      {/* ── Contacto ── */}
      <section className="contacto" id="contacto">
        <div className="container">
          <h2>¿Listo para<br />vestirte bien?</h2>
          <p>Escríbenos y te asesoramos.</p>
          <BotonWhatsApp texto="Contactar por WhatsApp" />
        </div>
      </section>

    </div>
  )
}
