import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, BookOpen, GraduationCap } from 'lucide-react';
import { Course } from '../types/course';
import { ModuleAccordion } from './ModuleAccordion';

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -20 }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onBack }) => {
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-4xl mx-auto"
    >
      <motion.button
        variants={itemVariants}
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Courses</span>
      </motion.button>

      <motion.div 
        variants={itemVariants}
        className="bg-card rounded-xl shadow-lg overflow-hidden mb-12 border"
      >
        <div className="relative h-72">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white space-y-4"
            >
              <div className="flex items-center gap-2 text-primary">
                <GraduationCap size={24} />
                <span className="text-sm font-medium uppercase tracking-wider">
                  {course.level} Level
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <div className="flex items-center gap-6 text-gray-200">
                <div className="flex items-center gap-2">
                  <User size={20} />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={20} />
                  <span>{course.modules.length} modules</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="p-8 lg:p-12">
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-card-foreground mb-4">Course Overview</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {course.description}
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-card-foreground mb-6">Course Modules</h2>
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <ModuleAccordion
                    module={module}
                    isOpen={openModuleId === module.id}
                    onToggle={() => setOpenModuleId(openModuleId === module.id ? null : module.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};