import { getDynamicIcon } from "@/lib/icons"

interface StatCardProps {
  title: string
  value: number
  icon: string
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  const Icon = getDynamicIcon(icon)

  return (
    <div className="bg-card border rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        {Icon && <Icon className="h-6 w-6 text-primary" />}
      </div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  )
}

