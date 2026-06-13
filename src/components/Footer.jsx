import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo-wrap">
        <img src="/logo-en-blanco.png" alt="Satori" className="footer-logo" />
      </div>

      <nav className="footer-nav">
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <a href="/#contacto">Contacto</a>
      </nav>

      <p className="footer-copy">© {new Date().getFullYear()} Satori. Todos los derechos reservados.</p>
    </footer>
  )
}
