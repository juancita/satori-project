import { Link } from 'react-router-dom'
import './TarjetaProducto.css'

export default function TarjetaProducto({ producto }) {
  return (
    <div className="tarjeta-producto">
      <div className="producto-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="producto-info">
        <h3>{producto.nombre}</h3>
        <p className="producto-descripcion">{producto.descripcion}</p>
        <p className="producto-precio">${producto.precio}</p>
        <Link to={`/producto/${producto.id}`} className="ver-detalles">
          Ver Detalles
        </Link>
      </div>
    </div>
  )
}
