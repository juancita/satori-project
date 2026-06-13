import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import BotonWhatsApp from '../components/BotonWhatsApp'
import productos from '../data/productos.json'
import './DetalleProducto.css'

export default function DetalleProducto() {
  const { id } = useParams()
  const [tallaSeleccionada, setTallaSeleccionada] = useState('')
  const [colorSeleccionado, setColorSeleccionado] = useState('')
  const [imagenActiva, setImagenActiva] = useState(null)

  const producto = productos.find(p => p.id === parseInt(id))

  if (!producto) {
    return (
      <div className="detalle-error">
        <div className="container">
          <h2>Producto no encontrado</h2>
          <Link to="/catalogo" className="btn-volver-error">← Volver al catálogo</Link>
        </div>
      </div>
    )
  }

  const imagenMostrada = imagenActiva || producto.imagen

  const productoConSelecciones = {
    ...producto,
    talla: tallaSeleccionada,
    color: colorSeleccionado,
  }

  return (
    <div className="pagina-detalle">
      <div className="container">
        <Link to="/catalogo" className="volver-link">← Catálogo</Link>

        <div className="detalle-grid">

          {/* ── Columna izquierda: Video + Watermark estrella + Imagen ── */}
          <div className="detalle-media">
            <div className="media-container">

              {/* Capa 0: video de fondo */}
              <video
                className="video-bg"
                src={producto.video}
                autoPlay
                loop
                muted
                playsInline
                key={producto.video}
              />

              {/* Capa 1: estrella militar como watermark de marca */}
              <div className="star-watermark" aria-hidden="true">
                <img src="/logo-estrella-militar.png" alt="" />
              </div>

              {/* Capa 2: imagen PNG de la prenda */}
              <div className="imagen-overlay">
                <img src={imagenMostrada} alt={producto.nombre} />
              </div>

            </div>

            {producto.imagenes && producto.imagenes.length > 1 && (
              <div className="thumbnails">
                {producto.imagenes.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${imagenMostrada === img ? 'activo' : ''}`}
                    onClick={() => setImagenActiva(img)}
                    aria-label={`Vista ${idx + 1}`}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Columna derecha: Info ── */}
          <div className="detalle-info">
            <div className="detalle-header">
              <img src="/logo-en-blanco.png" alt="Satori" className="detalle-logo" />
              <span className="detalle-categoria">Colección Satori</span>
            </div>

            <h1 className="detalle-nombre">{producto.nombre}</h1>
            <p className="detalle-descripcion">{producto.descripcion}</p>
            <p className="detalle-precio">${producto.precio.toLocaleString('es-CO')}</p>

            {producto.talles && (
              <div className="selector-grupo">
                <p className="selector-label">
                  Talla
                  {tallaSeleccionada && <span className="seleccion-valor"> — {tallaSeleccionada}</span>}
                </p>
                <div className="talles-grid">
                  {producto.talles.map(talle => (
                    <button
                      key={talle}
                      className={`talle-btn ${tallaSeleccionada === talle ? 'activo' : ''}`}
                      onClick={() => setTallaSeleccionada(talle)}
                    >
                      {talle}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {producto.colores && (
              <div className="selector-grupo">
                <p className="selector-label">
                  Color
                  {colorSeleccionado && <span className="seleccion-valor"> — {colorSeleccionado}</span>}
                </p>
                <div className="colores-grid">
                  {producto.colores.map(color => (
                    <button
                      key={color}
                      className={`color-btn ${colorSeleccionado === color ? 'activo' : ''}`}
                      onClick={() => setColorSeleccionado(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="detalle-detalles">{producto.detalles}</p>

            <div className="detalle-acciones">
              <BotonWhatsApp producto={productoConSelecciones} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
