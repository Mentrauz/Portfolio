"use client"

import type React from "react"
import { BookOpen, GraduationCap, Trophy, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useExtendedTheme, type ColorTheme } from "@/components/theme-provider"
import { Separator } from "@/components/ui/separator"

export default function Education() {
  const { colorTheme } = useExtendedTheme()

  return (
    <section id="education" className="py-12 px-3 sm:px-4">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>

        <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:border-primary/20 w-full rounded-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <CardTitle>B.Tech in Computer Science and Engineering</CardTitle>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>Marwadi University</span>
              <span className="hidden sm:inline">•</span>
              <span>Rajkot, Gujarat</span>
              <div className="ml-auto flex items-center gap-3">
                <span>2022 - 2026</span>
                <span className="hidden sm:inline">•</span>
                <span>GPA: 7</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
              Relevant Coursework: Machine Learning, Data Structures, Web Development, Networking, Cloud Computing
            </div>
          </CardHeader>
          <Separator className="opacity-50" />
          <CardContent className="bg-card/50 pt-6 pb-8">
            <div className="grid md:grid-cols-2 gap-10 lg:gap-12 mt-2">
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Coursework</h3>
                <div className="grid grid-cols-2 gap-5">
                  <CourseItem name="Machine Learning" grade="A" />
                  <CourseItem name="Data Structures and Algorithms" grade="A" />
                  <CourseItem name="Web Development" grade="A" />
                  <CourseItem name="Networking" grade="A" />
                  <CourseItem name="Cloud Computing" grade="A" />
                  <CourseItem name="Data Warehousing" grade="A" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Key Achievements</h3>
                <div className="space-y-6">
                  <AchievementItem
                    icon={<Trophy className="h-5 w-5" />}
                    title="Research Excellence"
                    description="Developed Generative AI for Personalized Content Creation"
                  />
                  <AchievementItem
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="Technical Innovation"
                    description="Developed a system for generating high quality code with personalized UI, all while adhering to SOLID principles and DRY principles."
                  />
                  <AchievementItem
                    icon={<BookOpen className="h-5 w-5" />}
                    title="Academic Leadership"
                    description="Workshop Host: Intro to Deep Learning, conducted a hands-on session attended by 80+ students, covering neural networks, backpropagation, and PyTorch basics."
                  />
                </div>
              </div>
            </div>

            <Separator className="my-8 opacity-50" />
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Skills Developed</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <SkillProgressItem name="ML Research" value={90} colorTheme={colorTheme} />
                <SkillProgressItem name="Data Analysis" value={85} colorTheme={colorTheme} />
                <SkillProgressItem name="Web Development" value={90} colorTheme={colorTheme} />
                <SkillProgressItem name="Cloud Computing" value={95} colorTheme={colorTheme} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

interface CourseItemProps {
  name: string
  grade: string
}

function CourseItem({ name, grade }: CourseItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div>{name}</div>
      <div className="bg-card/90 backdrop-blur-sm border border-border/20 text-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
        {grade}
      </div>
    </div>
  )
}

interface AchievementItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function AchievementItem({ icon, title, description }: AchievementItemProps) {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-lg p-4 hover:border-primary/20 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="font-medium">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

interface SkillProgressItemProps {
  name: string
  value: number
  colorTheme: ColorTheme
}

function SkillProgressItem({ name, value, colorTheme }: SkillProgressItemProps) {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-lg p-3 hover:border-primary/20 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <div>{name}</div>
        <div className="text-sm font-medium">{value}%</div>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

