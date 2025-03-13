import type React from "react"
import { ArrowRight, AlertTriangle } from "lucide-react"
import BranchCard from "@/components/branch-card"
import { fetchCurriculumData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchBar from "@/components/search-bar"
import StatCard from "@/components/stat-card"
import EmptyState from "@/components/empty-state"

export default async function Home() {
  const data = await fetchCurriculumData()

  // Calculate total stats
  const totalBranches = data.branches.length
  const totalSemesters = data.branches.reduce((acc, branch) => acc + branch.semesters.length, 0)
  const totalSubjects = data.branches.reduce(
    (acc, branch) => acc + branch.semesters.reduce((semAcc, sem) => semAcc + sem.subjectsCount, 0),
    0,
  )
  const totalCredits = data.branches.reduce(
    (acc, branch) => acc + branch.semesters.reduce((semAcc, sem) => semAcc + sem.credits, 0),
    0,
  )

  const hasBranches = data.branches.length > 0

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-16 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Engineering Curriculum
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore the complete syllabus for various engineering branches. Academic Year:{" "}
              {data.metadata.academicYear}
            </p>
            <SearchBar className="max-w-xl mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <StatCard title="Branches" value={totalBranches} icon="Briefcase" />
            <StatCard title="Semesters" value={totalSemesters} icon="Calendar" />
            <StatCard title="Subjects" value={totalSubjects} icon="BookOpen" />
            <StatCard title="Credits" value={totalCredits} icon="Award" />
          </div>
        </div>

        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-gray-950 dark:[background:radial-gradient(#1f2937_1px,transparent_1px)]"></div>
      </section>

      {/* Branches Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Engineering Branches</h2>
              <p className="text-muted-foreground">Select a branch to explore its curriculum</p>
            </div>
            {hasBranches && (
              <div className="mt-4 md:mt-0">
                <Button variant="outline" className="group">
                  View All Branches
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>

          {hasBranches ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {data.branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          ) : (
            <div className="py-8">
              <EmptyState
                icon={<AlertTriangle className="h-8 w-8 text-muted-foreground" />}
                title="No Branches Available"
                description="There are currently no engineering branches available in the system."
                actionLabel="Refresh Data"
                actionHref="/"
                className="max-w-md mx-auto"
              />
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Explore the Curriculum</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our platform provides comprehensive access to engineering curriculum with powerful features
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Detailed Syllabi"
              description="Access comprehensive course content, objectives, and learning outcomes"
              icon="FileText"
            />
            <FeatureCard
              title="Track Progress"
              description="Mark subjects as completed and track your academic journey"
              icon="CheckCircle"
            />
            <FeatureCard
              title="Export & Share"
              description="Download syllabi as PDF or share with classmates"
              icon="Share2"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card border rounded-xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  Stay Updated with Curriculum Changes
                </h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to receive notifications about curriculum updates, new courses, and academic announcements.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input placeholder="Enter your email" className="sm:max-w-xs" />
                  <Button>Subscribe</Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-primary/40 p-10 hidden md:flex items-center justify-center">
                <div className="w-full h-full bg-white/10 rounded-lg border border-white/20 backdrop-blur-sm flex items-center justify-center">
                  <NotificationIcon className="h-24 w-24 text-primary/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>Last updated: {new Date(data.metadata.updatedAt).toLocaleDateString()}</p>
        <p className="mt-1">{data.metadata.appName}</p>
      </div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  const Icon = getIconByName(icon)

  return (
    <div className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
        {Icon && <Icon className="h-6 w-6 text-primary" />}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function NotificationIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function getIconByName(name: string) {
  const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    FileText: (props) => (
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
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
      </svg>
    ),
    CheckCircle: (props) => (
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
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    Share2: (props) => (
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
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
      </svg>
    ),
  }

  return icons[name]
}

