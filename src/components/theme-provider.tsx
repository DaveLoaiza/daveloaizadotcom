"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  attribute = "data-theme",
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof localStorage !== "undefined" ? (localStorage.getItem(storageKey) as Theme) || defaultTheme : defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    // Remove old attribute value
    const dataAttribute = attribute === "class" ? "class" : `${attribute}`

    if (attribute === "class") {
      root.classList.remove("light", "dark")
    } else {
      root.removeAttribute(dataAttribute)
    }

    // Add new attribute value
    if (theme === "system" && enableSystem) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

      if (attribute === "class") {
        if (!disableTransitionOnChange) {
          root.classList.add(systemTheme)
        } else {
          root.classList.add("no-transition")
          root.classList.add(systemTheme)
          // Force a reflow
          window.getComputedStyle(root).getPropertyValue("opacity")
          root.classList.remove("no-transition")
        }
      } else {
        root.setAttribute(dataAttribute, systemTheme)
      }
      return
    }

    if (attribute === "class") {
      if (!disableTransitionOnChange) {
        root.classList.add(theme)
      } else {
        root.classList.add("no-transition")
        root.classList.add(theme)
        // Force a reflow
        window.getComputedStyle(root).getPropertyValue("opacity")
        root.classList.remove("no-transition")
      }
    } else {
      root.setAttribute(dataAttribute, theme)
    }
  }, [theme, attribute, enableSystem, disableTransitionOnChange])

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const onSystemThemeChange = () => {
      if (theme === "system") {
        setTheme("system")
      }
    }

    mediaQuery.addEventListener("change", onSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener("change", onSystemThemeChange)
    }
  }, [theme, enableSystem])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

