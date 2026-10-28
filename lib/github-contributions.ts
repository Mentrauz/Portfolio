// Reads the public contribution calendar GitHub renders for every profile, so no API token is needed.
// Server-only: called from a server component and cached for a day.

export interface ContributionDay {
  date: string // YYYY-MM-DD
  level: 0 | 1 | 2 | 3 | 4
  count: number
}

export interface ContributionCalendar {
  total: number
  days: ContributionDay[]
}

const REVALIDATE_SECONDS = 60 * 60 * 24

function attr(tag: string, name: string) {
  return tag.match(new RegExp(`${name}="([^"]*)"`))?.[1]
}

export async function getContributionCalendar(username: string): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) return null
    const html = await res.text()

    // Each day's count only appears in its tooltip, keyed by the day cell's id
    const counts = new Map<string, number>()
    for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
      const n = text.match(/^\s*([\d,]+)\s+contribution/)
      counts.set(id, n ? Number(n[1].replace(/,/g, "")) : 0)
    }

    const days: ContributionDay[] = []
    for (const [tag] of html.matchAll(/<td\b[^>]*ContributionCalendar-day[^>]*>/g)) {
      const date = attr(tag, "data-date")
      const level = Number(attr(tag, "data-level"))
      const id = attr(tag, "id")
      if (!date || !(level >= 0 && level <= 4)) continue
      days.push({ date, level: level as ContributionDay["level"], count: (id && counts.get(id)) || 0 })
    }
    if (days.length === 0) return null
    days.sort((a, b) => a.date.localeCompare(b.date))

    const heading = html.match(/([\d,]+)\s+contributions\s+in the last year/)
    const total = heading ? Number(heading[1].replace(/,/g, "")) : days.reduce((sum, day) => sum + day.count, 0)

    return { total, days }
  } catch (error) {
    console.warn("Could not load GitHub contributions:", error)
    return null
  }
}
