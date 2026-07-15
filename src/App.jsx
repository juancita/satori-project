import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Lobby from './pages/Lobby'
import Inicio from './pages/Inicio'
import Taller from './pages/Taller'
import Piezas from './pages/Piezas'
import Opinar from './pages/Opinar'
import Catalogo from './pages/Catalogo'
import DetalleProducto from './pages/DetalleProducto'

function Layout() {
  const { pathname } = useLocation()
  // El lobby es una pantalla de inicio inmersiva (estilo videojuego):
  // se muestra a pantalla completa, sin la navegación general.
  const esLobby = pathname === '/'

  return (
    <>
      {!esLobby && <Navbar />}
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/taller" element={<Taller />} />
        <Route path="/piezas" element={<Piezas />} />
        <Route path="/opinar" element={<Opinar />} />
        {/* Catálogo oculto por ahora del menú, pero la ruta sigue activa */}
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
      {!esLobby && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
