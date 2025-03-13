"use client"

import { useEffect, useState, useCallback } from "react"
import type { CurriculumData } from "./data"

export function useCurriculumData() {
  const [data, setData] = useState<CurriculumData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("https://raw.githubusercontent.com/hasanraiyan/beu-data/refs/heads/main/data.json")

      if (!response.ok) {
        throw new Error(`Failed to fetch curriculum data: ${response.status} ${response.statusText}`)
      }

      const jsonData = await response.json()

      // Validate the data structure
      if (!jsonData || !jsonData.branches || !Array.isArray(jsonData.branches)) {
        throw new Error("Invalid data structure received")
      }

      // Ensure each branch has the required properties
      const validatedBranches = jsonData.branches.map((branch: any) => {
        // Ensure semesters array exists
        if (!branch.semesters || !Array.isArray(branch.semesters)) {
          branch.semesters = []
        }

        // Ensure each semester has the required properties
        branch.semesters = branch.semesters.map((semester: any) => {
          // Ensure subjects array exists
          if (!semester.subjects || !Array.isArray(semester.subjects)) {
            semester.subjects = []
          }

          // Calculate subjectsCount and credits if not provided
          if (semester.subjectsCount === undefined) {
            semester.subjectsCount = semester.subjects.length
          }

          if (semester.credits === undefined) {
            semester.credits = semester.subjects.reduce(
              (total: number, subject: any) => total + (subject.credits || 0),
              0,
            )
          }

          return semester
        })

        // Ensure gradientColors exists
        if (!branch.gradientColors || !Array.isArray(branch.gradientColors)) {
          branch.gradientColors = ["#4F46E5", "#7C3AED"]
        }

        return branch
      })

      setData({
        branches: validatedBranches,
        metadata: jsonData.metadata || {
          academicYear: new Date().getFullYear().toString(),
          appName: "Engineering Curriculum",
          updatedAt: new Date().toISOString(),
        },
      })
    } catch (err) {
      console.error("Error loading curriculum data:", err)
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData, retryCount])

  return { data, isLoading, error, retry }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

