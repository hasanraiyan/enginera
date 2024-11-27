import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { Semester } from '../types/course';

interface SemesterSelectorProps {
  semesters: Semester[];
  onSelectSemester: (semester: Semester) => void;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const SemesterSelector: React.FC<SemesterSelectorProps> = ({
  semesters,
  onSelectSemester,
  onBack,
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4"
    >
      <motion.button
        variants={itemVariants}
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Years</span>
      </motion.button>

      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="inline-block"
        >
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
        </motion.div>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-card-foreground mb-4"
        >
          Select Semester
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-xl text-muted-foreground"
        >
          Choose a semester to view available courses
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {semesters.map((semester) => (
          <motion.div
            key={semester.id}
            variants={itemVariants}
          >
            <motion.button
              onClick={() => onSelectSemester(semester)}
              className="w-full relative group"
              whileHover="hover"
              initial="initial"
              animate="initial"
            >
              <motion.div 
                className="absolute inset-0 bg-primary/5 rounded-xl"
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: 1 }
                }}
                transition={{ duration: 0.2 }}
              />
              
              <div className="relative bg-card border-2 border-border p-8 rounded-xl transition-all duration-300">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <motion.h2 
                      className="text-2xl font-bold text-card-foreground"
                      variants={{
                        hover: { color: 'hsl(var(--primary))' }
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      Semester {semester.number}
                    </motion.h2>
                    <p className="text-muted-foreground mt-2">
                      {semester.branches.length} Branches Available
                    </p>
                  </div>
                  
                  <motion.div
                    className="text-primary"
                    variants={{
                      initial: { x: 0, opacity: 0.5 },
                      hover: { x: 5, opacity: 1 }
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={24} />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary rounded-full"
                  variants={{
                    initial: { width: 0 },
                    hover: { width: '100%' }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};