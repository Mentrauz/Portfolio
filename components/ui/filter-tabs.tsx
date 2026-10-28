"use client"

import { MotionConfig, motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface FilterTab {
  id: string
  label: string
  // Shown below the sm breakpoint instead of label, when the full label is too long for phones
  shortLabel?: string
  icon: LucideIcon
}

interface FilterTabsProps {
  tabs: FilterTab[]
  value: string
  // Must be unique per filter on the page, so each sliding highlight animates independently
  layoutId: string
  ariaLabel: string
  className?: string
}

// Segmented filter bar used by every filterable section. Render inside a Radix <Tabs> root.
export function FilterTabs({ tabs, value, layoutId, ariaLabel, className }: FilterTabsProps) {
  return (
    <MotionConfig reducedMotion="user">
      {/* Fixed width so every filter on the site is the same size, whatever section it sits in */}
      <div className={cn("mx-auto w-full max-w-5xl", className)}>
        <p className="mb-3 hidden text-right font-mono text-xs text-muted-foreground sm:block">
          ( select a tab to filter )
        </p>

        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList
            aria-label={ariaLabel}
            className="h-auto w-max min-w-full justify-start gap-1 md:w-full rounded-xl border border-border bg-muted/40 p-1.5"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="relative gap-2 rounded-lg px-3 py-2 md:flex-1 text-muted-foreground hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                >
                  {value === tab.id && (
                    <motion.span
                      layoutId={layoutId}
                      className="absolute inset-0 rounded-lg bg-primary shadow-sm"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <Icon aria-hidden="true" className="relative h-4 w-4" />
                  {tab.shortLabel ? (
                    <>
                      <span className="relative sm:hidden">{tab.shortLabel}</span>
                      <span className="relative hidden sm:inline">{tab.label}</span>
                    </>
                  ) : (
                    <span className="relative">{tab.label}</span>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
      </div>
    </MotionConfig>
  )
}
