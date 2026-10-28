"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { SimpleIcon } from "simple-icons"
import {
  siClaude,
  siDocker,
  siExpress,
  siFramer,
  siGit,
  siGithub,
  siGithubactions,
  siGooglegemini,
  siJavascript,
  siLanggraph,
  siModelcontextprotocol,
  siMongodb,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPrisma,
  siReact,
  siTailwindcss,
  siTypescript,
  siVagrant,
  siVercel,
  siZedindustries,
} from "simple-icons"
import {
  AppWindow,
  BookOpenText,
  Bot,
  Braces,
  Feather,
  Infinity as InfinityIcon,
  Layers,
  type LucideIcon,
  MessageSquareText,
  Radio,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react"
import { SectionContainer, SectionHeader } from "@/components/ui/section-container"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { FilterTabs } from "@/components/ui/filter-tabs"

// A skill shows its brand logo when Simple Icons has one, otherwise a generic Lucide icon
type Skill = { name: string; brand: SimpleIcon } | { name: string; icon: LucideIcon }

interface SkillCategory {
  id: string
  label: string
  icon: LucideIcon
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    label: "AI Engineering",
    icon: Sparkles,
    skills: [
      { name: "AI Agents", icon: Bot },
      { name: "RAG", icon: BookOpenText },
      { name: "MCP", brand: siModelcontextprotocol },
      { name: "LangGraph", brand: siLanggraph },
      { name: "Prompt Engineering", icon: MessageSquareText },
      { name: "n8n", brand: siN8n },
      { name: "Claude", brand: siClaude },
      { name: "Gemini API", brand: siGooglegemini },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: AppWindow,
    skills: [
      { name: "React", brand: siReact },
      { name: "Next.js", brand: siNextdotjs },
      { name: "JavaScript", brand: siJavascript },
      { name: "TypeScript", brand: siTypescript },
      { name: "Tailwind CSS", brand: siTailwindcss },
      { name: "Framer Motion", brand: siFramer },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    skills: [
      { name: "Java", brand: siOpenjdk },
      { name: "Node.js", brand: siNodedotjs },
      { name: "Express.js", brand: siExpress },
      { name: "RESTful APIs", icon: Braces },
      { name: "Prisma", brand: siPrisma },
      { name: "PostgreSQL", brand: siPostgresql },
      { name: "MongoDB", brand: siMongodb },
      { name: "SSE", icon: Radio },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: InfinityIcon,
    skills: [
      { name: "Docker", brand: siDocker },
      { name: "Git", brand: siGit },
      { name: "GitHub", brand: siGithub },
      { name: "GitHub Actions", brand: siGithubactions },
      { name: "Vagrant", brand: siVagrant },
      { name: "Vercel", brand: siVercel },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: Wrench,
    skills: [
      { name: "Zed", brand: siZedindustries },
      // Generic icon: Simple Icons' "Hermes" logo may not be the same Hermes
      { name: "Hermes", icon: Feather },
      { name: "Postman", brand: siPostman },
    ],
  },
]

const ALL_ID = "all"

const tabs = [
  { id: ALL_ID, label: "All", icon: Layers, skills: skillCategories.flatMap((category) => category.skills) },
  ...skillCategories,
]

// Near-black brand colours (Next.js, GitHub, MCP, Prisma) would vanish on dark themes, so they follow the text colour
function brandColor(hex: string) {
  const value = parseInt(hex, 16)
  const luminance = (0.2126 * ((value >> 16) & 255) + 0.7152 * ((value >> 8) & 255) + 0.0722 * (value & 255)) / 255
  return luminance < 0.25 ? "currentColor" : `#${hex}`
}

function SkillIcon({ skill }: { skill: Skill }) {
  if ("brand" in skill) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0" fill={brandColor(skill.brand.hex)}>
        <path d={skill.brand.path} />
      </svg>
    )
  }

  const Icon = skill.icon
  return <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
}

export default function RedesignedSkills() {
  const [activeTab, setActiveTab] = useState(ALL_ID)
  const skills = tabs.find((tab) => tab.id === activeTab)?.skills ?? []

  return (
    <SectionContainer id="skills" className="bg-gradient-to-b from-background to-background/95">
      <SectionHeader
        title="Tech Stack"
      />

      <ScrollReveal>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto w-full max-w-5xl">
            <FilterTabs tabs={tabs} value={activeTab} layoutId="skills-active-tab" ariaLabel="Filter skills by category" />

            <TabsContent value={activeTab} className="mt-6">
              <motion.ul layout className="flex flex-wrap gap-2.5 sm:gap-3">
                <AnimatePresence mode="popLayout" initial={false}>
                  {skills.map((skill) => (
                    <motion.li
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-sm text-card-foreground transition-colors hover:border-primary/50 hover:bg-muted/40"
                    >
                      <SkillIcon skill={skill} />
                      {skill.name}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </TabsContent>
          </Tabs>
      </ScrollReveal>

      <div className="mt-12 text-center">
        <ScrollReveal>
          <p className="text-muted-foreground">
            The tools I use across professional work, research and personal projects.
            <br />
            I&apos;m always learning, especially around AI, machine learning and DevOps.
          </p>
        </ScrollReveal>
      </div>
    </SectionContainer>
  )
}
