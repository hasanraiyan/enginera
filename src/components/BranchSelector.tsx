import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Cpu, Wrench, Zap, Radio, Battery } from 'lucide-react';
import { Branch } from '../types/course';

interface BranchSelectorProps {
  branches: Branch[];
  onSelectBranch: (branch: Branch) => void;
  onBack: () => void;
}

const branchIcons = {
  'IT': Code,
  'CSE': Cpu,
  'ME': Wrench,
  'EE': Zap,
  'ECE': Radio,
  'EEE': Battery,
};

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

export const BranchSelector: React.FC<BranchSelectorProps> = ({
  branches,
  onSelectBranch,
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
        <span>Back to Semesters</span>
      </motion.button>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-card-foreground mb-4">
          Select Your Branch
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose your engineering branch to view subjects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => {
          const Icon = branchIcons[branch.code as keyof typeof branchIcons] || Code;
          
          return (
            <motion.div
              key={branch.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => onSelectBranch(branch)}
                className="w-full bg-card hover:bg-accent p-8 rounded-xl border-2 border-border hover:border-primary transition-all duration-300 group"
              >
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-xl font-bold text-card-foreground group-hover:text-primary mb-2">
                  {branch.name}
                </h2>
                <p className="text-muted-foreground">
                  {branch.subjects.length} Subjects
                </p>
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};