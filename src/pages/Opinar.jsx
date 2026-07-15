import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import './Opinar.css'

const EMAIL = 'satoriessence.co@gmail.com'
// Opcional: si algún día configuras Formspree, define VITE_FORMSPREE_ENDPOINT
// en tu .env y las opiniones llegarán sin abrir la app de correo.
const FORMSPREE = import.meta.env.VITE_FORMSPREE_ENDPOINT

export default function Opinar() {
  const [params] = useSearchParams()
  const [nombre, setNombre] = useState('')
  const [prenda, setPrenda] = useState(params.get('producto') || '')
  const [estrellas, setEstrellas] = useState(0)
  const [hover, setHover] = useState(0)
  const [comentario, setComentario] = useState('')
  const [estado, setEstado] = useState('idle') // idle | enviando | ok | error

  const valido = nombre.trim() && estrellas > 0 && comentario.trim()

  const enviar = async (e) => {
    e.preventDefault()
    if (!valido) return
    const datos = {
      nombre: nombre.trim(),
      prenda: prenda.trim(),
      estrellas,
      comentario: comentario.trim(),
    }

    if (FORMSPREE) {
      setEstado('enviando')
      try {
        const r = await fetch(FORMSPREE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(datos),
        })
        setEstado(r.ok ? 'ok' : 'error')
      } catch {
        setEstado('error')
      }
    } else {
      // Sin backend: se abre el correo con la opinión ya redactada hacia Satori.
      const asunto = `Opinión de ${datos.nombre} — ${estrellas}★`
      const cuerpo =
        `Nombre: ${datos.nombre}\n` +
        `Prenda: ${datos.prenda || '-'}\n` +
        `Puntuación: ${estrellas}/5\n\n` +
        `${datos.comentario}`
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        asunto
      )}&body=${encodeURIComponent(cuerpo)}`
      setEstado('ok')
    }
  }

  if (estado === 'ok') {
    return (
      <div className="opinar">
        <div className="container opinar-gracias">
          <div className="opinar-check" aria-hidden="true">✓</div>
          <h1>¡Gracias por tu opinión!</h1>
          <p>
            La revisamos y, si todo está en orden, la publicamos pronto en la
            sección de piezas. Tu voz ayuda a la comunidad Satori.
          </p>
          <Link to="/piezas" className="opinar-btn">Ver las piezas</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="opinar">
      <section className="container opinar-inner">
        <p className="opinar-eyebrow">Tu opinión · Satori</p>
        <h1>Cuéntanos tu experiencia</h1>
        <p className="opinar-sub">
          ¿Compraste una pieza Satori? Déjanos tu reseña y una puntuación.
        </p>

        <form className="opinar-form" onSubmit={enviar}>
          <label className="opinar-campo">
            <span>Tu nombre</span>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Camila R."
              maxLength={40}
              required
            />
          </label>

          <label className="opinar-campo">
            <span>¿Qué prenda compraste? (opcional)</span>
            <input
              type="text"
              value={prenda}
              onChange={(e) => setPrenda(e.target.value)}
              placeholder="Ej: Conjunto camo"
              maxLength={60}
            />
          </label>

          <div className="opinar-campo">
            <span>Tu puntuación</span>
            <div className="opinar-estrellas" role="radiogroup" aria-label="Puntuación">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  className={'opinar-estrella' + (n <= (hover || estrellas) ? ' is-activa' : '')}
                  onClick={() => setEstrellas(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
                  aria-pressed={estrellas === n}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <label className="opinar-campo">
            <span>Tu reseña</span>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="¿Qué te pareció la calidad, el diseño, la atención...?"
              rows={5}
              maxLength={500}
              required
            />
          </label>

          {estado === 'error' && (
            <p className="opinar-error">
              No se pudo enviar. Escríbenos directamente a {EMAIL}.
            </p>
          )}

          <button type="submit" className="opinar-btn" disabled={!valido || estado === 'enviando'}>
            {estado === 'enviando' ? 'Enviando…' : 'Enviar opinión'}
          </button>
        </form>
      </section>
    </div>
  )
}
