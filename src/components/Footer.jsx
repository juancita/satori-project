import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo-wrap">
        <img src="/logo-inicio.png" alt="Satori" className="footer-logo" />
      </div>

      <nav className="footer-nav">
        <Link to="/inicio">Inicio</Link>
        <Link to="/taller">El Taller</Link>
        <a href="/inicio#contacto">Contacto</a>
      </nav>

      <p className="footer-copy">© {new Date().getFullYear()} Satori. Todos los derechos reservados.</p>
    </footer>
  )
}
