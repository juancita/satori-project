import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import EstrellasWarp from '../components/EstrellasWarp'
import './Lobby.css'

// Opciones del menú arcade. Contacto no tiene página propia: lleva al final
// de la página principal, donde está el botón de WhatsApp (scrollContacto).
const OPCIONES = [
  { label: 'Página Principal', to: '/inicio' },
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Contacto', to: '/inicio', scrollContacto: true },
]

const DURACION_SALIDA = 700 // ms — debe coincidir con la transición CSS

export default function Lobby() {
  const navigate = useNavigate()
  const [seleccion, setSeleccion] = useState(0)
  const [saliendo, setSaliendo] = useState(false)

  const ir = useCallback(
    (opcion) => {
      if (saliendo) return // evita dobles clics durante la transición
      setSaliendo(true)
      setTimeout(() => {
        // `fromLobby` activa la animación de entrada (warp) en la página destino.
        navigate(opcion.to, {
          state: { fromLobby: true, scrollContacto: !!opcion.scrollContacto },
        })
      }, DURACION_SALIDA)
    },
    [navigate, saliendo]
  )

  // Navegación tipo arcade: flechas para moverse, Enter/Espacio para entrar.
  useEffect(() => {
    const onKey = (e) => {
      if (saliendo) return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        setSeleccion((s) => (s + 1) % OPCIONES.length)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        setSeleccion((s) => (s - 1 + OPCIONES.length) % OPCIONES.length)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        ir(OPCIONES[seleccion])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [seleccion, ir, saliendo])

  return (
    <div className={'lobby' + (saliendo ? ' is-saliendo' : '')}>
      <EstrellasWarp acelerar={saliendo} />
      <div className="lobby-scanlines" aria-hidden="true" />

      <div className="lobby-inner">
        <div className="lobby-logo-wrap">
          <img
            src="/logo-inicio.png"
            alt="Satori"
            className="lobby-logo"
          />
        </div>

        <p className="lobby-insert">Insert Coin · Press Start</p>

        <nav className="lobby-menu" aria-label="Menú de inicio">
          {OPCIONES.map((opcion, i) => (
            <button
              key={opcion.label}
              className={'lobby-opcion' + (i === seleccion ? ' is-activa' : '')}
              onClick={() => ir(opcion)}
              onMouseEnter={() => setSeleccion(i)}
            >
              <span className="lobby-cursor" aria-hidden="true">►</span>
              {opcion.label}
            </button>
          ))}
        </nav>

        <p className="lobby-hint">Usa ↑ ↓ y Enter — o haz clic</p>
      </div>
    </div>
  )
}
