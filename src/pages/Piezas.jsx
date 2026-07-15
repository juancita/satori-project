import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Contacto from '../components/Contacto'
import Opiniones from '../components/Opiniones'
import './Piezas.css'

const NUMERO_WA = import.meta.env.VITE_WHATSAPP_NUMBER || '573153152807'
const URL_WA = `https://wa.me/${NUMERO_WA}?text=${encodeURIComponent(
  'Hola, quiero diseñar una prenda a mi medida con Satori.'
)}`

const PRENDAS = [
  '/media/prenda-1.jpg',
  '/media/prenda-2.jpg',
  '/media/prenda-3.jpg',
  '/media/prenda-4.jpg',
  '/media/prenda-5.jpg',
  '/media/prenda-6.jpg',
  '/media/prenda-7.jpg',
]

const VELOCIDAD = 0.4 // px por frame — desplazamiento automático lento

export default function Piezas() {
  // Se duplica la lista para que la cinta se desplace en bucle sin cortes.
  const cinta = [...PRENDAS, ...PRENDAS]
  const trackRef = useRef(null)
  const nudgeRef = useRef(null) // función para mover con las flechas

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let offset = 0
    let anchoSet = track.scrollWidth / 2 // ancho de una copia de la lista
    let paso = 300 // ancho de una carta + separación (para las flechas)
    let objetivo = null // destino de una flecha (glide suave)
    let inercia = 0 // impulso al soltar el arrastre
    let arrastrando = false
    let sobre = false
    let inicioX = 0
    let ultimoX = 0
    let offsetInicial = 0
    let raf

    const medir = () => {
      anchoSet = track.scrollWidth / 2
      const c = track.children
      if (c.length > 1) {
        paso = c[1].getBoundingClientRect().left - c[0].getBoundingClientRect().left
      }
    }
    medir()

    const acomodar = () => {
      if (anchoSet <= 0) return
      // Mantener offset en (-anchoSet, 0]; ajustar también el objetivo para
      // que el glide de las flechas no salte al cruzar el bucle.
      while (offset <= -anchoSet) {
        offset += anchoSet
        if (objetivo !== null) objetivo += anchoSet
      }
      while (offset > 0) {
        offset -= anchoSet
        if (objetivo !== null) objetivo -= anchoSet
      }
    }
    const pintar = () => {
      track.style.transform = `translate3d(${offset}px, 0, 0)`
    }

    const bucle = () => {
      if (!arrastrando) {
        if (objetivo !== null) {
          offset += (objetivo - offset) * 0.14
          if (Math.abs(objetivo - offset) < 0.5) {
            offset = objetivo
            objetivo = null
          }
          acomodar()
          pintar()
        } else if (Math.abs(inercia) > 0.15) {
          offset += inercia
          inercia *= 0.92 // fricción
          acomodar()
          pintar()
        } else if (!sobre) {
          offset -= VELOCIDAD
          acomodar()
          pintar()
        }
      }
      raf = requestAnimationFrame(bucle)
    }
    raf = requestAnimationFrame(bucle)

    window.addEventListener('resize', medir)
    const imgs = track.querySelectorAll('img')
    imgs.forEach((img) => img.addEventListener('load', medir))

    // ── Arrastre ──
    const onDown = (e) => {
      arrastrando = true
      objetivo = null
      inercia = 0
      inicioX = e.clientX
      ultimoX = e.clientX
      offsetInicial = offset
      track.classList.add('is-dragging')
      try {
        track.setPointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
    }
    const onMove = (e) => {
      if (!arrastrando) return
      inercia = e.clientX - ultimoX // último desplazamiento => impulso
      ultimoX = e.clientX
      offset = offsetInicial + (e.clientX - inicioX)
      acomodar()
      pintar()
    }
    const onUp = (e) => {
      if (!arrastrando) return
      arrastrando = false
      track.classList.remove('is-dragging')
      try {
        track.releasePointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
    }
    const onEnter = () => {
      sobre = true
    }
    const onLeave = () => {
      sobre = false
    }

    track.addEventListener('pointerdown', onDown)
    track.addEventListener('pointermove', onMove)
    track.addEventListener('pointerup', onUp)
    track.addEventListener('pointercancel', onUp)
    track.addEventListener('pointerenter', onEnter)
    track.addEventListener('pointerleave', onLeave)

    // Flechas: fijan un destino y el bucle desliza suave hasta él.
    nudgeRef.current = (dir) => {
      const base = objetivo !== null ? objetivo : offset
      inercia = 0
      objetivo = base + dir * paso
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', medir)
      imgs.forEach((img) => img.removeEventListener('load', medir))
      track.removeEventListener('pointerdown', onDown)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointercancel', onUp)
      track.removeEventListener('pointerenter', onEnter)
      track.removeEventListener('pointerleave', onLeave)
      nudgeRef.current = null
    }
  }, [])

  return (
    <div className="piezas">
      <section className="piezas-hero">
        <div className="container piezas-head">
          <p className="piezas-eyebrow">El Taller · Satori</p>
          <h1>Piezas terminadas</h1>
          <p>Arrástralas con el dedo o el mouse, o usa las flechas; se mueven solas al soltar.</p>
          <Link to="/taller" className="piezas-btn-taller">
            ¿Cómo las hacemos? Conoce El Taller
          </Link>
        </div>

        <div className="carrusel">
          <button
            className="carrusel-flecha carrusel-flecha--prev"
            aria-label="Ver anteriores"
            onClick={() => nudgeRef.current?.(1)}
          >
            ‹
          </button>

          <div className="marquesina">
            <div className="marquesina-track" ref={trackRef}>
              {cinta.map((src, idx) => (
                <div className="carta" key={idx}>
                  <img
                    src={src}
                    alt={`Pieza Satori ${(idx % PRENDAS.length) + 1}`}
                    draggable="false"
                    loading={idx < PRENDAS.length ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="carrusel-flecha carrusel-flecha--next"
            aria-label="Ver siguientes"
            onClick={() => nudgeRef.current?.(-1)}
          >
            ›
          </button>
        </div>
      </section>

      {/* ── Opiniones de clientes ── */}
      <Opiniones />

      {/* ── CTA final (igual que en el Taller) ── */}
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

      {/* ── Redes sociales ── */}
      <Contacto
        titulo={
          <>
            Síguenos<br />en redes
          </>
        }
        subtitulo="Novedades, lanzamientos y contenido exclusivo."
      />
    </div>
  )
}
