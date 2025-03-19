"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"
import {
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  ChevronDown,
  Award,
  Briefcase,
  GraduationCap,
  Users,
  Target,
  NotebookTabs
} from "lucide-react"

// Experience data
const experiences = [
  {
    id: "payroll",
    title: "Payroll Developer for a Start-Up",
    company: "TMS Groups",
    location: "Gurgaon, India",
    period: "December 2024 - Present",
    type: "work",
    description:
      "Developed a payroll system for a start-up using NextJS and MongoDB",
    responsibilities: [
      "Developed a automated system for generating payroll",
      "Developed a system for tracking employee hours and generating paychecks",
      "Designed Invoice Generator for the company and also auto salary processing with seamless intake of employee data",
    ],
    skills: ["NextJS", "MongoDB", "NodeJS", "Express", "React", "TailwindCSS", "TypeScript"],
    metrics: [
      { value: "1500+", label: "Employees" },
      { value: "1", label: "Solo Developer" },
    ],
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "Web Developer (Remote)",
    title: "Website redesign (remote)",
    company: "Leiferando.de",
    location: "Germany",
    period: "December 2024 - Present",
    type: "work",
    description:
      "Redesigned the website for Lieferando.de",
    responsibilities: [
      "Improving UI/UX",
      "Reduction in overall loading times and improved performance",
      "Integrated security features to protect user data",
    ],
    skills: ["NextJS", "MongoDB", "Angular", "Cloudflare", "React", "TailwindCSS", "TypeScript"],
    metrics: [
      { value: "2000+", label: "Users Daily" },
      { value: "8", label: "Team Project" },
    ],
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "Web Developer",
    title: "Website Development",
    company: "Chowdeshwari Catering",
    location: "Bengaluru, India",
    period: "December 2024",
    type: "work",
    description:
      "Designed the website for Chowdeshwari Catering",
    responsibilities: [
      "User Friendly UI",
      "Smooth and consistent Experience throughout the website",
      "Easy display of all the information",
    ],
    skills: ["NextJS", "TailwindCSS", "TypeScript"],
    metrics: [
      { value: "100+", label: "Visitors Daily" },
      { value: "1", label: "Solo Project" },
    ],
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: "calories-detection",
    title: "Calories detection image processing system (Work in Progress)",
    company: "Team Project",
    location: "Rajkot, India",
    period: "March 2025 - present",
    type: "research",
    description:
      "Developed a system for detecting calories in Vegetables and Fruits images using Python and TensorFlow",
    responsibilities: [
      "To Process and train the model on the dataset",
      "Fix technical issues in the model",  
    ],
    skills: ["Python", "TensorFlow", "Machine Learning", "Image Processing"],
    metrics: [
      { value: "Est. 1000+", label: "People" },
      { value: "2", label: "Team Size" },
      { value: "95%", label: "Pass Rate" },
    ],
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "power-zi",
    title: "PowerZI - A Powerful Agentic tool for MS apps",
    company: "Personal Project",
    location: "Rajkot, India",
    period: "2025 - present",
    type: "research",
    description:
      "Research in progress",
    responsibilities: [
      "Research in progress",
      "Research in progress",
      "Research in progress",
      "Research in progress",
    ],
    skills: ["Python", "Data Analysis", "Research", "Scientific Computing", "ML", "Agentic AI", "Microservices"],
    metrics: [
      { value: ":)", label: "Publications" },
      { value: ":)", label: "Conferences" },
      { value: ":)", label: "Research Grants" },
    ],
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "btech",
    title: "B.Tech in Computer Science and Engineering",
    company: "Marwadi University",
    location: "Rajkot, India",
    period: "2021 - 2025",
    type: "education",
    description:
      "Research in progress",
    responsibilities: [
      "Research in progress",
      "Research in progress",
      "Research in progress",
      "Research in progress",
    ],
    skills: ["Python", "Data Analysis", "Research", "Scientific Computing", "ML", "Agentic AI", "Microservices"],
    metrics: [
      { value: ":)", label: "Publications" },
      { value: ":)", label: "Conferences" },
      { value: ":)", label: "Research Grants" },
    ],
    color: "from-blue-600 to-cyan-600",
  },
]

export default function RedesignedExperience() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [experienceType, setExperienceType] = useState<"all" | "work" | "education">("all")

  const toggleExpand = (id: string) => {
    setExpandedExperience(expandedExperience === id ? null : id)
  }

  // Filter experiences based on type
  const filteredExperiences =
    experienceType === "all" ? experiences : experiences.filter((exp) => exp.type === experienceType)

  // When rendering the list, add a check to prevent duplicates by ID
  const renderedExperienceIds = new Set()

  return (
    <SectionContainer id="experience" className="bg-gradient-to-b from-background/95 to-background">
      <SectionHeader
        title="Professional Journey"
        subtitle="My professional experiences and career highlights in AI development, education, and community building."
      />

      <ScrollReveal>
        <Tabs
          defaultValue="all"
          onValueChange={(value) => setExperienceType(value as "all" | "work" | "education")}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2 no-scrollbar">
            <TabsList className="flex justify-center gap-2 mb-8 bg-transparent w-fit mx-auto">
              <TabsTrigger
                value="all"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "all" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <span>All Experience</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="work"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "work" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Work Experience</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="education"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "education" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="research"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "research" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <NotebookTabs className="h-4 w-4" />
                  <span>Research</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-6">
            {filteredExperiences.map((experience, index) => {
              // Skip if we've already rendered this experience
              if (renderedExperienceIds.has(experience.id)) return null;
              
              // Add this ID to our Set so we don't render it again
              renderedExperienceIds.add(experience.id);
              
              return (
                <ErrorBoundary key={experience.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className={cn("overflow-hidden border-none shadow-lg", `bg-gradient-to-br ${experience.color}/10`)}
                    >
                      <CardContent className="p-0">
                        <div
                          className={cn(
                            "p-4 sm:p-6 cursor-pointer transition-all duration-300",
                            expandedExperience === experience.id ? "pb-3" : "",
                          )}
                          onClick={() => toggleExpand(experience.id)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div>
                              <Badge
                                className={cn(
                                  "mb-2 px-3 py-1",
                                  experience.type === "work"
                                    ? "bg-blue-500/20 text-blue-500 border-blue-500/30"
                                    : experience.type === "research"
                                      ? "bg-amber-500/20 text-amber-500 border-amber-500/30"
                                      : "bg-green-500/20 text-green-500 border-green-500/30"
                                )}
                              >
                                {experience.type === "work" ? (
                                  <Briefcase className="h-3 w-3 mr-1" />
                                ) : experience.type === "research" ? (
                                  <NotebookTabs className="h-3 w-3 mr-1" />
                                ) : (
                                  <GraduationCap className="h-3 w-3 mr-1" />
                                )}
                                {experience.type === "work" ? "Work Experience" : experience.type === "research" ? "Research" : "Education"}
                              </Badge>
                              <h3 className="text-xl font-semibold flex items-center gap-2">
                                {experience.title}
                                <motion.div
                                  animate={{ rotate: expandedExperience === experience.id ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {expandedExperience === experience.id ? (
                                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </motion.div>
                              </h3>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Building className="h-4 w-4" />
                                  <span>{experience.company}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{experience.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{experience.period}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-muted-foreground">{experience.description}</p>
                        </div>

                        <AnimatePresence>
                          {expandedExperience === experience.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 sm:px-6 pb-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t">
                                  <div>
                                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                      <Award className="h-5 w-5 text-primary" />
                                      Key Responsibilities
                                    </h4>
                                    <ul className="space-y-2">
                                      {experience.responsibilities.map((responsibility, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                                            <span className="text-xs text-primary">✓</span>
                                          </div>
                                          <span className="text-sm sm:text-base">{responsibility}</span>
                                        </li>
                                      ))}
                                    </ul>

                                    <div className="mt-6">
                                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                        <Users className="h-5 w-5 text-primary" />
                                        Skills Applied
                                      </h4>
                                      <div className="flex flex-wrap gap-2">
                                        {experience.skills.map((skill, i) => (
                                          <Badge key={i} variant="secondary">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                      <Target className="h-5 w-5 text-primary" />
                                      Key Metrics & Achievements
                                    </h4>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                      {experience.metrics.map((metric, i) => (
                                        <div key={i} className="bg-primary/10 rounded-lg p-3 text-center">
                                          <div className="text-xl sm:text-2xl font-bold">{metric.value}</div>
                                          <div className="text-xs sm:text-sm text-muted-foreground">{metric.label}</div>
                                        </div>
                                      ))}
                                    </div>

                                    {experience.type === "work" && (
                                      <div className="mt-4">
                                        <Button variant="outline" className="w-full">
                                          View Reference Letter
                                        </Button>
                                      </div>
                                    )}

                                    {experience.type === "education" && (
                                      <div className="mt-4">
                                        <Button variant="outline" className="w-full">
                                          View Transcript
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ErrorBoundary>
              );
            })}
          </div>
        </Tabs>
      </ScrollReveal>
    </SectionContainer>
  )
}

