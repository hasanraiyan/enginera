"use client"

import type React from "react"

import Link from "next/link"
import { BookOpen, FileText, GraduationCap, Star, StarOff } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface SubjectCardProps {
  subject: {
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
  branchId: string
  semesterId: string
  branchColor: string
}

export default function SubjectCard({ subject, branchId, semesterId, branchColor }: SubjectCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link
      href={`/branch/${branchId}/semester/${semesterId}/subject/${subject.course_code}`}
      className="block transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
    >
      <Card className="h-full hover:border-primary hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
        <div className="h-1" style={{ backgroundColor: branchColor }}></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl line-clamp-1">{subject.name}</CardTitle>
              <CardDescription>Course Code: {subject.course_code}</CardDescription>
            </div>
            <button
              onClick={toggleFavorite}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <Star className="h-5 w-5 fill-primary text-primary" /> : <StarOff className="h-5 w-5" />}
            </button>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">
              {subject.credits} Credits
            </Badge>
            <Badge variant="outline">{subject.type}</Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <FileText className="h-4 w-4 mr-1" />
              <span>{subject.syllabus.courseObjectives.length} Objectives</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <GraduationCap className="h-4 w-4 mr-1" />
              <span>{subject.syllabus.learningOutcomes.length} Outcomes</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{subject.syllabus.referenceBooks.length} Books</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="ghost" className="w-full justify-between group">
            <span>View Syllabus</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

