import { Link } from 'react-router-dom'
import opiniones from '../data/opiniones.json'
import './Opiniones.css'

function Estrellas({ n }) {
  const llenas = Math.max(0, Math.min(5, n))
  return (
    <span className="op-estrellas" aria-label={`${llenas} de 5`}>
      <span className="op-estrellas-llenas">{'★★★★★'.slice(0, llenas)}</span>
      <span className="op-estrellas-vacias">{'★★★★★'.slice(0, 5 - llenas)}</span>
    </span>
  )
}

export default function Opiniones() {
  return (
    <section className="opiniones">
      <div className="container">
        <div className="opiniones-head">
          <h2>Opiniones</h2>
          <p>Lo que dicen quienes ya visten Satori.</p>
        </div>

        {opiniones.length === 0 ? (
          <p className="opiniones-vacio">
            Todavía no hay opiniones. ¿Ya tienes una pieza Satori?{' '}
            <Link to="/opinar">Sé el primero en opinar</Link>.
          </p>
        ) : (
          <div className="opiniones-grid">
            {opiniones.map((o) => (
              <div className="opinion-card" key={o.id}>
                <Estrellas n={o.estrellas} />
                <p className="opinion-texto">“{o.comentario}”</p>
                <p className="opinion-autor">
                  {o.nombre}
                  {o.prenda ? <span> · {o.prenda}</span> : null}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="opiniones-cta">
          <Link to="/opinar" className="opiniones-btn">Deja tu opinión</Link>
        </div>
      </div>
    </section>
  )
}
