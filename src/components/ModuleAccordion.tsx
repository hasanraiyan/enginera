import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Video, FileText, Link as LinkIcon } from 'lucide-react';
import { Module } from '../types/course';

interface ModuleAccordionProps {
  module: Module;
  isOpen: boolean;
  onToggle: () => void;
}

const contentVariants = {
  hidden: { 
    height: 0,
    opacity: 0,
    transition: { 
      height: { duration: 0.3 },
      opacity: { duration: 0.2 }
    }
  },
  visible: { 
    height: "auto",
    opacity: 1,
    transition: { 
      height: { duration: 0.3 },
      opacity: { duration: 0.3, delay: 0.1 }
    }
  }
};

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({
  module,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border rounded-xl overflow-hidden bg-card transition-colors duration-300 hover:border-primary/50">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-accent/50 transition-colors duration-300"
      >
        <div className="flex-1 text-left">
          <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
            {module.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{module.duration}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="ml-4 text-muted-foreground"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div className="px-6 py-5 bg-accent/50 space-y-6">
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {module.description}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-card-foreground">Topics covered:</h4>
                <ul className="grid gap-2">
                  {module.topics.map((topic, index) => (
                    <li 
                      key={index} 
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              {module.resources.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-card-foreground">Resources:</h4>
                  <div className="grid gap-3">
                    {module.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 group"
                      >
                        <span className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                          {resource.type === 'video' && <Video size={16} />}
                          {resource.type === 'pdf' && <FileText size={16} />}
                          {resource.type === 'link' && <LinkIcon size={16} />}
                        </span>
                        <span className="font-medium">{resource.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};