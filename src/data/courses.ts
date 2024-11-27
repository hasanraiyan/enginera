import { Course } from '../types/course';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Chemistry',
    instructor: 'Dr. Rajesh Kumar',
    description: 'Comprehensive chemistry course covering atomic structure, spectroscopy, intermolecular forces, and organic chemistry for engineering students.',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
    duration: '15 weeks',
    level: 'Intermediate',
    modules: [
      {
        id: 'm1',
        title: 'Atomic and Molecular Structure',
        description: 'Understanding the fundamentals of atomic structure and molecular formation',
        duration: '10 Lectures',
        topics: [
          'Failure of classical mechanics',
          'Electromagnetic radiation',
          'Planks theory and photoelectric effect',
          'Atomic and molecular orbitals',
          'Crystal field theory'
        ],
        resources: [
          {
            type: 'pdf',
            title: 'Atomic Structure Notes',
            url: '#'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Spectroscopic Techniques',
        description: 'Study of various spectroscopic methods and their applications',
        duration: '8 Lectures',
        topics: [
          'Vibrational and rotational spectroscopy',
          'UV-Vis spectroscopy',
          'Fluorescence applications',
          'Nuclear magnetic resonance'
        ],
        resources: [
          {
            type: 'video',
            title: 'Spectroscopy Fundamentals',
            url: '#'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Mathematics-II (Probability and Statistics)',
    instructor: 'Prof. Sarah Wilson',
    description: 'Advanced mathematics course focusing on probability theory, statistics, and their applications in engineering.',
    thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d',
    duration: '16 weeks',
    level: 'Advanced',
    modules: [
      {
        id: 'm1',
        title: 'Basic Probability',
        description: 'Fundamental concepts of probability theory',
        duration: '12 Lectures',
        topics: [
          'Probability spaces',
          'Conditional probability',
          'Discrete random variables',
          'Multinomial distribution',
          'Chebyshev Inequality'
        ],
        resources: [
          {
            type: 'pdf',
            title: 'Probability Theory Notes',
            url: '#'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Applied Statistics',
        description: 'Practical applications of statistical methods',
        duration: '8 Lectures',
        topics: [
          'Curve fitting',
          'Method of least squares',
          'Test of significance',
          'Sample testing'
        ],
        resources: [
          {
            type: 'video',
            title: 'Statistical Analysis Methods',
            url: '#'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Programming for Problem Solving',
    instructor: 'Dr. Michael Chen',
    description: 'Introduction to programming concepts and problem-solving techniques using C programming language.',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    duration: '14 weeks',
    level: 'Beginner',
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Programming',
        description: 'Basic concepts of computer programming',
        duration: '6 Lectures',
        topics: [
          'Components of computer system',
          'Algorithm and flowcharts',
          'Variables and data types',
          'Storage classes',
          'Compilation process'
        ],
        resources: [
          {
            type: 'video',
            title: 'Programming Basics',
            url: '#'
          }
        ]
      },
      {
        id: 'm2',
        title: 'Control Structures and Arrays',
        description: 'Programming constructs for control flow',
        duration: '9 Lectures',
        topics: [
          'Conditional statements',
          'Loops and iterations',
          'Array operations',
          'String handling'
        ],
        resources: [
          {
            type: 'pdf',
            title: 'Control Structures Guide',
            url: '#'
          }
        ]
      }
    ]
  }
];