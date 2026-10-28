import { ExternalLink } from "lucide-react"
import { siGithub } from "simple-icons"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ContributionGraph } from "@/components/contribution-graph"
import { getContributionCalendar, type ContributionDay } from "@/lib/github-contributions"

const GITHUB_USERNAME = "Mentrauz"

function parseDate(date: string) {
  return new Date(`${date}T00:00:00Z`)
}

// Columns are weeks starting on Sunday, like GitHub; null pads the first and last week
function toWeeks(days: ContributionDay[]) {
  const cells: (ContributionDay | null)[] = [...Array(parseDate(days[0].date).getUTCDay()).fill(null), ...days]
  const weeks: (ContributionDay | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    const week = cells.slice(i, i + 7)
    weeks.push([...week, ...Array(7 - week.length).fill(null)])
  }
  return weeks
}

// A label goes on the first week of each month, skipping any too close to the next one to fit
function monthLabels(weeks: (ContributionDay | null)[][]) {
  const labels: { column: number; name: string }[] = []
  let previousMonth = -1
  weeks.forEach((week, column) => {
    const firstDay = week.find((day) => day !== null)
    if (!firstDay) return
    const date = parseDate(firstDay.date)
    if (date.getUTCMonth() === previousMonth) return
    previousMonth = date.getUTCMonth()
    labels.push({ column, name: date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) })
  })
  return labels.filter((label, i) => i === labels.length - 1 || labels[i + 1].column - label.column >= 3)
}

function longestStreak(days: ContributionDay[]) {
  let longest = 0
  let current = 0
  for (const day of days) {
    current = day.count > 0 ? current + 1 : 0
    longest = Math.max(longest, current)
  }
  return longest
}

export default async function GitHubActivity() {
  const calendar = await getContributionCalendar(GITHUB_USERNAME)
  if (!calendar) return null

  const weeks = toWeeks(calendar.days)
  const streak = longestStreak(calendar.days)
  const busiest = calendar.days.reduce((best, day) => (day.count > best.count ? day : best))

  const stats = [
    { value: calendar.total.toLocaleString("en-US"), label: "Contributions" },
    { value: `${streak} ${streak === 1 ? "day" : "days"}`, label: "Longest streak" },
    { value: busiest.count.toLocaleString("en-US"), label: "Best day" },
  ]

  return (
    <ScrollReveal>
      <Card
        id="github-activity"
        className="mt-6 overflow-hidden bg-card/80 backdrop-blur-sm border border-border/50 shadow-md"
      >
        <CardContent className="p-6 bg-card/50">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d={siGithub.path} />
              </svg>
              GitHub Activity
            </h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              @{GITHUB_USERNAME}
              <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Stats sit beside the graph on wide screens, which also keeps the cells from growing oversized */}
          <div className="flex flex-col gap-6 xl:flex-row xl:gap-10">
            <dl className="grid grid-cols-3 divide-x divide-border/50 xl:w-44 xl:shrink-0 xl:grid-cols-1 xl:content-between xl:divide-x-0 xl:divide-y">
              {stats.map((stat) => (
                <div key={stat.label} className="px-3 first:pl-0 last:pr-0 xl:px-0 xl:py-3 xl:first:pt-0 xl:last:pb-0">
                  <dt className="text-[11px] sm:text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 text-lg sm:text-2xl font-bold tabular-nums text-foreground">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="min-w-0 flex-1">
              <ContributionGraph weeks={weeks} months={monthLabels(weeks)} total={calendar.total} />
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  )
}
