import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ResponsiveHeader from "@/components/responsive-header"
import ClientDiagnosticWrapper from "@/components/client-diagnostic-wrapper"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Ensure text remains visible during font loading
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://soumyasingh.site'),
  title: "Soumya Singh | AI Enthusiast & Web Developer",
  description:
    "Portfolio of Soumya Singh, AI and DevOps Enthusiast and Specializing NextJS Web Development.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://soumyasingh.site',
    siteName: 'Soumya Singh Portfolio',
    title: 'Soumya Singh | AI Enthusiast & Web Developer',
    description: 'Portfolio of Soumya Singh — AI and DevOps Enthusiast specializing in NextJS Web Development.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Soumya Singh Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soumya Singh | AI Enthusiast & Web Developer',
    description: 'Portfolio of Soumya Singh — AI and DevOps Enthusiast specializing in NextJS Web Development.',
    creator: '@mentrauz',
    images: ['/android-chrome-512x512.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} theme-transition`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider>
            <ResponsiveHeader />
            {children}
            <Toaster />
            <ClientDiagnosticWrapper />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}