import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import BotonWhatsApp from '../components/BotonWhatsApp'
import productos from '../data/productos.json'
import './DetalleProducto.css'

export default function DetalleProducto() {
  const { id } = useParams()
  const [tallaSeleccionada, setTallaSeleccionada] = useState('')
  const [colorSeleccionado, setColorSeleccionado] = useState('')

  const producto = productos.find(p => p.id === parseInt(id))

  if (!producto) {
    return (
      <div className="container">
        <div className="producto-no-encontrado">
          <h2>Producto no encontrado</h2>
          <Link to="/catalogo">Volver al catálogo</Link>
        </div>
      </div>
    )
  }

  const productoConSelecciones = {
    ...producto,
    talla: tallaSeleccionada,
    color: colorSeleccionado
  }

  return (
    <div className="pagina-detalle">
      <div className="container">
        <Link to="/catalogo" className="volver-link">← Volver al catálogo</Link>

        <div className="detalle-contenido">
          <div className="detalle-imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>

          <div className="detalle-info">
            <h1>{producto.nombre}</h1>
            <p className="detalle-descripcion">{producto.descripcion}</p>

            <div className="detalle-precio">
              <p className="precio">${producto.precio}</p>
              <p className="moneda">ARS (Pesos Argentinos)</p>
            </div>

            <div className="detalle-detalles">
              <p>{producto.detalles}</p>
            </div>

            {producto.talles && (
              <div className="selector-talles">
                <label>Selecciona tu talle:</label>
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
              <div className="selector-colores">
                <label>Selecciona un color:</label>
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

            <div className="detalle-acciones">
              <BotonWhatsApp producto={productoConSelecciones} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
