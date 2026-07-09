import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react'
import './ParallaxFloating.css'

// Sigue la posición del mouse/touch relativa al contenedor.
function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left - rect.width / 2, y: y - rect.top - rect.height / 2 }
      } else {
        positionRef.current = { x, y }
      }
    }
    const onMouse = (e) => updatePosition(e.clientX, e.clientY)
    const onTouch = (e) => {
      const t = e.touches[0]
      if (t) updatePosition(t.clientX, t.clientY)
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch)
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [containerRef])

  return positionRef
}

const FloatingContext = createContext(null)

export default function Floating({ children, className = '', sensitivity = 1, easingFactor = 0.05 }) {
  const containerRef = useRef(null)
  const elementsMap = useRef(new Map())
  const mousePositionRef = useMousePositionRef(containerRef)

  const registerElement = useCallback((id, element, depth) => {
    elementsMap.current.set(id, { element, depth, currentPosition: { x: 0, y: 0 } })
  }, [])

  const unregisterElement = useCallback((id) => {
    elementsMap.current.delete(id)
  }, [])

  useEffect(() => {
    let frame
    const loop = () => {
      elementsMap.current.forEach((data) => {
        const strength = (data.depth * sensitivity) / 20
        const targetX = mousePositionRef.current.x * strength
        const targetY = mousePositionRef.current.y * strength
        data.currentPosition.x += (targetX - data.currentPosition.x) * easingFactor
        data.currentPosition.y += (targetY - data.currentPosition.y) * easingFactor
        data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
      })
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [sensitivity, easingFactor, mousePositionRef])

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div ref={containerRef} className={`floating ${className}`}>
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

export function FloatingElement({ children, className = '', depth = 1 }) {
  const elementRef = useRef(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    const id = idRef.current
    context.registerElement(id, elementRef.current, depth ?? 0.01)
    return () => context.unregisterElement(id)
  }, [depth, context])

  return (
    <div ref={elementRef} className={`floating-element ${className}`}>
      {children}
    </div>
  )
}
