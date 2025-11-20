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
  NotebookTabs,
  ExternalLink
} from "lucide-react"


// Experience data
const experiences = [
  {
    id: "payroll",
    title: "Payroll Developer for a Start-Up",
    company: "TMS Groups",
    location: "Gurgaon, India",
    period: "December 2024 - December 2025",
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
    period: "July 2024",
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
  // {
  //   id: "calories-detection",
  //   title: "Calories detection image processing system",
  //   company: "Team Project",
  //   location: "Rajkot, India",
  //   period: "March 2025 - May 2025",
  //   type: "research",
  //   description:
  //     "Developed a system for detecting calories in Vegetables and Fruits images using Python and TensorFlow",
  //   responsibilities: [
  //     "To Process and train the model on the dataset",
  //     "Fix technical issues in the model",  
  //   ],
  //   skills: ["Python", "TensorFlow", "Machine Learning", "Image Processing"],
  //   metrics: [
  //     { value: "Est. 1000+", label: "People" },
  //     { value: "2", label: "Team Size" },
  //     { value: "95%", label: "Pass Rate" },
  //   ],
  //   screenshots: [
  //     {
  //       url: "/screenshot/calories-demo.png",
  //       caption: "Live demo of calorie detection on fruit images",
  //       alt: "Screenshot showing AI model detecting calories in fruit images"
  //     },
  //     {
  //       url: "/screenshot/calories-training.png",
  //       caption: "Model training interface and accuracy metrics",
  //       alt: "Training dashboard showing model performance and accuracy graphs"
  //     }
  //   ],
  //   color: "from-green-600 to-emerald-600",
  // },
  {
    id: "Adsense",
    title: "Generative AI for Personalized Content Creation",
    company: "Team Research Project",
    location: "Rajkot, India",
    period: "2025 March - 2025 September",
    type: "research",
    description:
      "Research in progressThis project develops a generative AI system for personalized content creation, leveraging large language models to produce tailored media for marketing or education.",
    responsibilities: [
      "Design and implement UI/UX",
      "Design system architecture",
      "Research on the latest technologies",
      "Research in progress",
    ],
    skills: ["Python", "Data Analysis", "Research", "Scientific Computing", "ML", "Agentic AI", "Microservices", "NextJS", "MongoDB", "React", "TailwindCSS", "TypeScript"],
    metrics: [
      { value: "3", label: "Team Size" },
      { value: "1", label: "Research Grants" },
      { value: "95%", label: "Success Rate" },
    ],
    // screenshots: [
    //   {
    //     url: "/screenshots/powerzi-architecture.png",
    //     caption: "System architecture diagram",
    //     alt: "PowerZI system architecture showing microservices integration"
    //   },
    //   {
    //     url: "/screenshots/powerzi-ui.png",
    //     caption: "Early prototype user interface",
    //     alt: "PowerZI prototype interface for MS Office integration"
    //   }
    // ],
    color: "from-blue-600 to-cyan-600",
  },
  // {
  //   id: "btech",
  //   title: "B.Tech in Computer Science and Engineering",
  //   company: "Marwadi University",
  //   location: "Rajkot, India",
  //   period: "2022 - 2026",
  //   type: "education",
  //   description:
  //     "Completing my B.Tech in Computer Science and Engineering with a focus on Machine Learning and Web Development",
  //   responsibilities: [
  //     "To learn and implement the latest technologies",
  //     "To work on real-world projects",
  //     "To Learn Teamwork and Leadership",
  //     "To implement best practices in the industry",
  //   ],
  //   skills: ["Python", "Data Analysis", "Research", "Scientific Computing", "ML", "Agentic AI", "Microservices", "NextJS", "MongoDB", "React", "TailwindCSS", "TypeScript"],
  //   metrics: [
  //     { value: ":)", label: "Publications" },
  //     { value: ":)", label: "Conferences" },
  //     { value: ":)", label: "Research Grants" },
  //   ],
  //   color: "from-blue-600 to-cyan-600",
  // },
]

export default function RedesignedExperience() {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [experienceType, setExperienceType] = useState<"all" | "work" | "education" | "research">("all")

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
          onValueChange={(value) => setExperienceType(value as "all" | "work" | "education" | "research")}
          className="w-full"
        >
          <div className="overflow-x-auto pb-2 custom-scrollbar-auto">
            <TabsList className="flex justify-center gap-2 mb-8 bg-card/30 backdrop-blur-sm border border-border/20 w-fit mx-auto">
              <TabsTrigger
                value="all"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "all" ? "bg-primary text-primary-foreground" : "bg-muted/50 hover:bg-muted/70 backdrop-blur-sm",
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
                  experienceType === "work" ? "bg-primary text-primary-foreground" : "bg-muted/50 hover:bg-muted/70 backdrop-blur-sm",
                )}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Work Experience</span>
                </div>
              </TabsTrigger>

              {/* <TabsTrigger
                value="education"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "educa tion" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Education</span>
                </div>
              </TabsTrigger> */}

              <TabsTrigger
                value="research"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all data-[state=active]:shadow-lg",
                  experienceType === "research" ? "bg-primary text-primary-foreground" : "bg-muted/50 hover:bg-muted/70 backdrop-blur-sm",
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
                      className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/20"
                    >
                      <CardContent className="p-0 bg-card/50">
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
                                  "mb-2 px-3 py-1 border-border/50",
                                  experience.type === "work"
                                    ? "bg-primary/20 text-primary border-primary/30"
                                    : experience.type === "research"
                                      ? "bg-secondary/20 text-secondary-foreground border-secondary/30"
                                      : "bg-accent/20 text-accent-foreground border-accent/30"
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
                                          <Badge key={i} variant="secondary" className="bg-muted/50 hover:bg-muted/70 transition-colors">
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
                                        <div key={i} className="bg-muted/30 backdrop-blur-sm rounded-lg p-3 text-center border border-border/20">
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

