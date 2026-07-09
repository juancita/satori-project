import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Contacto from '../components/Contacto'
import EntradaWarp from '../components/EntradaWarp'
import './Inicio.css'

function EstrellaDivisor() {
  return (
    <div className="estrella-divisor" aria-hidden="true">
      <img src="/logo-estrella-militar.png" alt="" />
    </div>
  )
}

export default function Inicio() {
  const location = useLocation()
  const [entrada, setEntrada] = useState(!!location.state?.fromLobby)

  // Si se llega pidiendo contacto (desde el lobby) o con #contacto en la URL,
  // desplazarse a esa sección tras montar — la SPA no resuelve el hash sola.
  // Solo al montar: si hay overlay de entrada, salto instantáneo (queda detrás).
  useEffect(() => {
    const irContacto =
      location.state?.scrollContacto || window.location.hash === '#contacto'
    if (irContacto) {
      const el = document.getElementById('contacto')
      if (el) el.scrollIntoView({ behavior: entrada ? 'auto' : 'smooth' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="pagina-inicio">
      {entrada && <EntradaWarp onDone={() => setEntrada(false)} />}

      {/* ── Hero: logo grande como protagonista ── */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-logo-wrap">
            <img
              src="/logo-inicio.png"
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

      {/* ── Vitrina en video (sudadre-satori-1) ── */}
      <section className="vitrina">
        <video
          className="vitrina-video"
          src="/sudadre-satori-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="vitrina-overlay" aria-hidden="true" />
        <div className="container vitrina-content">
          <p className="vitrina-eyebrow">Diseño propio</p>
          <h2>Piezas que<br />hablan por ti.</h2>
          <Link to="/taller" className="vitrina-cta">Conoce el taller</Link>
        </div>
      </section>

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

      {/* ── Lookbook: modelos exhibiéndose ── */}
      <section className="lookbook">
        <div className="container lookbook-intro">
          <h2>En la calle</h2>
          <p>Así se lleva Satori.</p>
        </div>
        <div className="lookbook-grid">
          <div className="lookbook-item lookbook-item--tall">
            <img src="/media/modelo-mujer.jpg" alt="Modelo Satori" loading="lazy" />
          </div>
          <div className="lookbook-item">
            <img src="/media/modelo-hombre.jpg" alt="Modelo Satori" loading="lazy" />
          </div>
          <div className="lookbook-item">
            <img src="/media/modelo-mujer-2.jpg" alt="Modelo Satori" loading="lazy" />
          </div>
          <div className="lookbook-item lookbook-item--tall">
            <img src="/media/modelo-mujer-3.jpg" alt="Modelo Satori" loading="lazy" />
          </div>
        </div>
      </section>

      <EstrellaDivisor />

      {/* ── Contacto ── */}
      <Contacto />

    </div>
  )
}
