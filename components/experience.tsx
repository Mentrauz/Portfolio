import { Calendar, Building, Trophy, Cpu } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Experience() {
  return (
    <section id="experience" className="py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Professionall Journey</h2>

      <div className="space-y-8 mt-12">
        <ExperienceCard
          title="Payroll Developer for a Start-Up"
          company="TMS Groups"
          period="December 2024 - Present"
          achievements={[
            "Developed a payroll system for a start-up using NextJS and MongoDB",
            "Developed a automated system for generating payroll",
            "Developed a system for tracking employee hours and generating paychecks",
            "Designed Invoice Generator for the company and also auto salary processing with seamless intake of employee data",
          ]}
          technologies={["NextJS", "MongoDB", "NodeJS", "Express", "React", "TailwindCSS", "TypeScript"]}
          impact={{
            title: "Overall Impact",
            description: "Positively impacted over 1500+ employees",
            metrics: [
              { value: "1500+", label: "Employees" },
              { value: "15", label: "Team Size" },
            ],
          }}
          bgColor="bg-gradient-to-r from-indigo-950 to-purple-950"
        />

        <ExperienceCard
          title="Calories detection image processing system"
          company="Team Project"
          period="March 2025 - present"
          achievements={[
            "Developed a system for detecting calories in Vegetables and Fruits images using Python and TensorFlow",
          ]}
          technologies={["Python", "TensorFlow", "Machine Learning", "Image Processing"]}
          impact={{
            title: "",
            description: "",
            metrics: [],
          }}
          bgColor="bg-gradient-to-r from-green-950 to-emerald-950"
        />
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  achievements: string[]
  technologies: string[]
  impact: {
    title: string
    description: string
    metrics: {
      value: string
      label: string
    }[]
  }
  bgColor: string
}

function ExperienceCard({ title, company, period, achievements, technologies, impact, bgColor }: ExperienceCardProps) {
  return (
    <Card className={`${bgColor} border-none`}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>{company}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{period}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Key Achievements</h3>
            </div>
            <ul className="space-y-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-sm mt-1">•</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Technologies & Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            {impact.title && (
              <>
                <h3 className="text-lg font-semibold mb-2">{impact.title}</h3>
                <p className="mb-4">{impact.description}</p>

                <div className="grid grid-cols-3 gap-4">
                  {impact.metrics.map((metric, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

