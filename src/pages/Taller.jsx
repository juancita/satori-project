import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Floating, { FloatingElement } from '../components/ParallaxFloating'
import './Taller.css'

const NUMERO_WA = import.meta.env.VITE_WHATSAPP_NUMBER || '573153152807'
const URL_WA = `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(
  'Hola, quiero diseñar una prenda a mi medida con Satori.'
)}`

// Video de fondo: sin audio, en loop, cámara lenta y sin interacción (solo visual).
function VideoFondo({ src, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.playbackRate = 0.55 // cámara lenta
  }, [])
  return (
    <video
      ref={ref}
      className={`taller-video ${className}`}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}

const PASOS = [
  {
    n: '01',
    video: '/media/midiendo.mp4',
    titulo: 'Tu idea, a tu medida',
    texto:
      'Todo empieza contigo. Escuchamos lo que imaginas y tomamos tus medidas para que la prenda sea tuya de verdad, no una talla más.',
  },
  {
    n: '02',
    video: '/media/cortando.mp4',
    titulo: 'Corte y patrón',
    texto:
      'Cada pieza se traza y se corta a mano, con un patrón pensado solo para ti. Ahí nace el detalle que nadie más va a tener.',
  },
  {
    n: '03',
    video: '/media/cosiendo.mp4',
    titulo: 'Confección',
    texto:
      'Costura reforzada, materiales seleccionados y acabados que solo se logran pieza por pieza. Sin prisa, con oficio.',
  },
  {
    n: '04',
    video: '/media/ajustando-a-medida.mp4',
    titulo: 'Ajuste final',
    texto:
      'La afinamos hasta que cae perfecta. El resultado es una prenda única, imposible de repetir en serie.',
  },
]

// Fotos flotantes de las piezas terminadas (mismo diseño que el hero de Inicio).
const PIEZAS_FOTOS = [
  { src: '/media/prenda-1.jpg', depth: 0.6, clase: 'taller-pieza--1' },
  { src: '/media/prenda-2.jpg', depth: 1, clase: 'taller-pieza--2' },
  { src: '/media/prenda-3.jpg', depth: 2, clase: 'taller-pieza--3' },
  { src: '/media/prenda-4.jpg', depth: 1.4, clase: 'taller-pieza--4' },
  { src: '/media/prenda-5.jpg', depth: 2.6, clase: 'taller-pieza--5' },
  { src: '/media/prenda-6.jpg', depth: 1.2, clase: 'taller-pieza--6' },
]

export default function Taller() {
  return (
    <div className="taller">
      {/* ── Hero ── */}
      <section className="taller-hero">
        <div className="container taller-hero-inner">
          <div className="taller-hero-content">
            <p className="taller-eyebrow">El Taller · Satori</p>
            <h1>
              Hecho a mano,
              <br />
              hecho para ti.
            </h1>
            <p className="taller-sub">
              No vendemos tallas: creamos piezas. Diseñamos, cortamos y
              confeccionamos ropa única para quienes no visten como los demás.
            </p>
            <a
              href={URL_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="taller-cta"
            >
              Diseña la tuya
            </a>
          </div>
          <div className="taller-hero-media">
            <VideoFondo src="/media/cortando.mp4" />
            <div className="taller-paso-tint" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ── Proceso ── */}
      <section className="taller-proceso">
        <div className="container taller-proceso-intro">
          <h2>Detrás de cada prenda</h2>
          <p>El proceso que convierte una idea en una pieza que solo existe una vez.</p>
        </div>

        {PASOS.map((paso, i) => (
          <div
            className={'taller-paso' + (i % 2 === 1 ? ' taller-paso--alt' : '')}
            key={paso.n}
          >
            <div className="taller-paso-media">
              <VideoFondo src={paso.video} />
              <div className="taller-paso-tint" aria-hidden="true" />
            </div>
            <div className="taller-paso-texto">
              <span className="taller-paso-num">{paso.n}</span>
              <h3>{paso.titulo}</h3>
              <p>{paso.texto}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Piezas terminadas: showcase flotante + botón al carrusel ── */}
      <section className="taller-piezas">
        <Floating sensitivity={-1} easingFactor={0.06}>
          {PIEZAS_FOTOS.map((foto) => (
            <FloatingElement
              key={foto.src}
              depth={foto.depth}
              className={`taller-pieza ${foto.clase}`}
            >
              <img src={foto.src} alt="" loading="lazy" />
            </FloatingElement>
          ))}

          <FloatingElement depth={0.4} className="taller-piezas-centro-float">
            <div className="taller-piezas-centro">
              <h2>Piezas terminadas</h2>
              <p>Una muestra de lo que hemos creado. La próxima puede ser tuya.</p>
              <Link to="/piezas" className="taller-cta">Ver las piezas</Link>
            </div>
          </FloatingElement>
        </Floating>
      </section>

      {/* ── CTA final ── */}
      <section className="taller-final">
        <div className="container">
          <h2>¿Listo para tu pieza única?</h2>
          <p>Cuéntanos tu idea y la hacemos realidad.</p>
          <a
            href={URL_WA}
            target="_blank"
            rel="noopener noreferrer"
            className="taller-cta"
          >
            Empezar mi diseño
          </a>
        </div>
      </section>
    </div>
  )
}
