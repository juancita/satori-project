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

export default function Piezas() {
  // Se duplica la lista para que la cinta se desplace en bucle sin cortes.
  const cinta = [...PRENDAS, ...PRENDAS]

  return (
    <div className="piezas">
      <section className="piezas-hero">
        <div className="container piezas-head">
          <p className="piezas-eyebrow">El Taller · Satori</p>
          <h1>Piezas terminadas</h1>
          <p>Pasa el cursor (o toca) sobre una pieza para verla en detalle.</p>
        </div>

        <div className="marquesina">
          <div className="marquesina-track">
            {cinta.map((src, idx) => (
              <div className="carta" key={idx}>
                <img
                  src={src}
                  alt={`Pieza Satori ${(idx % PRENDAS.length) + 1}`}
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
      <Contacto />
    </div>
  )
}
