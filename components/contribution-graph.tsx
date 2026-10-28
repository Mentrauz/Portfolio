"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type { ContributionDay } from "@/lib/github-contributions"
import { cn } from "@/lib/utils"

// Shades of the active theme's primary colour, so the graph follows the theme switcher
const levelClasses: Record<ContributionDay["level"], string> = {
  0: "bg-muted/60",
  1: "bg-primary/25",
  2: "bg-primary/50",
  3: "bg-primary/75",
  4: "bg-primary",
}

// GitHub labels alternate weekdays; rows are Sunday-first
const weekdayLabels = [
  { row: 1, name: "Mon" },
  { row: 3, name: "Wed" },
  { row: 5, name: "Fri" },
]

interface ContributionGraphProps {
  weeks: (ContributionDay | null)[][]
  months: { column: number; name: string }[]
  total: number
}

interface Tip {
  x: number
  y: number
  day: ContributionDay
}

// Dates are calendar days, so format in UTC to stop the viewer's timezone shifting them
function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function ContributionGraph({ weeks, months, total }: ContributionGraphProps) {
  const [tip, setTip] = useState<Tip | null>(null)

  // A fixed tooltip would drift from its cell once the page moves, so drop it on scroll
  useEffect(() => {
    if (!tip) return
    const hide = () => setTip(null)
    window.addEventListener("scroll", hide, { passive: true })
    return () => window.removeEventListener("scroll", hide)
  }, [tip])

  // One delegated handler instead of a listener per cell
  const showTip = (target: EventTarget) => {
    const cell = (target as HTMLElement).closest<HTMLElement>("[data-date]")
    if (!cell) return setTip(null)
    const rect = cell.getBoundingClientRect()
    setTip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      day: {
        date: cell.dataset.date!,
        count: Number(cell.dataset.count),
        level: Number(cell.dataset.level) as ContributionDay["level"],
      },
    })
  }

  return (
    <div>
      {/* rtl makes the scroller start at its right edge, so phones open on the most recent weeks;
          the left fade hints that older weeks are a swipe away */}
      <div
        dir="rtl"
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:[mask-image:linear-gradient(to_right,transparent,black_2rem)]"
      >
        <div
          dir="ltr"
          role="img"
          aria-label={`${total} GitHub contributions in the last year`}
          className="grid min-w-[620px] gap-[3px]"
          style={{ gridTemplateColumns: `auto repeat(${weeks.length}, minmax(0, 1fr))` }}
          onPointerOver={(e) => showTip(e.target)}
          onPointerLeave={() => setTip(null)}
        >
          {months.map((month) => (
            <span
              key={month.column}
              className="whitespace-nowrap pb-1 font-mono text-[10px] leading-none text-muted-foreground"
              style={{ gridRow: 1, gridColumn: `${month.column + 2} / span 3` }}
            >
              {month.name}
            </span>
          ))}

          {weekdayLabels.map((label) => (
            <span
              key={label.name}
              className="self-center pr-2 font-mono text-[10px] leading-none text-muted-foreground"
              style={{ gridRow: label.row + 2, gridColumn: 1 }}
            >
              {label.name}
            </span>
          ))}

          {weeks.flatMap((week, column) =>
            week.map((day, row) =>
              day ? (
                <span
                  key={day.date}
                  data-date={day.date}
                  data-count={day.count}
                  data-level={day.level}
                  className={cn(
                    "aspect-square rounded-[2px] ring-inset ring-foreground/60 hover:ring-1",
                    levelClasses[day.level],
                  )}
                  style={{ gridRow: row + 2, gridColumn: column + 2 }}
                />
              ) : null,
            ),
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1 font-mono text-[10px] text-muted-foreground" aria-hidden="true">
        <span className="mr-1">Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span key={level} className={cn("h-2.5 w-2.5 rounded-[2px]", levelClasses[level])} />
        ))}
        <span className="ml-1">More</span>
      </div>

      {/* Portalled to body: the card's backdrop blur would otherwise trap a fixed tooltip inside it */}
      {tip &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md"
            style={{ left: tip.x, top: tip.y - 6 }}
          >
            <span className="font-semibold">
              {tip.day.count === 0
                ? "No contributions"
                : `${tip.day.count} contribution${tip.day.count === 1 ? "" : "s"}`}
            </span>
            <span className="text-muted-foreground"> on {formatDate(tip.day.date)}</span>
          </div>,
          document.body,
        )}
    </div>
  )
}
