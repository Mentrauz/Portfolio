"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { GitBranch, Mail, Send, ArrowUp, MapPin, Phone, Calendar, CheckCircle } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { ThemePreview } from "@/components/theme-preview"
import { Tooltip } from "@/components/ui/animated-tooltip"
import Image from "next/image"
import { useLenis } from "@/components/smooth-scroll-provider"

// Form validation schema
const subscribeSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function EnhancedFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const lenis = useLenis()

  // Initialize form
  const form = useForm<z.infer<typeof subscribeSchema>>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof subscribeSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      form.reset()

      toast({
        title: "Subscribed!",
        description: "You've been added to the newsletter.",
        action: (
          <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        ),
      })
    }, 1000)
  }

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { lerp: 0.05 })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="relative bg-muted/30 backdrop-blur-sm border-t border-border/30 pt-12 sm:pt-16 pb-8 shadow-lg"
    >
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="font-bold text-xl mb-4 text-foreground">Soumya Singh</div>
              <p className="text-foreground/80 mb-6 font-medium">
                AI & ML Enthusiast specializing in NextJs based Web development.
              </p>

              <div className="flex flex-wrap gap-3">
                <SocialButton
                  icon={<GitBranch className="h-5 w-5" />}
                  url="https://github.com/Mentrauz"
                  label="GitHub"
                  tooltipContent={
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
                  }
                />
                <SocialButton
                  icon={
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                  url="https://www.linkedin.com/in/mentrauz-soumyasingh/"
                  label="LinkedIn"
                  tooltipContent={
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
                  }
                />
                <SocialButton
                  icon={
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  }
                  url="https://twitter.com/mentrauz"
                  label="Twitter"
                  tooltipContent={
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
                  }
                />
                <SocialButton
                  icon={<Mail className="h-5 w-5" />}
                  url="mailto:11soumyasingh2@gmail.com"
                  label="Email"
                />
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                <FooterLink href="#" label="Home" />
                <FooterLink href="#skills" label="Skills" />
                <FooterLink href="#experience" label="Experience" />
                <FooterLink href="#projects" label="Projects" />
                <FooterLink href="#education" label="Education" />
                <FooterLink href="#contact" label="Contact" />
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold mb-4 text-foreground">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground/80">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span className="min-w-0 break-all font-medium">11soumyasingh2@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-medium">+91 9641564644</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-medium">Bengaluru, India</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <Calendar className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-medium">Available for projects</span>
                </li>
              </ul>

              {/* Add Theme Preview */}
              <div className="mt-6">
                <ThemePreview />
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-semibold mb-4 text-foreground">Newsletter</h3>
              <p className="text-foreground/80 mb-4 font-medium">Subscribe to receive updates on new projects and articles.</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <FormControl>
                            <Input placeholder="Your email" {...field} className="bg-background/50 border-border/50 text-foreground placeholder:text-foreground/60" />
                          </FormControl>
                          <Button type="submit" size="icon" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md sm:w-10">
                            {isSubmitting ? (
                              <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <p className="text-xs text-foreground/70 mt-2 font-medium">I respect your privacy. Unsubscribe at any time.</p>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-foreground/80 mb-4 md:mb-0 font-medium">
            Developed by Soumya Singh. All rights reversed.
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border/50 bg-background/50 hover:bg-background/70 text-foreground shadow-md hover:shadow-lg transition-all duration-200"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface SocialButtonProps {
  icon: React.ReactNode
  url: string
  label: string
  tooltipContent?: React.ReactNode
}

function SocialButton({ icon, url, label, tooltipContent }: SocialButtonProps) {
  const button = (
    <Button
      variant="outline"
      size="icon"
      asChild
      className="rounded-full border-border/50 bg-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary/50 text-foreground shadow-md hover:shadow-lg transition-all duration-300"
    >
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
        {icon}
      </a>
    </Button>
  )

  if (tooltipContent) {
    return (
      <Tooltip content={tooltipContent}>
        {button}
      </Tooltip>
    )
  }

  return button
}

interface FooterLinkProps {
  href: string
  label: string
}

function FooterLink({ href, label }: FooterLinkProps) {
  const lenis = useLenis()

  return (
    <li>
      <a
        href={href}
        className="text-foreground/80 hover:text-primary transition-colors duration-200 inline-block font-medium hover:underline"
        onClick={(e) => {
          e.preventDefault()
          if (href === "#") {
            if (lenis) {
              lenis.scrollTo(0, { lerp: 0.05 })
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          } else {
            const target = document.querySelector(href)
            if (target) {
              if (lenis) {
                lenis.scrollTo(target as HTMLElement, { offset: 0, lerp: 0.05 })
              } else {
                target.scrollIntoView({ behavior: "smooth" })
              }
            }
          }
        }}
      >
        {label}
      </a>
    </li>
  )
}
