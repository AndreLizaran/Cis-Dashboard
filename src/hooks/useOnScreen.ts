// Modules
import { useEffect, useRef, useState } from 'react'

export default function useOnScreen(ref:any) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current)
    return () => { observer.disconnect() }
  }, []);

  return isIntersecting
}