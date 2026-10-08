"use client"

import dynamic from "next/dynamic"

// Dynamically import the diagnostic tool with no SSR
const DiagnosticTool = dynamic(() => import("@/components/diagnostic-tool").then((mod) => mod.DiagnosticTool), {
  ssr: false,
})

export default function ClientDiagnosticWrapper() {
  // Only show diagnostic tool in development
  if (process.env.NODE_ENV !== "development") return null
  return <DiagnosticTool />
}

