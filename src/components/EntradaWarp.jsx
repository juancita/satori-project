import { useRef, useEffect, useState } from 'react'
import './EntradaWarp.css'

/**
 * EntradaWarp — overlay de entrada a las páginas destino tras salir del lobby.
 * Es el reverso de la salida del lobby: estrellas BLANCAS sobre fondo NEGRO
 * (colores invertidos) que llegan a alta velocidad, se desaceleran y luego
 * el overlay se desvanece dejando la pantalla negra normal de la página.
 *
 * Llama a `onDone` cuando termina para desmontarse desde el padre.
 */
const TIEMPO_DESACELERANDO = 1300 // ms de warp antes de empezar a desvanecer

export default function EntradaWarp({ onDone }) {
  const canvasRef = useRef(null)
  const [oculto, setOculto] = useState(false) // dispara el fade-out (CSS)

  useEffect(() => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducir) {
      onDone?.()
      return
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let ancho, alto, cx, cy
    let velActual = 16 // arranca rápido (recién salimos a hiperespacio)
    let animId
    const NUM = 360
    const estrellas = []

    const dimensionar = () => {
      ancho = canvas.width = canvas.offsetWidth
      alto = canvas.height = canvas.offsetHeight
      cx = ancho / 2
      cy = alto / 2
    }

    const nueva = (s) => {
      s.x = (Math.random() - 0.5) * ancho
      s.y = (Math.random() - 0.5) * alto
      s.z = Math.random() * ancho
      s.pz = s.z
    }

    dimensionar()
    for (let i = 0; i < NUM; i++) {
      const s = {}
      nueva(s)
      estrellas.push(s)
    }

    const dibujar = () => {
      // Desaceleración suave hacia velocidad de crucero.
      velActual += (0.4 - velActual) * 0.03

      ctx.clearRect(0, 0, ancho, alto)

      for (const s of estrellas) {
        s.pz = s.z
        s.z -= velActual * (ancho / 100)
        if (s.z < 1) {
          nueva(s)
          s.z = ancho
          s.pz = s.z
        }

        const sx = cx + (s.x / s.z) * ancho
        const sy = cy + (s.y / s.z) * ancho
        const px = cx + (s.x / s.pz) * ancho
        const py = cy + (s.y / s.pz) * ancho

        const cercania = 1 - s.z / ancho
        const alpha = Math.min(0.85, cercania)
        const grosor = Math.max(0.4, cercania * 2.6)

        ctx.strokeStyle = `rgba(245, 245, 245, ${alpha})`
        ctx.lineWidth = grosor
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      animId = requestAnimationFrame(dibujar)
    }

    dibujar()

    // Tras desacelerar, desvanecer el overlay para revelar la página negra.
    const t = setTimeout(() => setOculto(true), TIEMPO_DESACELERANDO)

    window.addEventListener('resize', dimensionar)
    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(t)
      window.removeEventListener('resize', dimensionar)
    }
  }, [onDone])

  return (
    <div
      className={'entrada-warp' + (oculto ? ' is-oculto' : '')}
      aria-hidden="true"
      onTransitionEnd={() => onDone?.()}
    >
      <canvas ref={canvasRef} className="entrada-warp-canvas" />
    </div>
  )
}
