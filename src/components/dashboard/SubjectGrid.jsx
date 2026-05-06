import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS } from '@/lib/subjects';
import { cn } from '@/lib/utils';
import { Plus, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

function CaseConfirmModal({ subject1, subject2, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card rounded-2xl shadow-editorial-lg max-w-md w-full p-10 text-center"
      >
        <h2 className="font-serif text-2xl font-bold text-foreground mb-3 leading-tight">
          Create a case with <span className="italic text-primary">{subject1.name}</span> and <span className="italic text-primary">{subject2.name}</span>?
        </h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          We'll build a cross-disciplinary learning path weaving both subjects together.
        </p>
        <div className="flex gap-3">
          <Button className="flex-1 rounded-lg h-11" onClick={onConfirm}>Yes, build it</Button>
          <Button variant="outline" className="flex-1 rounded-lg h-11" onClick={onCancel}>Take me back</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SubjectGrid({ interests = [] }) {
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const interestSet = new Set(interests);

  const subject1 = SUBJECTS.find(s => s.id === selectedSubjects[0]);
  const subject2 = SUBJECTS.find(s => s.id === selectedSubjects[1]);

  const handleConfirm = () => {
    navigate(`/case-builder?s1=${selectedSubjects[0]}&s2=${selectedSubjects[1]}`);
    setSelectedSubjects([]);
    setShowModal(false);
  };

  const handleCancel = () => {
    setSelectedSubjects([]);
    setShowModal(false);
  };

  const handleClick = (subject) => {
    if (selectedSubjects.length === 0) {
      navigate(`/subject/${subject.id}`);
    }
  };

  const handleCaseToggle = (e, subjectId) => {
    e.stopPropagation();
    if (selectedSubjects.includes(subjectId)) {
      setSelectedSubjects(prev => prev.filter(id => id !== subjectId));
    } else if (selectedSubjects.length < 2) {
      const next = [...selectedSubjects, subjectId];
      setSelectedSubjects(next);
      if (next.length === 2) setShowModal(true);
    }
  };

  return (
    <section className="mb-20">
      <div className="flex items-end justify-between mb-8 md:mb-10 pb-5 border-b border-border">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Disciplines
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 leading-tight">
            Subjects
          </h2>
        </div>
        {selectedSubjects.length === 1 && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs md:text-sm text-primary font-medium italic font-serif"
          >
            Now select a second subject to combine →
          </motion.span>
        )}
      </div>
      <AnimatePresence>
        {showModal && subject1 && subject2 && (
          <CaseConfirmModal
            subject1={subject1}
            subject2={subject2}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
        {SUBJECTS.map((subject, index) => {
          const Icon = subject.icon;
          const isSelected = selectedSubjects.includes(subject.id);
          const isSecondary = selectedSubjects.length > 0 && !isSelected;
          const isInterest = interestSet.has(subject.id);
          return (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              onClick={() => handleClick(subject)}
              className={cn(
                "group relative h-full flex flex-col items-start p-7 rounded-xl text-left transition-all duration-300 bg-card",
                isSelected
                  ? "shadow-editorial-lg ring-2 ring-primary"
                  : "shadow-editorial hover:shadow-editorial-lg",
                isSecondary && "hover:ring-2 hover:ring-primary/40"
              )}
            >
              {isInterest && !isSelected && (
                <motion.span
                  aria-hidden="true"
                  className="absolute top-4 right-4 pointer-events-none transition-opacity duration-200 group-hover:opacity-0"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Star className="w-4 h-4 text-primary fill-primary" />
                </motion.span>
              )}
              <button
                onClick={(e) => handleCaseToggle(e, subject.id)}
                className={cn(
                  "absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
                )}
                title={isSelected ? "Deselect" : "Combine into a case"}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <div className={cn(
                "w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-colors",
                isSelected ? "bg-primary/15" : "bg-muted group-hover:bg-primary/10"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isSelected ? "text-primary" : "text-foreground/70 group-hover:text-primary"
                )} />
              </div>
              <h3 className={cn(
                "font-serif text-xl font-bold mb-2 leading-tight tracking-tight",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {subject.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {subject.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}