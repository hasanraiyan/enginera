import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { academicYears } from './data/academicData';
import { YearSelector } from './components/YearSelector';
import { SemesterSelector } from './components/SemesterSelector';
import { BranchSelector } from './components/BranchSelector';
import { SubjectList } from './components/SubjectList';
import { SubjectDetails } from './components/SubjectDetails';
import { ThemeToggle } from './components/ThemeToggle';
import { ChatButton } from './components/chat/ChatButton';
import { ChatInterface } from './components/chat/ChatInterface';
import type { Year, Semester, Branch, Subject } from './types/course';

function App() {
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleBack = () => {
    if (selectedSubject) {
      setSelectedSubject(null);
    } else if (selectedBranch) {
      setSelectedBranch(null);
    } else if (selectedSemester) {
      setSelectedSemester(null);
    } else if (selectedYear) {
      setSelectedYear(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setSelectedYear(null);
                setSelectedSemester(null);
                setSelectedBranch(null);
                setSelectedSubject(null);
              }}
              className="text-xl font-bold text-card-foreground hover:text-primary transition-colors duration-300"
            >
              Engineering Curriculum
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12">
        <AnimatePresence mode="wait">
          {selectedSubject ? (
            <SubjectDetails
              key="subject-details"
              subject={selectedSubject}
              onBack={handleBack}
            />
          ) : selectedBranch ? (
            <SubjectList
              key="subject-list"
              branch={selectedBranch}
              onSelectSubject={setSelectedSubject}
              onBack={handleBack}
            />
          ) : selectedSemester ? (
            <BranchSelector
              key="branch-selector"
              branches={selectedSemester.branches}
              onSelectBranch={setSelectedBranch}
              onBack={handleBack}
            />
          ) : selectedYear ? (
            <SemesterSelector
              key="semester-selector"
              semesters={selectedYear.semesters}
              onSelectSemester={setSelectedSemester}
              onBack={handleBack}
            />
          ) : (
            <YearSelector
              key="year-selector"
              years={academicYears}
              onSelectYear={setSelectedYear}
            />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {!isChatOpen && (
          <ChatButton onClick={() => setIsChatOpen(true)} isOpen={isChatOpen} />
        )}
        {isChatOpen && (
          <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;