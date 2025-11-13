"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { rafThrottle } from "@/lib/throttle"

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  // Smooth out the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      // Only show after scrolling a bit
      setIsVisible(window.scrollY > 100)
    }

    // Throttle using RAF for smooth 60fps updates
    const throttledHandleScroll = rafThrottle(handleScroll)

    // Use passive event listener for better scroll performance
    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    
    // Initial check
    handleScroll()
    
    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [])

  if (!isVisible) return null

  return <motion.div className="progress-bar fixed top-0 left-0 right-0 h-[3px] bg-primary z-50" style={{ scaleX }} />
}

