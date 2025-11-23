"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Github, Linkedin, Mail, Twitter, Send, ArrowUp, MapPin, Phone, Calendar, CheckCircle } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { ThemePreview } from "@/components/theme-preview"
import { Tooltip } from "@/components/ui/animated-tooltip"
import Image from "next/image"

// Form validation schema
const subscribeSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function EnhancedFooter() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="contact"
      className="relative bg-muted/30 backdrop-blur-sm border-t border-border/30 pt-16 pb-8 shadow-lg"
    >
      <div className="container mx-auto px-4 py-12">
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

              <div className="flex gap-3">
                <SocialButton
                  icon={<Github className="h-5 w-5" />}
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
                      />
                    </div>
                  }
                />
                <SocialButton
                  icon={<Linkedin className="h-5 w-5" />}
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
                      />
                    </div>
                  }
                />
                <SocialButton
                  icon={<Twitter className="h-5 w-5" />}
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
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="font-medium">11soumyasingh2@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-medium">+91 9641564644</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium">Bengaluru, India</span>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <Calendar className="h-4 w-4 text-primary" />
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
                        <div className="flex gap-2">
                          <FormControl>
                            <Input placeholder="Your email" {...field} className="bg-background/50 border-border/50 text-foreground placeholder:text-foreground/60" />
                          </FormControl>
                          <Button type="submit" size="icon" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
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
  return (
    <li>
      <a
        href={href}
        className="text-foreground/80 hover:text-primary transition-colors duration-200 inline-block font-medium hover:underline"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
        }}
      >
        {label}
      </a>
    </li>
  )
}
