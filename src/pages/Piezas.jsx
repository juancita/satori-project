import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Contacto from '../components/Contacto'
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

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let offset = 0
    let anchoSet = track.scrollWidth / 2 // ancho de una copia de la lista
    let arrastrando = false
    let sobre = false // el puntero está encima (pausa para inspeccionar)
    let inicioX = 0
    let offsetInicial = 0
    let raf

    const acomodar = () => {
      if (anchoSet <= 0) return
      // Mantener el offset dentro de (-anchoSet, 0] para el bucle infinito
      while (offset <= -anchoSet) offset += anchoSet
      while (offset > 0) offset -= anchoSet
    }
    const pintar = () => {
      track.style.transform = `translate3d(${offset}px, 0, 0)`
    }

    // Auto-desplazamiento: solo cuando el usuario NO está arrastrando ni encima
    const bucle = () => {
      if (!arrastrando && !sobre) {
        offset -= VELOCIDAD
        acomodar()
        pintar()
      }
      raf = requestAnimationFrame(bucle)
    }
    raf = requestAnimationFrame(bucle)

    const recalcular = () => {
      anchoSet = track.scrollWidth / 2
    }
    recalcular()
    window.addEventListener('resize', recalcular)
    const imgs = track.querySelectorAll('img')
    imgs.forEach((img) => img.addEventListener('load', recalcular))

    // ── Arrastre (mouse / touch / lápiz) ──
    const onDown = (e) => {
      arrastrando = true
      inicioX = e.clientX
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

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', recalcular)
      imgs.forEach((img) => img.removeEventListener('load', recalcular))
      track.removeEventListener('pointerdown', onDown)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointercancel', onUp)
      track.removeEventListener('pointerenter', onEnter)
      track.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="piezas">
      <section className="piezas-hero">
        <div className="container piezas-head">
          <p className="piezas-eyebrow">El Taller · Satori</p>
          <h1>Piezas terminadas</h1>
          <p>Arrástralas con el dedo o el mouse; se mueven solas cuando las sueltas.</p>
          <Link to="/taller" className="piezas-btn-taller">
            ¿Cómo las hacemos? Conoce El Taller
          </Link>
        </div>

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
      </section>

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
