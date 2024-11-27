import { Year } from '../types/course';

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Generate a range of years
const generateYears = (startYear: number, numYears: number): Year[] => {
  return Array.from({ length: numYears }, (_, i) => ({
    id: `year-${i + 1}`,
    number: i + 1,
    semesters: generateSemesters(i + 1)
  }));
};

// Generate semesters for each year
const generateSemesters = (year: number) => {
  const semestersPerYear = 2;
  return Array.from({ length: semestersPerYear }, (_, i) => ({
    id: `sem-${year}-${i + 1}`,
    number: i + 1,
    branches: generateBranches(year, i + 1)
  }));
};

// Generate branches with their respective subjects
const generateBranches = (year: number, semester: number) => {
  const branches = [
    {
      id: 'cse',
      name: 'Computer Science and Engineering',
      code: 'CSE',
      subjects: []
    },
    {
      id: 'it',
      name: 'Information Technology',
      code: 'IT',
      subjects: []
    },
    {
      id: 'ece',
      name: 'Electronics and Communication',
      code: 'ECE',
      subjects: []
    },
    {
      id: 'ee',
      name: 'Electrical Engineering',
      code: 'EE',
      subjects: []
    },
    {
      id: 'me',
      name: 'Mechanical Engineering',
      code: 'ME',
      subjects: []
    }
  ];

  return branches.map(branch => ({
    ...branch,
    subjects: generateSubjects(year, semester, branch.code)
  }));
};

// Generate subjects for each branch
const generateSubjects = (year: number, semester: number, branchCode: string) => {
  const subjectsData = {
    CSE: [
      {
        title: 'Data Structures and Algorithms',
        description: 'Comprehensive study of fundamental data structures and algorithmic principles',
        thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=2000&q=80',
        credits: 4
      },
      {
        title: 'Database Management Systems',
        description: 'Design and implementation of database systems and applications',
        thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=2000&q=80',
        credits: 3
      }
    ],
    IT: [
      {
        title: 'Web Technologies',
        description: 'Modern web development technologies and frameworks',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=2000&q=80',
        credits: 4
      },
      {
        title: 'Cloud Computing',
        description: 'Fundamentals of cloud architecture and services',
        thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=2000&q=80',
        credits: 3
      }
    ],
    ECE: [
      {
        title: 'Digital Signal Processing',
        description: 'Analysis and processing of discrete-time signals',
        thumbnail: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=2000&q=80',
        credits: 4
      },
      {
        title: 'Microprocessors and Microcontrollers',
        description: 'Architecture and programming of microprocessors',
        thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=2000&q=80',
        credits: 3
      }
    ],
    EE: [
      {
        title: 'Power Systems',
        description: 'Analysis and operation of electrical power systems',
        thumbnail: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=2000&q=80',
        credits: 4
      },
      {
        title: 'Control Systems',
        description: 'Principles of control theory and system design',
        thumbnail: 'https://images.unsplash.com/photo-1581093458791-9d58e59c3e3d?auto=format&fit=crop&w=2000&q=80',
        credits: 3
      }
    ],
    ME: [
      {
        title: 'Thermodynamics',
        description: 'Principles of energy and heat transfer',
        thumbnail: 'https://images.unsplash.com/photo-1565138146061-e29b079736c0?auto=format&fit=crop&w=2000&q=80',
        credits: 4
      },
      {
        title: 'Machine Design',
        description: 'Design principles of mechanical systems',
        thumbnail: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=2000&q=80',
        credits: 3
      }
    ]
  };

  const generateModules = (title: string) => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: generateId(),
      title: `Module ${i + 1}: ${title} - Part ${i + 1}`,
      description: `Comprehensive coverage of ${title} concepts and applications - Part ${i + 1}`,
      duration: `${Math.floor(Math.random() * 5 + 3)} Lectures`,
      topics: Array.from({ length: 4 }, (_, j) => `Topic ${j + 1}: Advanced Concept ${j + 1}`),
      resources: [
        {
          type: 'video' as const,
          title: `${title} - Video Lecture ${i + 1}`,
          url: '#'
        },
        {
          type: 'pdf' as const,
          title: `${title} - Notes ${i + 1}`,
          url: '#'
        }
      ]
    }));
  };

  const generateResources = (title: string) => ({
    notes: Array.from({ length: 3 }, (_, i) => ({
      type: 'pdf' as const,
      title: `${title} - Complete Notes Part ${i + 1}`,
      url: '#'
    })),
    previousQuestions: Array.from({ length: 3 }, (_, i) => ({
      type: 'pdf' as const,
      title: `${title} - Previous Year Questions ${2023 - i}`,
      url: '#'
    })),
    additionalMaterials: Array.from({ length: 3 }, (_, i) => ({
      type: 'link' as const,
      title: `${title} - Additional Resource ${i + 1}`,
      url: '#'
    }))
  });

  return (subjectsData[branchCode as keyof typeof subjectsData] || []).map(subject => ({
    id: generateId(),
    ...subject,
    code: `${branchCode}${year}${semester}${generateId().substring(0, 2)}`,
    instructor: `Dr. ${['John Smith', 'Sarah Wilson', 'Michael Chen', 'Emily Brown'][Math.floor(Math.random() * 4)]}`,
    level: Math.random() > 0.3 ? 'Core' : 'Elective' as const,
    modules: generateModules(subject.title),
    resources: generateResources(subject.title)
  }));
};

// Generate the complete academic structure
export const academicYears = generateYears(1, 4);