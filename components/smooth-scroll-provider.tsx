"use client"

import type React from "react"
import { ReactLenis, useLenis as useOriginalLenis } from "lenis/react"
import type Lenis from "lenis"
import "lenis/dist/lenis.css"

export function useLenis(): Lenis | null | undefined {
  return useOriginalLenis() as Lenis | null | undefined
}

type SmoothScrollProviderProps = {
  children: React.ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Use the official React wrapper from Lenis which handles React 18 Strict Mode,
  // resize observers, and RAF loops automatically and correctly.
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        smoothWheel: true,
        syncTouch: false,
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
        wheelMultiplier: 1.1,
        touchMultiplier: 2,
        autoRaf: true,
        prevent: (node: HTMLElement) => {
          return (
            node.classList.contains("lenis-prevent") ||
            node.closest("[data-radix-scroll-area-viewport]") !== null ||
            node.closest("[data-lenis-prevent]") !== null
          )
        },
      }}
    >
      {children}
    </ReactLenis>
  )
}
