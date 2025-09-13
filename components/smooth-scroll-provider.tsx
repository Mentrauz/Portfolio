"use client"

import type React from "react"
import { useEffect } from "react"
import Lenis from "lenis"

type SmoothScrollProviderProps = {
  children: React.ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const originalScrollBehavior = document.documentElement.style.scrollBehavior
    // Prevent double smoothing with CSS scroll-behavior
    document.documentElement.style.scrollBehavior = "auto"

    const lenis = new Lenis({
      // Larger duration and lower wheel multiplier slow down the scroll
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
    } as any)

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.documentElement.style.scrollBehavior = originalScrollBehavior
    }
  }, [])

  return <>{children}</>
}


