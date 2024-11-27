import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, GraduationCap, Clock, Filter } from 'lucide-react';
import { Branch, Subject } from '../types/course';
import { SearchBar } from './SearchBar';
import { BookmarkButton } from './BookmarkButton';
import { useSearch } from '../hooks/useSearch';
import { useBookmarks } from '../hooks/useBookmarks';

interface SubjectListProps {
  branch: Branch;
  onSelectSubject: (subject: Subject) => void;
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

export const SubjectList: React.FC<SubjectListProps> = ({
  branch,
  onSelectSubject,
  onBack,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'core' | 'elective'>('all');
  const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks<Subject>('bookmarked-subjects');

  const filteredSubjects = useSearch(branch.subjects, searchTerm).filter(subject => 
    filter === 'all' || subject.level.toLowerCase() === filter
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto px-4"
    >
      <motion.button
        variants={itemVariants}
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Back to Branches</span>
      </motion.button>

      <div className="text-center mb-12">
        <BookOpen className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
        <h1 className="text-4xl font-bold text-card-foreground mb-4">
          {branch.name} Subjects
        </h1>
        <p className="text-xl text-muted-foreground">
          Explore the subjects offered in this branch
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search subjects..."
        />
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-card rounded-lg p-1 border">
            {(['all', 'core', 'elective'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  filter === type
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredSubjects.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="text-center py-12"
        >
          <p className="text-lg text-muted-foreground">No subjects found matching your criteria.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSubjects.map((subject) => (
            <motion.div
              key={subject.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <BookmarkButton
                  isBookmarked={isBookmarked(subject.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(subject);
                  }}
                />
              </div>
              
              <div
                onClick={() => onSelectSubject(subject)}
                className="bg-card rounded-xl overflow-hidden border hover:border-primary transition-all duration-300 h-full cursor-pointer group"
              >
                <div className="relative h-48">
                  <img
                    src={subject.thumbnail}
                    alt={subject.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 text-white/80 mb-2">
                      <GraduationCap size={16} className="text-primary" />
                      <span className="text-sm font-medium">{subject.level}</span>
                      <span className="text-white/60">•</span>
                      <Clock size={16} className="text-primary" />
                      <span className="text-sm font-medium">{subject.credits} Credits</span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {subject.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground line-clamp-2">
                    {subject.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen size={16} className="text-primary" />
                      <span>{subject.modules.length} Modules</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {subject.code}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};