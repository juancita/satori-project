import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const cerrar = () => setAbierto(false)

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/inicio" className="navbar-logo" onClick={cerrar}>
          <img src="/logo-inicio.png" alt="Satori" />
        </Link>

        <button
          className={'navbar-toggle' + (abierto ? ' is-abierto' : '')}
          onClick={() => setAbierto((a) => !a)}
          aria-label="Menú"
          aria-expanded={abierto}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={'navbar-menu' + (abierto ? ' is-abierto' : '')}>
          <li><Link to="/inicio" onClick={cerrar}>Inicio</Link></li>
          <li><Link to="/taller" onClick={cerrar}>El Taller</Link></li>
          <li><Link to="/piezas" onClick={cerrar}>Piezas</Link></li>
          <li><a href="/inicio#contacto" onClick={cerrar}>Contacto</a></li>
        </ul>
      </div>
    </nav>
  )
}
