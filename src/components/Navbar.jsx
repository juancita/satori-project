import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/inicio" className="navbar-logo">
          <img src="/logo-inicio.png" alt="Satori" />
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/inicio">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><a href="/inicio#contacto">Contacto</a></li>
        </ul>
      </div>
    </nav>
  )
}
