import { useRef, useEffect } from 'react'

/**
 * EstrellasWarp — fondo tipo "hiperespacio": destellos que salen del centro
 * hacia los bordes simulando viajar a la velocidad de la luz.
 * Como el fondo del lobby es claro, los destellos se dibujan en gris/negro.
 *
 * Prop `acelerar`: al activarse, la velocidad sube (se usa en la transición
 * de salida del lobby para reforzar la sensación de "entrar" a hiperespacio).
 */
export default function EstrellasWarp({ acelerar = false }) {
  const canvasRef = useRef(null)
  const objetivoVel = useRef(0.6) // velocidad objetivo (crucero / acelerado)

  // La velocidad objetivo cambia según la prop sin reiniciar la animación.
  useEffect(() => {
    objetivoVel.current = acelerar ? 9 : 0.6
  }, [acelerar])

  useEffect(() => {
    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let ancho, alto, cx, cy
    let velActual = 0.6
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
      // Easing suave de la velocidad hacia el objetivo (crucero ↔ acelerado).
      velActual += (objetivoVel.current - velActual) * 0.06

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

        const cercania = 1 - s.z / ancho // 0 lejos · 1 cerca
        const alpha = Math.min(0.55, cercania * 0.6)
        const grosor = Math.max(0.4, cercania * 2.6)

        ctx.strokeStyle = `rgba(15, 15, 15, ${alpha})`
        ctx.lineWidth = grosor
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      animId = requestAnimationFrame(dibujar)
    }

    if (reducir) {
      // Sin animación: un campo estático y sutil de puntos.
      ctx.clearRect(0, 0, ancho, alto)
      for (const s of estrellas) {
        const sx = cx + (s.x / s.z) * ancho
        const sy = cy + (s.y / s.z) * ancho
        ctx.fillStyle = 'rgba(15, 15, 15, 0.25)'
        ctx.fillRect(sx, sy, 1.5, 1.5)
      }
    } else {
      dibujar()
    }

    window.addEventListener('resize', dimensionar)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', dimensionar)
    }
  }, [])

  return <canvas ref={canvasRef} className="lobby-estrellas" aria-hidden="true" />
}
