import { useCallback, useEffect, useState } from 'react'
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

export default function Piezas() {
  const [i, setI] = useState(0)
  const total = PRENDAS.length

  const prev = useCallback(() => setI((n) => (n - 1 + total) % total), [total])
  const next = useCallback(() => setI((n) => (n + 1) % total), [total])

  // Flechas del teclado para navegar el carrusel.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  return (
    <div className="piezas">
      <section className="piezas-hero">
        <div className="container piezas-head">
          <p className="piezas-eyebrow">El Taller · Satori</p>
          <h1>Piezas terminadas</h1>
          <p>Explora cada pieza en detalle. Usa las flechas para navegar.</p>
        </div>

        <div className="carrusel">
          <button
            className="carrusel-flecha carrusel-prev"
            onClick={prev}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className="carrusel-viewport">
            <div
              className="carrusel-track"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {PRENDAS.map((src, idx) => (
                <div className="carrusel-slide" key={src}>
                  <img
                    src={src}
                    alt={`Pieza Satori ${idx + 1}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            className="carrusel-flecha carrusel-next"
            onClick={next}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>

        <div className="carrusel-dots">
          {PRENDAS.map((src, idx) => (
            <button
              key={src}
              className={'carrusel-dot' + (idx === i ? ' is-activo' : '')}
              onClick={() => setI(idx)}
              aria-label={`Ir a la pieza ${idx + 1}`}
            />
          ))}
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
    </div>
  )
}
