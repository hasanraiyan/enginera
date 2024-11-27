import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, User } from 'lucide-react';
import { Course } from '../types/course';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <motion.div
      className="group bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer border hover:shadow-xl transition-all duration-300 h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
          {course.level}
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {course.title}
        </h3>
        <p className="text-muted-foreground mb-6 line-clamp-2 flex-1">
          {course.description}
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span className="text-sm">{course.instructor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <span className="text-sm">{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-primary" />
            <span className="text-sm">{course.modules.length} modules</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};