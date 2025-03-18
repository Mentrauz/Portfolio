import type React from "react"
import { BookOpen, GraduationCap, Trophy, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function Education() {
  return (
    <section id="education" className="py-12 px-3 sm:px-4">
      <div className="max-w-[90%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Education</h2>

        <Card className="bg-gradient-to-r from-indigo-950 to-purple-950 border-none w-full">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <CardTitle>B.Tech in Computer Science and Engineering</CardTitle>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-muted-foreground">Marwadi University</div>
              <div>2022 - 2026</div>
            </div>
            <div className="text-muted-foreground">Rajkot, Gujarat</div>
            <div className="text-muted-foreground">GPA: 7</div>
            <div className="text-muted-foreground mt-1">
              Relevant Coursework: Machine Learning, Data Structures, Computational Physics, Network Science, Data
              Visualization
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8 mt-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Coursework</h3>
                <div className="grid grid-cols-2 gap-4">
                  <CourseItem name="Machine Learning" grade="A" />
                  <CourseItem name="Data Structures and Algorithms" grade="A" />
                  <CourseItem name="Network Science" grade="A" />
                  <CourseItem name="Data Visualization" grade="A" />
                  <CourseItem name="Linear Algebra" grade="A" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Key Achievements</h3>
                <div className="space-y-6">
                  <AchievementItem
                    icon={<Trophy className="h-5 w-5" />}
                    title="Research Excellence"
                    description="Applied advanced data analysis techniques to physics research projects"
                  />
                  <AchievementItem
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="Technical Innovation"
                    description="Developed computational models for complex physical systems"
                  />
                  <AchievementItem
                    icon={<BookOpen className="h-5 w-5" />}
                    title="Academic Leadership"
                    description="Led physics study groups and mentored junior students"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Skills Developed</h3>
              <div className="space-y-4">
                <SkillProgressItem name="Scientific Computing" value={90} />
                <SkillProgressItem name="Data Analysis" value={85} />
                <SkillProgressItem name="Mathematical Modeling" value={80} />
                <SkillProgressItem name="Research Methods" value={95} />
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
      <div className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
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
    <div className="bg-black/20 rounded-lg p-4">
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
}

function SkillProgressItem({ name, value }: SkillProgressItemProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <div>{name}</div>
        <div>{value}%</div>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  )
}

