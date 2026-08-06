"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CustomGradientBackground } from "@/components/custom-gradient-background"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Tooltip } from "@/components/ui/animated-tooltip"
import { GitBranch, Mail, ArrowDown, ExternalLink } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useIsClient } from "@/hooks/use-is-client"
import { useLenis } from "@/components/smooth-scroll-provider"

export default function RedesignedHero() {
  const { toast } = useToast()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const isClient = useIsClient()
  const lenis = useLenis()

  // Safe scroll progress - only run on client
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
    })
  }

  const handleContactClick = () => {
    // Show the toast with contact info
    toast({
      title: "Contact Info",
      description: "Email: 11soumyasingh2@gmail.com | Phone: +91 9641564644",
      duration: 5000,
    })

    // Scroll to the footer/contact section
    const contactEl = document.getElementById("contact")
    if (contactEl) {
      if (lenis) {
        lenis.scrollTo(contactEl, { offset: 0, lerp: 0.05 })
      } else {
        contactEl.scrollIntoView({ behavior: "smooth" })
      }
    }
  }


  const scrollToProjects = () => {
    const projectsEl = document.getElementById("projects")
    if (projectsEl) {
      if (lenis) {
        lenis.scrollTo(projectsEl, { offset: 0, lerp: 0.05 })
      } else {
        projectsEl.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  // Typing effect for the subtitle
  const [displayedText, setDisplayedText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const fullText = "Web Developer, Learning ML and DevOps."

  useEffect(() => {
    if (!isClient) return

    // Explicitly reset everything
    setDisplayedText("")
    setTypingComplete(false)

    // Use a timeout to ensure DOM is ready
    const timeout = setTimeout(() => {
      let text = ""
      let index = 0

      const typingInterval = setInterval(() => {
        if (index < fullText.length) {
          text += fullText.charAt(index)
          setDisplayedText(text)
          index++
        } else {
          clearInterval(typingInterval)
          setTypingComplete(true)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }, 100)

    return () => clearTimeout(timeout)
  }, [fullText, isClient])

  // Function to highlight specific terms in the text
  const highlightText = (text: string) => {
    const termsToHighlight = ["Web", "ML", "DevOps"]
    let highlightedText = text

    termsToHighlight.forEach((term) => {
      // Modified regex to better handle word boundaries
      const regex = new RegExp(`\\b(${term})\\b`, "gi")
      highlightedText = highlightedText.replace(regex, (match) => {
        return `<span class="text-primary font-semibold">${match}</span>`
      })
    })

    return highlightedText
  }

  return (
    <CustomGradientBackground className="min-h-screen flex items-center">
      <motion.div
        ref={containerRef}
        style={isClient ? { opacity, scale, y } : {}}
        className="relative container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left column - Text content */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <ScrollReveal>
            <Badge className="mb-4 px-3 py-1.5 text-sm bg-primary/20 border-primary/30 text-primary">
              Web Developer
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
              <span className="text-gradient-primary">
                Soumya Singh
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 leading-relaxed">
              {isClient && (typingComplete || displayedText.length === fullText.length) ? (
                <span dangerouslySetInnerHTML={{ __html: highlightText(displayedText) }} />
              ) : (
                <>
                  {displayedText}
                  {isClient && <span className="animate-pulse">|</span>}
                </>
              )}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6 md:mb-8">
              <Badge
                variant="outline"
                className="px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm border-estragon/30 hover:bg-estragon/10 transition-colors"
              >
                Machine Learning
              </Badge>
              <Badge
                variant="outline"
                className="px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm border-estragon/30 hover:bg-estragon/10 transition-colors"
              >
                NextJs
              </Badge>
              <Badge
                variant="outline"
                className="px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-colors"
              >
                DevOps
              </Badge>
              <Badge
                variant="outline"
                className="px-2 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm border-white/20 hover:bg-white/10 transition-colors"
              >
                STEM
              </Badge>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6 md:mb-8">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group relative overflow-hidden shadow-lg transition-all duration-300 bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-[hsl(var(--primary-foreground))]"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={handleContactClick}
                className="group relative overflow-hidden border-[hsl(var(--primary))]/50 hover:border-[hsl(var(--primary))] transition-colors duration-300"
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex gap-4 justify-center md:justify-start">
              <Tooltip content={
                <div className="w-[600px] h-auto">
                  <Image
                    src="/github.png"
                    alt="GitHub Profile"
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full h-auto"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              }>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full border-border/50 bg-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/50 text-foreground shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <a
                    href="https://github.com/Mentrauz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <GitBranch className="h-5 w-5" />
                  </a>
                </Button>
              </Tooltip>

              <Tooltip content={
                <div className="w-[400px] h-auto">
                  <Image
                    src="/twitter.png"
                    alt="Twitter Profile"
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full h-auto"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              }>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full border-border/50 bg-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/50 text-foreground shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <a
                    href="https://twitter.com/mentrauz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </Button>
              </Tooltip>

              <Tooltip content={
                <div className="w-[500px] h-auto">
                  <Image
                    src="/linkedin.png"
                    alt="LinkedIn Profile"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-auto"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              }>
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full border-border/50 bg-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/50 text-foreground shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <a
                    href="https://www.linkedin.com/in/mentrauz-soumyasingh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </Button>
              </Tooltip>
            </div>
          </ScrollReveal>
        </div>

        {/* Right column - Image */}
        <div className="order-1 md:order-2 flex justify-center mb-6 md:mb-0">
          <ScrollReveal direction="left">
            <motion.div
              className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
              animate={
                isClient && isHovered
                  ? {
                    x: mousePosition.x * -0.5,
                    y: mousePosition.y * -0.5,
                  }
                  : {}
              }
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/cat.jpg"
                alt="Soumya Singh"
                fill
                className="object-cover"
                priority
              />

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500/30 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500/30 rounded-full blur-xl" />

              {/* Add a subtle pulsing glow effect */}
              {isClient && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        {isClient && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-colors"
                onClick={() => {
                  const aboutEl = document.getElementById("about")
                  if (aboutEl) {
                    if (lenis) {
                      lenis.scrollTo(aboutEl, { offset: 0, lerp: 0.05 })
                    } else {
                      aboutEl.scrollIntoView({ behavior: "smooth" })
                    }
                  }
                }}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </CustomGradientBackground>
  )
}

