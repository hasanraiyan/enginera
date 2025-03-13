"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  BookOpen,
  Clock,
  Tag,
  Share2,
  Bookmark,
  BookmarkCheck,
  Printer,
  FileText,
  GraduationCap,
  Book,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useCurriculumData } from "@/lib/hooks"
import { notFound } from "next/navigation"
import MarkdownRenderer from "@/components/markdown-renderer"
import Breadcrumbs from "@/components/breadcrumbs"

interface SubjectPageProps {
  params: {
    branchId: string
    semesterId: string
    subjectCode: string
  }
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const { data, isLoading, error } = useCurriculumData()
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      setProgress(100)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Progress value={progress} className="w-full max-w-md" />
          <p className="mt-4 text-muted-foreground">Loading subject information...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 text-center">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-muted-foreground mb-4">
            We couldn't load the subject information. Please try again later.
          </p>
          <Button variant="outline">Retry</Button>
        </div>
      </div>
    )
  }

  const branch = data.branches.find((b) => b.id === params.branchId)
  if (!branch) notFound()

  const semester = branch.semesters.find((s) => s.id === Number.parseInt(params.semesterId))
  if (!semester) notFound()

  const subject = semester.subjects.find((s) => s.course_code.toString() === params.subjectCode)
  if (!subject) notFound()

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: branch.name, href: `/branch/${branch.id}` },
          { label: semester.name, href: `/branch/${branch.id}/semester/${semester.id}` },
          {
            label: subject.name,
            href: `/branch/${branch.id}/semester/${semester.id}/subject/${subject.course_code}`,
            active: true,
          },
        ]}
      />

      <div className="bg-card border rounded-xl overflow-hidden shadow-md mb-8">
        <div className="h-2" style={{ backgroundColor: branch.color }}></div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{subject.name}</h1>
                <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                  {subject.credits} Credits
                </Badge>
              </div>
              <p className="text-muted-foreground flex flex-wrap items-center gap-2">
                <span className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Course Code: {subject.course_code}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {branch.name}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {semester.name}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleBookmark}>
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="h-4 w-4" />
                    <span>Bookmarked</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    <span>Bookmark</span>
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>

          <Badge variant="outline" className="mb-4">
            {subject.type}
          </Badge>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-muted/40">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Objectives</p>
                  <p className="font-medium">{subject.syllabus.courseObjectives.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/40">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Learning Outcomes</p>
                  <p className="font-medium">{subject.syllabus.learningOutcomes.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/40">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Book className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reference Books</p>
                  <p className="font-medium">{subject.syllabus.referenceBooks.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Subject Overview
              </CardTitle>
              <CardDescription>Key information about {subject.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Course Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Course Code</span>
                      <span>{subject.course_code}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Credits</span>
                      <span>{subject.credits}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Type</span>
                      <span>{subject.type}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Branch</span>
                      <span>{branch.name}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Semester</span>
                      <span>{semester.name}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-3">Assessment Methods</h3>
                  <ul className="space-y-2">
                    {subject.syllabus.assessmentMethods.map((method, index) => (
                      <li key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-lg mb-3">Course Summary</h3>
                <p className="text-muted-foreground">
                  This course provides students with a comprehensive understanding of {subject.name.toLowerCase()}.
                  Students will learn theoretical concepts and practical applications through lectures, laboratory work,
                  and assignments. The course is designed to develop critical thinking and problem-solving skills in the
                  field.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Students should have completed basic courses in the field and have a fundamental understanding of core
                  concepts before enrolling in this course.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Teaching Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Lectures and presentations</li>
                  <li>Laboratory work and practical sessions</li>
                  <li>Group discussions and case studies</li>
                  <li>Individual and group assignments</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Course Objectives
              </CardTitle>
              <CardDescription>What this course aims to achieve</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {subject.syllabus.courseObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-muted">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <div>{objective}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Learning Outcomes
              </CardTitle>
              <CardDescription>What you'll learn from this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {subject.syllabus.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border border-muted">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10">
                        Outcome {index + 1}
                      </Badge>
                    </div>
                    <p>{outcome}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Course Content
              </CardTitle>
              <CardDescription>Detailed syllabus content</CardDescription>
            </CardHeader>
            <CardContent>
              {subject.syllabus.courseContent ? (
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <MarkdownRenderer content={subject.syllabus.courseContent} />
                </div>
              ) : (
                <div className="p-6 text-center bg-muted/30 rounded-lg border border-dashed">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground italic">No detailed content available for this course.</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    Request Content Update
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="references" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Reference Books
              </CardTitle>
              <CardDescription>Recommended reading materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {subject.syllabus.referenceBooks.map((book, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border border-muted">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p>{book}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Find Online
                        </Button>
                        <Button variant="ghost" size="sm">
                          Add to Reading List
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Note: Additional reading materials may be recommended during the course.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-muted/30 rounded-xl p-6 md:p-8 border">
        <h2 className="text-2xl font-bold mb-4">Related Subjects</h2>
        <p className="text-muted-foreground mb-6">
          Explore other subjects related to {subject.name} in the curriculum.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {semester.subjects
            .filter((s) => s.course_code !== subject.course_code)
            .slice(0, 3)
            .map((relatedSubject) => (
              <Link
                key={relatedSubject.course_code}
                href={`/branch/${params.branchId}/semester/${params.semesterId}/subject/${relatedSubject.course_code}`}
                className="block p-4 bg-card rounded-lg border hover:border-primary hover:shadow-sm transition-all"
              >
                <h3 className="font-medium mb-1 line-clamp-1">{relatedSubject.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {relatedSubject.credits} Credits
                  </Badge>
                  <span>•</span>
                  <span>{relatedSubject.type}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

