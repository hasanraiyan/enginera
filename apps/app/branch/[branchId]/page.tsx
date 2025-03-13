import type React from "react"
import Link from "next/link"
import { BookOpen, GraduationCap, Clock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchCurriculumData } from "@/lib/data"
import { getDynamicIcon } from "@/lib/icons"
import { notFound } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumbs"
import EmptyState from "@/components/empty-state"

interface BranchPageProps {
  params: {
    branchId: string
  }
}

export default async function BranchPage({ params }: BranchPageProps) {
  const data = await fetchCurriculumData()
  const branch = data.branches.find((b) => b.id === params.branchId)

  if (!branch) {
    notFound()
  }

  const Icon = getDynamicIcon(branch.icon)

  const gradientStyle = {
    background: `linear-gradient(135deg, ${branch.gradientColors.join(", ")})`,
  }

  const hasSemesters = branch.semesters && branch.semesters.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: branch.name, href: `/branch/${branch.id}`, active: true },
        ]}
      />

      <div className="rounded-xl overflow-hidden mb-8 shadow-lg">
        <div className="h-48 md:h-64 relative" style={gradientStyle}>
          <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white">
            {Icon && <Icon className="h-20 w-20 mb-4 drop-shadow-lg" />}
            <h1 className="text-3xl md:text-4xl font-bold text-center drop-shadow-md">{branch.name}</h1>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="bg-card p-6 md:p-8 border-x border-b rounded-b-xl">
          <p className="text-lg text-muted-foreground mb-6">{branch.description}</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-3xl font-bold">{branch.semesters.length}</p>
              <p className="text-sm text-muted-foreground">Semesters</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-3xl font-bold">{branch.semesters.reduce((acc, sem) => acc + sem.subjectsCount, 0)}</p>
              <p className="text-sm text-muted-foreground">Subjects</p>
            </div>
            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-3xl font-bold">{branch.semesters.reduce((acc, sem) => acc + sem.credits, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Credits</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="semesters" className="mb-8">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
          <TabsTrigger value="semesters">Semesters</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="semesters" className="mt-6">
          {hasSemesters ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branch.semesters.map((semester) => (
                <Link
                  key={semester.id}
                  href={`/branch/${branch.id}/semester/${semester.id}`}
                  className="block transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                >
                  <Card className="h-full hover:border-primary hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden">
                    <div className="h-2" style={{ backgroundColor: branch.color }}></div>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                        {semester.name}
                      </CardTitle>
                      <CardDescription>
                        {semester.subjectsCount} Subjects • {semester.credits} Credits
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{semester.subjectsCount} Subjects</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{semester.credits} Credits</span>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-2 group">
                        View Subjects
                        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<AlertTriangle className="h-8 w-8 text-muted-foreground" />}
              title="No Semesters Available"
              description={`There are currently no semesters available for ${branch.name}.`}
              actionLabel="Return to Home"
              actionHref="/"
              className="max-w-md mx-auto"
            />
          )}
        </TabsContent>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Branch Overview</CardTitle>
              <CardDescription>Key information about {branch.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{branch.description}</p>

              {hasSemesters ? (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Semester Structure</h3>
                  <div className="space-y-3">
                    {branch.semesters.map((semester) => (
                      <div key={semester.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div className="font-medium">{semester.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {semester.subjectsCount} Subjects • {semester.credits} Credits
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground">No semester structure available for this branch.</p>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Career Opportunities</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Research and Development</li>
                  <li>Product Design and Development</li>
                  <li>Technical Consulting</li>
                  <li>Project Management</li>
                  <li>Quality Assurance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Learning Resources</CardTitle>
              <CardDescription>Additional materials to support your studies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Textbooks & References</h4>
                    <p className="text-sm text-muted-foreground">Recommended reading materials for all courses</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    View
                  </Button>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <FileIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Past Papers</h4>
                    <p className="text-sm text-muted-foreground">Previous examination papers for practice</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    View
                  </Button>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <VideoIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Video Lectures</h4>
                    <p className="text-sm text-muted-foreground">Recorded lectures and tutorials</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-muted/30 rounded-xl p-6 md:p-8 border">
        <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
        <p className="text-muted-foreground mb-4">
          If you have questions about the curriculum or need assistance, our academic advisors are here to help.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Contact Advisor</Button>
          <Button variant="outline">Download Curriculum</Button>
        </div>
      </div>
    </div>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  )
}

