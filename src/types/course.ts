export interface Resource {
  type: 'video' | 'pdf' | 'link';
  title: string;
  url: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  resources: Resource[];
}

export interface Subject {
  id: string;
  title: string;
  code: string;
  instructor: string;
  description: string;
  thumbnail: string;
  credits: number;
  level: 'Core' | 'Elective';
  modules: Module[];
  resources: {
    notes: Resource[];
    previousQuestions: Resource[];
    additionalMaterials: Resource[];
  };
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  subjects: Subject[];
}

export interface Semester {
  id: string;
  number: number;
  branches: Branch[];
}

export interface Year {
  id: string;
  number: number;
  semesters: Semester[];
}

// Statistics interface for dashboard
export interface CourseStatistics {
  totalStudents: number;
  totalCourses: number;
  totalInstructors: number;
  averageRating: number;
}

// Course progress tracking
export interface CourseProgress {
  completed: boolean;
  progress: number;
  lastAccessed: Date;
  grade?: number;
}

// Course prerequisites
export interface Prerequisite {
  courseCode: string;
  courseName: string;
  required: boolean;
}

// Course outcomes
export interface LearningOutcome {
  id: string;
  description: string;
  category: 'knowledge' | 'skill' | 'competency';
}

// Assessment structure
export interface Assessment {
  type: 'quiz' | 'assignment' | 'project' | 'exam';
  weight: number;
  deadline?: Date;
  description: string;
}

// Extended subject interface with additional fields
export interface ExtendedSubject extends Subject {
  prerequisites?: Prerequisite[];
  learningOutcomes?: LearningOutcome[];
  assessments?: Assessment[];
  statistics?: {
    enrollmentCount: number;
    averageGrade: number;
    completionRate: number;
  };
}