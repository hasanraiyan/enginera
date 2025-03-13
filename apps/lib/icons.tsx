import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Cpu,
  Database,
  FileText,
  Globe,
  GraduationCap,
  HardDrive,
  Laptop,
  Layers,
  LayoutGrid,
  Lightbulb,
  Microscope,
  Radio,
  Rocket,
  Server,
  Settings,
  Smartphone,
  Zap,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  award: Award,
  "book-open": BookOpen,
  briefcase: Briefcase,
  calendar: Calendar,
  cpu: Cpu,
  database: Database,
  "file-text": FileText,
  globe: Globe,
  "graduation-cap": GraduationCap,
  "hard-drive": HardDrive,
  laptop: Laptop,
  layers: Layers,
  "layout-grid": LayoutGrid,
  lightbulb: Lightbulb,
  microscope: Microscope,
  radio: Radio,
  rocket: Rocket,
  server: Server,
  settings: Settings,
  smartphone: Smartphone,
  zap: Zap,
}

export function getDynamicIcon(iconName: string): LucideIcon | null {
  return iconMap[iconName] || null
}

