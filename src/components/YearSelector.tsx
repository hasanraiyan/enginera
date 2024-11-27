import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, Users } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Year } from '../types/course';

interface YearSelectorProps {
  years: Year[];
  onSelectYear: (year: Year) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const statsData = [
  { icon: BookOpen, label: "Courses", value: "50+" },
  { icon: Users, label: "Students", value: "1000+" },
  { icon: Calendar, label: "Duration", value: "4 Years" }
];

export const YearSelector: React.FC<YearSelectorProps> = ({ years, onSelectYear }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          className="relative inline-block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <GraduationCap className="w-20 h-20 text-primary relative" />
        </motion.div>
        
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.2, duration: 0.5 }
            }
          }}
          className="text-5xl font-bold text-card-foreground mt-8 mb-6"
        >
          Engineering Curriculum
        </motion.h1>
        
        <motion.p
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.3, duration: 0.5 }
            }
          }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Explore our comprehensive engineering program designed to shape the future innovators
        </motion.p>
      </div>

      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.4, duration: 0.5 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1,
                transition: { 
                  delay: 0.5 + (index * 0.1),
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              }
            }}
            className="bg-card p-6 rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-4">
              <stat.icon className="w-8 h-8 text-primary" />
              <div className="text-center">
                <h3 className="text-3xl font-bold text-card-foreground">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {years.map((year, index) => (
          <motion.div
            key={year.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => onSelectYear(year)}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-card px-8 py-10 rounded-xl border-2 border-border group-hover:border-primary transition-all duration-300">
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute top-3 right-3 w-12 h-12 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                </div>
                
                <h2 className="text-3xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                  Year {year.number}
                </h2>
                <p className="text-muted-foreground mt-2">
                  {year.semesters.length} Semesters
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore courses</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};