"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  ExternalLink,
  Github,
  Calendar,
  Users,
  Star,
  Loader2,
  ChevronRight as ChevronIcon,
} from "lucide-react"

// Project data
const projects = [
  {
    id: 1,
    title: "Daily Pulse",
    category: "web",
    description:
      "A news website built with Next.js, Tailwind CSS, and Shadcn UI",
    longDescription:
      "No more fake news, only verified news from best and trusted sources, with a user friendly interface and a lot of features to make it more engaging and informative.",
    technologies: ["NextJs", "Tailwind", "NodeJs, Typescript, ShadcnUI, Gemini"],
    imageUrl: "/dailypulse.png",
    demoUrl: "https://news-theta-sepia.vercel.app/",
    // githubUrl: "Coming Soon",
    featured: true,
    completed: "2025",
    teamSize: 1,
    difficulty: 1,
    achievements: [
      "Architected a cutting-edge news verification platform that programmatically scrapes, cross-validates, and filters real-time headlines from a consortium of reputed global media outlets, reducing the risk of false news by upto 70%",
      "Leveraged Gemini AI to algorithmically invalidate misinformation, ensuring semantic coherence, factual consistency of upto 97%, and source redundancy before publication",
      "Achieved a false-positive reduction rate of over 90% using an ensemble-based AI verification pipeline combined with contextual news analysis",
      "Formulated for scalability and latency minimization, the system asynchronously scrapes news with fault-tolerant architecture using modern concurrency paradigms, also improving speed upto 1.5x",
    ],
  },
  {
    id: 2,
    title: "Frontend Demo",
    category: "web",
    description: "A frontend demo",
    longDescription:
      "A frontend demo showcasing the power of React, Next.js, and Tailwind CSS",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
    imageUrl: "/uix.png",
    demoUrl: "https://simple-frontend-liart.vercel.app/",
    githubUrl: "#",
    featured: false,
    completed: "2024",
    teamSize: 1,
    difficulty: 1,
    achievements: [
      "Implemented the full DALL-E 2 architecture with PyTorch",
      "Optimized for CUDA acceleration with 40% performance improvement",
      "Created Docker containers for easy deployment",
      "Built a web interface for text-to-image generation",
    ],
  },
  {
      id: 3,
      title: "Website Development",
      category: "web",
      description: "Designed the website for Chowdeshwari Catering",
      longDescription:
        "User friendly and professional design that perfectly meets clent's and user's expectations",
      technologies: ["NextJs", "Tailwind", "NodeJs"],
      imageUrl: "/urbaneats.png",
      demoUrl: "https://urban-eats-catering.vercel.app/",
      githubUrl: "https://github.com/Mentrauz/urban-eats-catering",
      color: "from-green-600 to-teal-600",
      featured: false,
      completed: "2024",
      teamSize: 1,
      difficulty: 2,
      achievements: [
        "User Friendly UI",
        "Smooth and consistent Experience throughout the website",
        "Easy display of all the information",
      ],
    },
    {
      id: 4,
      title: "Pokemon Game",
      category: "web",
      description: "Guess the pokemon game based on HTML",
      longDescription:
        "A simple and clean UI for a pokemon game",
      technologies: ["HTML"],
      imageUrl: "/urbaneats.png",
      demoUrl: "https://poke-game-ivory.vercel.app/",
      githubUrl: "https://github.com/Mentrauz/Poke-game",
      color: "from-green-600 to-teal-600",
      featured: false,
      completed: "2024",
      teamSize: 1,
      difficulty: 2,
      achievements: [
        "Simple and clean UI",
        "Pokemon Game",
      ],
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      category: "web",
      description: "Analytics Dashboard for Admybrand (Internship Test Project)",
      longDescription:
        "Professional and clean UI for a analytics dashboard, with hearbeat to mimick backend updates on realtime",
      technologies: ["NextJs", "Tailwind"],
      imageUrl: "/admybrand.png",
      demoUrl: "https://admybrand-ai-dashboard.vercel.app/",
      githubUrl: "https://github.com/Mentrauz/admybrand-ai-dashboard",
      color: "from-green-600 to-teal-600",
      featured: false,
      completed: "2024",
      teamSize: 1,
      difficulty: 2,
      achievements: [
        "Simple and clean UI",
        "AI Dashboa",
      ],
    },
    {
      id: 6,
      title: "Gaming News",
      category: "web",
      description:
        "A news website built with Next.js, Tailwind CSS, and Shadcn UI, for gaming news",
      longDescription:
        "A news website built with Next.js, Tailwind CSS, and Shadcn UI, for gaming news",
      technologies: ["NextJs", "Tailwind", "NodeJs, Typescript, ShadcnUI, Gemini"],
      imageUrl: "/gamingnews.png",
      demoUrl: "https://gaming-news-sooty.vercel.app/",
      githubUrl: "https://github.com/Mentrauz/Gaming-News",
      featured: true,
      completed: "2025",
      teamSize: 1,
      difficulty: 1,
      achievements: [
        "Built on NextJs and Tailwind CSS, it showcases dystopian style design language",
        "Leveraged Gemini AI to algorithmically invalidate misinformation, ensuring semantic coherence, factual consistency of upto 97%, and source redundancy before publication",
        "Achieved a false-positive reduction rate of over 90% using an ensemble-based AI verification pipeline combined with contextual news analysis",
        "Formulated for scalability and latency minimization, the system asynchronously scrapes news with fault-tolerant architecture using modern concurrency paradigms, also improving speed upto 1.5x",
      ],
    },
  // {
  //   id: 3,
  //   title: "Website Development",
  //   category: "web",
  //   description: "Designed the website for Chowdeshwari Catering",
  //   longDescription:
  //     "User friendly and professional design that perfectly meets clent's and user's expectations",
  //   technologies: ["NextJs", "Tailwind", "NodeJs"],
  //   imageUrl: "/urbaneats.png",
  //   demoUrl: "https://urban-eats-catering.vercel.app/",
  //   githubUrl: "https://github.com/Mentrauz/urban-eats-catering",
  //   color: "from-green-600 to-teal-600",
  //   featured: false,
  //   completed: "2024",
  //   teamSize: 1,
  //   difficulty: 2,
  //   achievements: [
  //     "User Friendly UI",
  //     "Smooth and consistent Experience throughout the website",
  //     "Easy display of all the information",
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "Payroll System",
  //   category: "web",
  //   description: "Web application for managing Payroll",
  //   longDescription:
  //     "A full-stack web application that streamlines the process of generating payroll for employees and also provides a dashboard for HR to manage employees edit and maintain data and also to make it easier for the company to manage large database",
  //   technologies: ["Next.js", "MongoDB", "TypeScript", "NextAuth"],
  //   imageUrl: "/tms.png",
  //   demoUrl: "https://tmsgroups.in/",
  //   // githubUrl: "https://tmsgroups.in/",
  //   color: "from-amber-600 to-orange-600",
  //   featured: false,
  //   completed: "2024",
  //   teamSize: 1,
  //   difficulty: 4,
  //   achievements: [
  //     "Built a full-stack application with Next.js and MongoDB",
  //     "Implemented secure authentication and authorization",
  //     "Self Hosted using Cloudflare Routing and Zeroday protection",
  //   ],
  // },
  // {
  //   id: 5,
  //   title: "Wikipedia Connection Finder",
  //   category: "network",
  //   description: "Tool for finding the shortest path between any two Wikipedia articles through hyperlinks.",
  //   longDescription:
  //     "An application that analyzes the network structure of Wikipedia to find the shortest path between any two articles. The tool uses graph theory algorithms to navigate through the complex web of hyperlinks.",
  //   technologies: ["Python", "NetworkX", "Flask", "MongoDB", "D3.js"],
  //   imageUrl: "/placeholder.svg?height=600&width=800",
  //   demoUrl: "#",
  //   githubUrl: "https://github.com/Mentrauz",
  //   color: "from-blue-600 to-cyan-600",
  //   featured: false,
  //   completed: "2022",
  //   teamSize: 1,
  //   difficulty: 3,
  //   achievements: [
  //     "Implemented graph algorithms to find shortest paths between Wikipedia articles",
  //     "Created a web interface with Flask and D3.js",
  //     "Optimized performance for large-scale graph traversal",
  //     "Built a caching system with MongoDB for faster results",
  //   ],
  // },
  // {
  //   id: 6,
  //   title: "NYC Education Analytics",
  //   category: "data",
  //   description: "Data analysis and visualization platform for NYC public school performance metrics.",
  //   longDescription:
  //     "A comprehensive data analysis platform that processes and visualizes performance metrics from NYC public schools. The system includes predictive models for identifying at-risk students and schools that need additional resources.",
  //   technologies: ["Python", "Pandas", "Scikit-learn", "Tableau", "R"],
  //   imageUrl: "/placeholder.svg?height=600&width=800",
  //   demoUrl: "#",
  //   githubUrl: "https://github.com/Mentrauz",
  //   color: "from-indigo-600 to-blue-600",
  //   featured: false,
  //   completed: "2022",
  //   teamSize: 4,
  //   difficulty: 4,
  //   achievements: [
  //     "Analyzed NYC public school data to identify performance patterns",
  //     "Built predictive models for student success with Scikit-learn",
  //     "Created interactive visualizations with Tableau",
  //     "Presented findings to education stakeholders",
  //   ],
  // },
]

export default function RedesignedProjects() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const isClient = useIsClient()

  const handleDemoClick = (url: string) => {
    if (!isClient) return
    toast({
      title: "Demo Link",
      description: "Opening demo in a new tab...",
      duration: 3000,
    })
    window.open(url, "_blank")
  }

  // Simulate loading delay
  useEffect(() => {
    if (isClient) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isClient])

  // If not client-side yet, show a loading state
  if (!isClient || isLoading) {
    return (
      <SectionContainer className="relative">
        <SectionHeader
          title="Project Portfolio"
          subtitle="Explore my portfolio of AI, machine learning, and software development projects."
        />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading projects...</span>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer id="projects" className="relative">
      {/* Background decorative elements - improved for light mode */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl -z-10" />

      <SectionHeader
        title="Project Portfolio"
        subtitle="Explore my portfolio of AI, machine learning, and software development projects. Each project demonstrates different skills and technologies."
        titleClassName="bg-clip-text text-transparent bg-gradient-to-r from-happy-hearts to-golden-nugget"
        subtitleClassName="text-foreground/80"
      />



      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <ErrorBoundary key={project.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onSelect={() => {
                      setSelectedProject(project)
                      setIsDialogOpen(true)
                    }}
                  />
                </motion.div>
              </ErrorBoundary>
            ))}
          </AnimatePresence>
        </div>
      </ScrollReveal>

      {/* Project details dialog - improved for light mode */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 w-[95vw] bg-background/95 backdrop-blur-sm border-border/50 shadow-xl">
          {selectedProject && (
            <div className="flex flex-col h-full">
              <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 border-b border-border/20">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2 bg-primary/15 text-primary border-primary/30 font-medium">
                      {selectedProject.category === "ai"
                        ? "AI & Machine Learning"
                        : selectedProject.category === "web"
                          ? "Web Development"
                          : selectedProject.category === "data"
                            ? "Data Science"
                            : selectedProject.category === "audio"
                              ? "Audio & Voice Tech"
                              : "Research"}
                    </Badge>
                    <DialogTitle className="text-xl sm:text-2xl text-foreground">{selectedProject.title}</DialogTitle>
                    <DialogDescription className="mt-2 text-sm text-foreground/80 font-medium">{selectedProject.description}</DialogDescription>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1 overflow-hidden">
                <div className="px-4 sm:px-6 border-b border-border/20">
                  <TabsList className="justify-start rounded-none bg-transparent h-10">
                    <TabsTrigger value="overview" className="text-sm text-foreground/80 data-[state=active]:text-foreground font-medium">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="details" className="text-sm text-foreground/80 data-[state=active]:text-foreground font-medium">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="text-sm text-foreground/80 data-[state=active]:text-foreground font-medium">
                      Gallery
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <TabsContent value="overview" className="mt-0 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold mb-3 text-foreground">Project Details</h4>
                        <p className="mb-6 text-sm sm:text-base text-foreground/80 font-medium">{selectedProject.longDescription}</p>

                        <h4 className="text-lg font-semibold mb-3 text-foreground">Key Achievements</h4>
                        <ul className="space-y-2 mb-6">
                          {selectedProject.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                <span className="text-xs text-primary font-bold">✓</span>
                              </div>
                              <span className="text-sm sm:text-base text-foreground/80 font-medium">{achievement}</span>
                            </li>
                          ))}
                        </ul>

                        <h4 className="text-lg font-semibold mb-3 text-foreground">Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-muted/80 text-foreground/90 border border-border/30 font-medium">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 mt-6">
                          {selectedProject.demoUrl && (
                            <Button
                              variant="default"
                              className="gap-2 shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                              onClick={() => handleDemoClick(selectedProject.demoUrl as string)}
                            >
                              <ExternalLink className="h-4 w-4" />
                              Live Demo
                            </Button>
                          )}
                          {(selectedProject as any).githubUrl && (
                            <Button variant="outline" className="gap-2 bg-background/70 border-border/50 text-foreground shadow-sm hover:shadow-md transition-all duration-200 font-medium" asChild>
                              <a href={(selectedProject as any).githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                GitHub
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
                        <h4 className="text-lg font-semibold mb-3 text-foreground">Project Info</h4>
                        <div className="space-y-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-foreground/70 font-medium">Completed</span>
                            <span className="text-foreground font-medium">{selectedProject.completed}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-foreground/70 font-medium">Team Size</span>
                            <span className="text-foreground font-medium">{selectedProject.teamSize} people</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-foreground/70 font-medium">Difficulty</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < selectedProject.difficulty ? "fill-yellow-500 text-yellow-500" : "text-foreground/30"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="details" className="mt-0">
                    <div className="relative aspect-video mb-6 rounded-lg overflow-hidden border border-border/20">
                      <Image
                        src={selectedProject.imageUrl || "/placeholder.svg"}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground">Project Description</h4>
                        <p className="text-sm sm:text-base text-foreground/80 font-medium">{selectedProject.longDescription}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground">Implementation Details</h4>
                        <p className="text-sm sm:text-base text-foreground/80 font-medium">
                          This project was implemented using {selectedProject.technologies.join(", ")}. The development
                          process involved careful planning, iterative development, and rigorous testing to ensure
                          high-quality results.
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground">Challenges & Solutions</h4>
                        <p className="text-sm sm:text-base text-foreground/80 font-medium">
                          During development, we encountered several challenges including performance optimization,
                          scalability concerns, and integration complexities. These were addressed through innovative
                          approaches and best practices in software engineering.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="gallery" className="mt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="overflow-hidden rounded-lg border border-border/20">
                          <Image
                            src={`/placeholder.svg?height=400&width=600&text=Screenshot ${index}`}
                            alt={`${selectedProject.title} screenshot ${index}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SectionContainer>
  )
}

interface ProjectCardProps {
  project: (typeof projects)[0]
  onSelect: () => void
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isClient = useIsClient()

  return (
    <Card
      className="relative overflow-hidden h-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/20 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <CardContent className="p-6 bg-card/50">
        <div className="flex justify-between items-start mb-3">
          <Badge 
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full",
              project.category === "web" 
                ? "bg-blue-500/20 text-blue-500 border-blue-500/30"
                : project.category === "ai"
                  ? "bg-purple-500/20 text-purple-500 border-purple-500/30"
                  : "bg-green-500/20 text-green-500 border-green-500/30"
            )}
          >
            {project.category === "ai"
              ? "AI & ML"
              : project.category === "web"
                ? "Web Dev"
                : project.category === "data"
                  ? "Data Science"
                  : project.category === "audio"
                    ? "Audio"
                    : "Research"}
          </Badge>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < project.difficulty ? "fill-yellow-500 text-yellow-500" : "text-foreground/30"}`}
              />
            ))}
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2 text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
          {project.title}
          <ChevronIcon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <Badge key={i} variant="secondary" className="text-xs bg-muted/60 text-foreground/80 border-none">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="secondary" className="text-xs bg-muted/60 text-foreground/80 border-none">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{project.completed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Team: {project.teamSize}</span>
          </div>
        </div>
      </CardContent>

      {/* Bottom gradient accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-happy-hearts to-golden-nugget opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  )
}

