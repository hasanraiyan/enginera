export interface CurriculumData {
  branches: Branch[]
  metadata: {
    academicYear: string
    appName: string
    updatedAt: string
  }
}

export interface Branch {
  name: string
  id: string
  icon: string
  color: string
  gradientColors: string[]
  description: string
  semesters: Semester[]
}

export interface Semester {
  id: number
  name: string
  subjectsCount: number
  credits: number
  subjects: Subject[]
}

export interface Subject {
  name: string
  course_code: number
  credits: number
  type: string
  syllabus: {
    courseObjectives: string[]
    learningOutcomes: string[]
    courseContent: string | null
    referenceBooks: string[]
    assessmentMethods: string[]
  }
}

export async function fetchCurriculumData(): Promise<CurriculumData> {
  try {
    const response = await fetch("https://raw.githubusercontent.com/hasanraiyan/beu-data/refs/heads/main/data.json", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch curriculum data: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Validate the data structure
    if (!data || !data.branches || !Array.isArray(data.branches)) {
      console.error("Invalid data structure:", data)
      return getDefaultData()
    }

    // Ensure each branch has the required properties
    const validatedBranches = data.branches.map((branch) => {
      // Ensure semesters array exists
      if (!branch.semesters || !Array.isArray(branch.semesters)) {
        branch.semesters = []
      }

      // Ensure each semester has the required properties
      branch.semesters = branch.semesters.map((semester) => {
        // Ensure subjects array exists
        if (!semester.subjects || !Array.isArray(semester.subjects)) {
          semester.subjects = []
        }

        // Calculate subjectsCount and credits if not provided
        if (semester.subjectsCount === undefined) {
          semester.subjectsCount = semester.subjects.length
        }

        if (semester.credits === undefined) {
          semester.credits = semester.subjects.reduce((total, subject) => total + (subject.credits || 0), 0)
        }

        return semester
      })

      // Ensure gradientColors exists
      if (!branch.gradientColors || !Array.isArray(branch.gradientColors)) {
        branch.gradientColors = ["#4F46E5", "#7C3AED"]
      }

      return branch
    })

    return {
      branches: validatedBranches,
      metadata: data.metadata || {
        academicYear: new Date().getFullYear().toString(),
        appName: "Engineering Curriculum",
        updatedAt: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Error fetching curriculum data:", error)
    return getDefaultData()
  }
}

function getDefaultData(): CurriculumData {
  return {
    branches: [],
    metadata: {
      academicYear: new Date().getFullYear().toString(),
      appName: "Engineering Curriculum",
      updatedAt: new Date().toISOString().split("T")[0],
    },
  }
}

