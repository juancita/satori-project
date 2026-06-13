import { Link } from 'react-router-dom'
import './TarjetaProducto.css'

export default function TarjetaProducto({ producto }) {
  return (
    <Link to={`/producto/${producto.id}`} className="tarjeta-producto">
      <div className="tarjeta-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="tarjeta-info">
        <h3>{producto.nombre}</h3>
        <p className="tarjeta-precio">${producto.precio.toLocaleString('es-CO')}</p>
      </div>
    </Link>
  )
}
