"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, BookOpen, GraduationCap, Layers } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useCurriculumData } from "@/lib/hooks"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<any>({
    branches: [],
    semesters: [],
    subjects: [],
  })
  const [activeTab, setActiveTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [progress, setProgress] = useState(0)

  const { data, isLoading } = useCurriculumData()

  useEffect(() => {
    if (initialQuery && data) {
      performSearch(initialQuery)
    }
  }, [initialQuery, data])

  useEffect(() => {
    if (isSearching) {
      const timer = setTimeout(() => {
        setProgress(100)
        setIsSearching(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isSearching])

  const performSearch = (searchTerm: string) => {
    if (!data || !searchTerm.trim()) return

    setIsSearching(true)
    setProgress(30)

    const term = searchTerm.toLowerCase().trim()

    // Search branches
    const branches = data.branches.filter(
      (branch) => branch.name.toLowerCase().includes(term) || branch.description.toLowerCase().includes(term),
    )

    // Search semesters
    const semesters: any[] = []
    data.branches.forEach((branch) => {
      branch.semesters.forEach((semester) => {
        if (semester.name.toLowerCase().includes(term)) {
          semesters.push({
            ...semester,
            branchId: branch.id,
            branchName: branch.name,
          })
        }
      })
    })

    // Search subjects
    const subjects: any[] = []
    data.branches.forEach((branch) => {
      branch.semesters.forEach((semester) => {
        semester.subjects.forEach((subject) => {
          if (
            subject.name.toLowerCase().includes(term) ||
            subject.type.toLowerCase().includes(term) ||
            subject.course_code.toString().includes(term) ||
            subject.syllabus.courseObjectives.some((obj) => obj.toLowerCase().includes(term)) ||
            subject.syllabus.learningOutcomes.some((outcome) => outcome.toLowerCase().includes(term)) ||
            (subject.syllabus.courseContent && subject.syllabus.courseContent.toLowerCase().includes(term))
          ) {
            subjects.push({
              ...subject,
              branchId: branch.id,
              branchName: branch.name,
              semesterId: semester.id,
              semesterName: semester.name,
            })
          }
        })
      })
    })

    setProgress(70)

    setSearchResults({
      branches,
      semesters,
      subjects,
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  const getTotalResults = () => {
    return searchResults.branches.length + searchResults.semesters.length + searchResults.subjects.length
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Progress value={progress} className="w-full max-w-md" />
          <p className="mt-4 text-muted-foreground">Loading curriculum data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search branches, subjects, or topics..."
                className="pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>

        {isSearching ? (
          <div className="text-center py-8">
            <Progress value={progress} className="max-w-md mx-auto mb-4" />
            <p className="text-muted-foreground">Searching curriculum data...</p>
          </div>
        ) : initialQuery ? (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                Found {getTotalResults()} results for "{initialQuery}"
              </p>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Results ({getTotalResults()})</TabsTrigger>
                <TabsTrigger value="branches">Branches ({searchResults.branches.length})</TabsTrigger>
                <TabsTrigger value="semesters">Semesters ({searchResults.semesters.length})</TabsTrigger>
                <TabsTrigger value="subjects">Subjects ({searchResults.subjects.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6 space-y-8">
                {searchResults.branches.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Layers className="h-5 w-5 text-primary" />
                      Branches
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.branches.map((branch: any) => (
                        <Link
                          key={branch.id}
                          href={`/branch/${branch.id}`}
                          className="block transition-all hover:scale-[1.01]"
                        >
                          <Card className="hover:border-primary hover:shadow-sm transition-all">
                            <CardHeader className="pb-2">
                              <CardTitle>{branch.name}</CardTitle>
                              <CardDescription className="line-clamp-2">{branch.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex gap-2">
                                <Badge variant="outline">{branch.semesters.length} Semesters</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.semesters.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Semesters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.semesters.map((semester: any) => (
                        <Link
                          key={`${semester.branchId}-${semester.id}`}
                          href={`/branch/${semester.branchId}/semester/${semester.id}`}
                          className="block transition-all hover:scale-[1.01]"
                        >
                          <Card className="hover:border-primary hover:shadow-sm transition-all">
                            <CardHeader className="pb-2">
                              <CardTitle>{semester.name}</CardTitle>
                              <CardDescription>{semester.branchName}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex gap-2">
                                <Badge variant="outline">{semester.subjectsCount} Subjects</Badge>
                                <Badge variant="outline">{semester.credits} Credits</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.subjects.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Subjects
                    </h2>
                    <div className="space-y-4">
                      {searchResults.subjects.map((subject: any) => (
                        <Link
                          key={`${subject.branchId}-${subject.semesterId}-${subject.course_code}`}
                          href={`/branch/${subject.branchId}/semester/${subject.semesterId}/subject/${subject.course_code}`}
                          className="block transition-all hover:scale-[1.01]"
                        >
                          <Card className="hover:border-primary hover:shadow-sm transition-all">
                            <CardHeader className="pb-2">
                              <CardTitle>{subject.name}</CardTitle>
                              <CardDescription>
                                {subject.branchName} • {subject.semesterName} • Course Code: {subject.course_code}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge>{subject.credits} Credits</Badge>
                                <Badge variant="outline">{subject.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {subject.syllabus.courseObjectives[0]}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {getTotalResults() === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-xl font-bold mb-2">No results found</h2>
                    <p className="text-muted-foreground mb-6">
                      We couldn't find any matches for "{initialQuery}". Try different keywords or browse the
                      curriculum.
                    </p>
                    <Button asChild>
                      <Link href="/">Browse All Branches</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="branches" className="mt-6">
                {searchResults.branches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.branches.map((branch: any) => (
                      <Link
                        key={branch.id}
                        href={`/branch/${branch.id}`}
                        className="block transition-all hover:scale-[1.01]"
                      >
                        <Card className="hover:border-primary hover:shadow-sm transition-all">
                          <CardHeader>
                            <CardTitle>{branch.name}</CardTitle>
                            <CardDescription>{branch.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-2">
                              <Badge variant="outline">{branch.semesters.length} Semesters</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No branches found matching "{initialQuery}"</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="semesters" className="mt-6">
                {searchResults.semesters.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.semesters.map((semester: any) => (
                      <Link
                        key={`${semester.branchId}-${semester.id}`}
                        href={`/branch/${semester.branchId}/semester/${semester.id}`}
                        className="block transition-all hover:scale-[1.01]"
                      >
                        <Card className="hover:border-primary hover:shadow-sm transition-all">
                          <CardHeader>
                            <CardTitle>{semester.name}</CardTitle>
                            <CardDescription>{semester.branchName}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-2">
                              <Badge variant="outline">{semester.subjectsCount} Subjects</Badge>
                              <Badge variant="outline">{semester.credits} Credits</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No semesters found matching "{initialQuery}"</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="subjects" className="mt-6">
                {searchResults.subjects.length > 0 ? (
                  <div className="space-y-4">
                    {searchResults.subjects.map((subject: any) => (
                      <Link
                        key={`${subject.branchId}-${subject.semesterId}-${subject.course_code}`}
                        href={`/branch/${subject.branchId}/semester/${subject.semesterId}/subject/${subject.course_code}`}
                        className="block transition-all hover:scale-[1.01]"
                      >
                        <Card className="hover:border-primary hover:shadow-sm transition-all">
                          <CardHeader>
                            <CardTitle>{subject.name}</CardTitle>
                            <CardDescription>
                              {subject.branchName} • {subject.semesterName} • Course Code: {subject.course_code}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge>{subject.credits} Credits</Badge>
                              <Badge variant="outline">{subject.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{subject.syllabus.courseObjectives[0]}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No subjects found matching "{initialQuery}"</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg border">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Search the Curriculum</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Enter keywords to search for branches, semesters, subjects, or specific topics in the curriculum.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

