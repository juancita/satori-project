import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Floating, { FloatingElement } from '../components/ParallaxFloating'
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

// Fotos flotantes del hero (modelos exhibiéndose).
const FOTOS_HERO = [
  { src: '/media/modelo-mujer.jpg', depth: 0.6, clase: 'hero-foto--1' },
  { src: '/media/modelo-hombre.jpg', depth: 1, clase: 'hero-foto--2' },
  { src: '/media/modelo-sudadera-1.jpg', depth: 2, clase: 'hero-foto--3' },
  { src: '/media/modelo-militar-1.jpg', depth: 1.4, clase: 'hero-foto--4' },
  { src: '/media/modelo-mujer-2.jpg', depth: 2.6, clase: 'hero-foto--5' },
  { src: '/media/modelo-mujer-3.jpg', depth: 1.2, clase: 'hero-foto--6' },
]

// Vitrina: 3 videos (4:5) que se cambian solos, con crossfade y cámara lenta.
const VITRINA_VIDEOS = [
  '/sudadre-satori-1.mp4',
  '/satori-militari-1.mp4',
  '/satori-militari-2-final.mp4',
]

function VitrinaCarrusel() {
  const [activo, setActivo] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    refs.current.forEach((v) => {
      if (v) v.playbackRate = 0.6 // cámara lenta
    })
  }, [])

  useEffect(() => {
    const id = setInterval(
      () => setActivo((a) => (a + 1) % VITRINA_VIDEOS.length),
      6500
    )
    return () => clearInterval(id)
  }, [])

  return (
    <div className="vitrina-marco">
      {VITRINA_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => (refs.current[i] = el)}
          className={'vitrina-video' + (i === activo ? ' is-activo' : '')}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      ))}
      <div className="vitrina-marco-tint" aria-hidden="true" />
    </div>
  )
}

export default function Inicio() {
  const location = useLocation()
  const [entrada, setEntrada] = useState(!!location.state?.fromLobby)

  // Si se llega pidiendo contacto (desde el lobby) o con #contacto en la URL,
  // desplazarse a esa sección tras montar — la SPA no resuelve el hash sola.
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

      {/* ── Hero: logo flotante + fotos con parallax que siguen el mouse ── */}
      <section className="hero">
        <Floating sensitivity={-1} easingFactor={0.06}>
          {FOTOS_HERO.map((foto) => (
            <FloatingElement
              key={foto.src}
              depth={foto.depth}
              className={`hero-foto ${foto.clase}`}
            >
              <div className="foto-card">
                <img src={foto.src} alt="" loading="lazy" />
              </div>
            </FloatingElement>
          ))}

          {/* Bloque central: también flota levemente con el mouse */}
          <FloatingElement depth={0.4} className="hero-centro-float">
            <div className="hero-centro">
              <img src="/logo-inicio.png" alt="Satori" className="hero-logo" />
              <h1>Define<br />tu estilo.</h1>
              <p className="hero-sub">
                Ropa de calidad premium, diseño minimalista.<br />
                Para los que entienden la diferencia.
              </p>
              <Link to="/taller" className="btn-catalogo">
                Ver el taller
              </Link>
            </div>
          </FloatingElement>
        </Floating>
      </section>

      <EstrellaDivisor />

      {/* ── Vitrina en video ── */}
      <section className="vitrina">
        <div className="container vitrina-inner">
          <div className="vitrina-texto">
            <p className="vitrina-eyebrow">Diseño propio</p>
            <h2>Piezas que<br />hablan por ti.</h2>
            <p className="vitrina-desc">
              Prendas pensadas al detalle, hechas para destacar.
            </p>
            <Link to="/taller" className="vitrina-cta">Conoce el taller</Link>
          </div>
          <VitrinaCarrusel />
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

      <EstrellaDivisor />

      {/* ── Contacto ── */}
      <Contacto />

    </div>
  )
}
