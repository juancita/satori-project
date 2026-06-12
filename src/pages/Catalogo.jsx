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
        <h1>Catálogo de Productos</h1>

        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-busqueda"
          />
        </div>

        <div className="grid-productos">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map(producto => (
              <TarjetaProducto key={producto.id} producto={producto} />
            ))
          ) : (
            <p className="sin-resultados">No se encontraron productos</p>
          )}
        </div>
      </div>
    </div>
  )
}
