"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export type Theme = "light" | "dark" | "system"
export type ColorTheme = "default" | "ocean" | "forest" | "sunset" | "lavender" | "monochrome"

export interface ExtendedThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: ExtendedThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Custom hook to manage both theme mode and color theme
export function useExtendedTheme() {
  // Use the useTheme hook from next-themes directly
  const { theme, setTheme, resolvedTheme } = useTheme()
  // Consumers only render colour state after mount, so reading storage here can't cause a hydration mismatch
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>(() =>
    typeof window === "undefined" ? "default" : ((localStorage.getItem("color-theme") as ColorTheme | null) ?? "default"),
  )

  // Apply the saved color theme class on mount
  React.useEffect(() => {
    if (colorTheme !== "default") {
      document.documentElement.classList.add(`theme-${colorTheme}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only the initial value needs applying; updates go through updateColorTheme
  }, [])

  // Function to update color theme
  const updateColorTheme = React.useCallback((newColorTheme: ColorTheme) => {
    // Only run on client
    if (typeof window === "undefined") return

    // Remove all existing theme classes
    document.documentElement.classList.remove(
      "theme-default",
      "theme-ocean",
      "theme-forest",
      "theme-sunset",
      "theme-lavender",
      "theme-monochrome",
    )

    // Add the new theme class if it's not default
    if (newColorTheme !== "default") {
      document.documentElement.classList.add(`theme-${newColorTheme}`)
    }

    // Save to localStorage
    localStorage.setItem("color-theme", newColorTheme)
    setColorTheme(newColorTheme)
  }, [])

  return {
    theme: theme as Theme,
    setTheme,
    resolvedTheme: resolvedTheme as Theme,
    colorTheme,
    setColorTheme: updateColorTheme,
  }
}

