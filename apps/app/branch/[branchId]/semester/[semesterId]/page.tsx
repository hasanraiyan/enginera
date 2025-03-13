import { BookOpen, Clock, Tag, Download, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchCurriculumData } from "@/lib/data"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumbs"
import SubjectCard from "@/components/subject-card"

interface SemesterPageProps {
  params: {
    branchId: string
    semesterId: string
  }
}

export default async function SemesterPage({ params }: SemesterPageProps) {
  const data = await fetchCurriculumData()
  const branch = data.branches.find((b) => b.id === params.branchId)

  if (!branch) {
    notFound()
  }

  const semester = branch.semesters.find((s) => s.id === Number.parseInt(params.semesterId))

  if (!semester) {
    notFound()
  }

  // Group subjects by type
  const subjectsByType: Record<string, typeof semester.subjects> = {}
  semester.subjects.forEach((subject) => {
    if (!subjectsByType[subject.type]) {
      subjectsByType[subject.type] = []
    }
    subjectsByType[subject.type].push(subject)
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: branch.name, href: `/branch/${branch.id}` },
          { label: semester.name, href: `/branch/${branch.id}/semester/${semester.id}`, active: true },
        ]}
      />

      <div className="bg-card border rounded-xl overflow-hidden shadow-md mb-8">
        <div className="h-2" style={{ backgroundColor: branch.color }}></div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{semester.name}</h1>
              <p className="text-muted-foreground flex flex-wrap items-center gap-2">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {branch.name}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {semester.subjectsCount} Subjects
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {semester.credits} Credits
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{semester.subjectsCount}</p>
              <p className="text-sm text-muted-foreground">Total Subjects</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{semester.credits}</p>
              <p className="text-sm text-muted-foreground">Total Credits</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{Object.keys(subjectsByType).length}</p>
              <p className="text-sm text-muted-foreground">Subject Types</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{Math.round((semester.credits / semester.subjectsCount) * 10) / 10}</p>
              <p className="text-sm text-muted-foreground">Avg. Credits/Subject</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="byType">By Type</TabsTrigger>
          <TabsTrigger value="byCredits">By Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {semester.subjects.map((subject) => (
              <SubjectCard
                key={subject.course_code}
                subject={subject}
                branchId={params.branchId}
                semesterId={params.semesterId}
                branchColor={branch.color}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="byType" className="mt-6">
          <div className="space-y-8">
            {Object.entries(subjectsByType).map(([type, subjects]) => (
              <div key={type}>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-bold">{type}</h2>
                  <Badge variant="outline">{subjects.length} Subjects</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.course_code}
                      subject={subject}
                      branchId={params.branchId}
                      semesterId={params.semesterId}
                      branchColor={branch.color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="byCredits" className="mt-6">
          <div className="space-y-8">
            {[...new Set(semester.subjects.map((s) => s.credits))]
              .sort((a, b) => b - a)
              .map((creditValue) => (
                <div key={creditValue}>
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-bold">{creditValue} Credit Subjects</h2>
                    <Badge variant="outline">
                      {semester.subjects.filter((s) => s.credits === creditValue).length} Subjects
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {semester.subjects
                      .filter((s) => s.credits === creditValue)
                      .map((subject) => (
                        <SubjectCard
                          key={subject.course_code}
                          subject={subject}
                          branchId={params.branchId}
                          semesterId={params.semesterId}
                          branchColor={branch.color}
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 rounded-xl p-6 md:p-8 border">
        <h2 className="text-2xl font-bold mb-4">Semester Overview</h2>
        <p className="text-muted-foreground mb-6">
          This semester covers essential topics in {branch.name} with a focus on both theoretical knowledge and
          practical applications. Students will gain a comprehensive understanding of core concepts and develop skills
          necessary for advanced studies.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Learning Objectives</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Understand fundamental principles and theories</li>
              <li>Develop analytical and problem-solving skills</li>
              <li>Apply theoretical knowledge to practical scenarios</li>
              <li>Build a foundation for advanced studies</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Assessment Methods</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Written examinations</li>
              <li>Laboratory work and practical assessments</li>
              <li>Project work and presentations</li>
              <li>Continuous assessment through assignments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

