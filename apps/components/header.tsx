"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Search, BookOpen, Moon, Sun, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Branches", href: "/#branches" },
    { label: "Search", href: "/search" },
    { label: "About", href: "/about" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-background border-b",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-1">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-lg hidden sm:inline-block">Engineering Curriculum</span>
              <span className="font-bold text-lg sm:hidden">EC</span>
            </Link>

            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/search" className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>
            </Link>

            <div className="hidden md:flex relative w-40 lg:w-64">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 h-9 md:w-64 lg:w-80"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value
                    if (value) {
                      window.location.href = `/search?q=${encodeURIComponent(value)}`
                    }
                  }
                }}
              />
            </div>

            {mounted && (
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center gap-2">
                      <GraduationCap className="h-6 w-6 text-primary" />
                      <span className="font-bold">Engineering Curriculum</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Close">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>

                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const value = (e.target as HTMLInputElement).value
                          if (value) {
                            window.location.href = `/search?q=${encodeURIComponent(value)}`
                          }
                        }
                      }}
                    />
                  </div>

                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                          pathname === item.href
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/50",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-6 border-t">
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Download Curriculum
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Academic Calendar
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

