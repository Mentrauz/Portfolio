import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  id?: string
  className?: string
  children: React.ReactNode
  fullWidth?: boolean
  as?: React.ElementType
  style?: React.CSSProperties
}

export function SectionContainer({
  id,
  className,
  children,
  fullWidth = false,
  as: Component = "section",
  style,
  ...props
}: SectionContainerProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      id={id}
      className={cn("py-16 md:py-24", fullWidth ? "w-full" : "container mx-auto px-4", className)}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  titleClassName?: string
  subtitleClassName?: string
  decorative?: boolean
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  titleClassName,
  subtitleClassName,
  decorative = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", align === "center" && "flex flex-col items-center")}>
      <h2 
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold relative inline-block pb-3 mb-4",
          "text-primary transition-colors duration-300",
          titleClassName
        )}
        style={{
          borderBottom: decorative ? "3px solid currentColor" : undefined,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg text-muted-foreground",
            align === "center" ? "max-w-3xl text-center" : "max-w-3xl",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

