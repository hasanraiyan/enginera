import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, GraduationCap, Clock, FileText, Video, Link as LinkIcon, Bookmark, Share2 } from 'lucide-react';
import { Subject, Resource } from '../types/course';
import { BookmarkButton } from './BookmarkButton';
import { useBookmarks } from '../hooks/useBookmarks';

interface SubjectDetailsProps {
  subject: Subject;
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

const ResourceLink: React.FC<{ resource: Resource }> = ({ resource }) => {
  const icons = {
    video: Video,
    pdf: FileText,
    link: LinkIcon,
  };
  const Icon = icons[resource.type];

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg bg-card hover:bg-accent transition-colors duration-300 group"
    >
      <span className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon size={18} className="text-primary" />
      </span>
      <span className="text-card-foreground group-hover:text-primary transition-colors duration-300">
        {resource.title}
      </span>
    </a>
  );
};

export const SubjectDetails: React.FC<SubjectDetailsProps> = ({
  subject,
  onBack,
}) => {
  const [selectedModule, setSelectedModule] = useState(subject.modules[0]?.id);
  const { isBookmarked, toggleBookmark } = useBookmarks<Subject>('bookmarked-subjects');
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: subject.title,
        text: subject.description,
        url: window.location.href,
      });
    } catch (error) {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

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
        <span>Back to Subjects</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-card rounded-xl overflow-hidden border">
            <div className="relative h-64">
              <img
                src={subject.thumbnail}
                alt={subject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors duration-300"
                  >
                    <Share2 className="h-5 w-5 text-white" />
                  </motion.button>
                  {showShareTooltip && (
                    <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-black/90 text-white text-sm rounded">
                      URL copied!
                    </div>
                  )}
                </div>
                <BookmarkButton
                  isBookmarked={isBookmarked(subject.id)}
                  onClick={() => toggleBookmark(subject)}
                  className="bg-black/20 backdrop-blur-sm hover:bg-black/40"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 text-white/80 mb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-primary" />
                    <span>{subject.level}</span>
                  </div>
                  <span className="text-white/60">•</span>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    <span>{subject.credits} Credits</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white">{subject.title}</h1>
                <p className="text-white/80 mt-2">{subject.code}</p>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Course Description</h2>
                <p className="text-muted-foreground leading-relaxed">{subject.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Course Modules</h2>
                <div className="space-y-4">
                  {subject.modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => setSelectedModule(module.id)}
                      className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-300 ${
                        selectedModule === module.id
                          ? 'bg-accent border-primary'
                          : 'bg-card hover:bg-accent/50 border-border'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-card-foreground">
                          {module.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                      </div>
                      <p className="text-muted-foreground">{module.description}</p>
                      {selectedModule === module.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4"
                        >
                          <h4 className="font-medium text-card-foreground mb-2">Topics covered:</h4>
                          <ul className="space-y-2">
                            {module.topics.map((topic, index) => (
                              <li key={index} className="flex items-center gap-2 text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="bg-card rounded-xl border p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Course Resources</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Lecture Notes
                </h3>
                <div className="space-y-2">
                  {subject.resources.notes.map((resource, index) => (
                    <ResourceLink key={index} resource={resource} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Previous Questions
                </h3>
                <div className="space-y-2">
                  {subject.resources.previousQuestions.map((resource, index) => (
                    <ResourceLink key={index} resource={resource} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Additional Materials
                </h3>
                <div className="space-y-2">
                  {subject.resources.additionalMaterials.map((resource, index) => (
                    <ResourceLink key={index} resource={resource} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};