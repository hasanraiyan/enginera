import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getDynamicIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"

interface BranchCardProps {
  branch: {
    name: string
    id: string
    icon: string
    color: string
    gradientColors: string[]
    description: string
    semesters: {
      id: number
      name: string
      subjectsCount: number
      credits: number
    }[]
  }
}

export default function BranchCard({ branch }: BranchCardProps) {
  const Icon = getDynamicIcon(branch.icon)
  const totalSubjects = branch.semesters.reduce((acc, semester) => acc + semester.subjectsCount, 0)
  const totalCredits = branch.semesters.reduce((acc, semester) => acc + semester.credits, 0)

  const gradientStyle = {
    background: `linear-gradient(135deg, ${branch.gradientColors.join(", ")})`,
  }

  return (
    <Link
      href={`/branch/${branch.id}`}
      className="block transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
    >
      <Card className="h-full overflow-hidden border-2 hover:border-primary hover:shadow-lg transition-all duration-300 rounded-xl">
        <div className="h-32 relative" style={gradientStyle}>
          <div className="h-full w-full flex items-center justify-center bg-black/10">
            {Icon && <Icon className="h-16 w-16 text-white drop-shadow-md" />}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">{branch.name}</CardTitle>
          <CardDescription className="line-clamp-2 h-10">{branch.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">
              {branch.semesters.length} Semesters
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">
              {totalSubjects} Subjects
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">
              {totalCredits} Credits
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3">
          <Button variant="ghost" className="w-full justify-between group">
            <span>View Branch</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

