import { useState } from 'react'
import TarjetaProducto from '../components/TarjetaProducto'
import productos from '../data/productos.json'
import './Catalogo.css'

export default function Catalogo() {
  const [filtro, setFiltro] = useState('')

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.descripcion.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="pagina-catalogo">
      <div className="container">
        <div className="catalogo-header">
          <h1>Colección</h1>
          <p>{productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto' : 'productos'}</p>
        </div>
        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            className="input-busqueda"
          />
        </div>
      </div>

      <div className="grid-productos container">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map(producto => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))
        ) : (
          <p className="sin-resultados">Sin resultados</p>
        )}
      </div>
    </div>
  )
}
