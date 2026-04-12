import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS } from '@/lib/subjects';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

function CaseConfirmModal({ subject1, subject2, onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-background rounded-2xl border border-border shadow-xl max-w-md w-full p-8 text-center"
      >
        <h2 className="font-serif text-xl font-bold text-foreground mb-2">
          Create a case with {subject1.name} and {subject2.name}?
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          We'll build a cross-disciplinary learning path weaving both subjects together.
        </p>
        <div className="flex gap-3">
          <Button className="flex-1 rounded-xl" onClick={onConfirm}>Yes!</Button>
          <Button variant="outline" className="flex-1 rounded-xl" onClick={onCancel}>No, take me back</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SubjectGrid() {
  const navigate = useNavigate();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      // Deselect this widget
      setSelectedSubjects(prev => prev.filter(id => id !== subjectId));
    } else if (selectedSubjects.length < 2) {
      const next = [...selectedSubjects, subjectId];
      setSelectedSubjects(next);
      if (next.length === 2) setShowModal(true);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-bold text-foreground">Subjects</h2>
        {selectedSubjects.length === 1 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full"
          >
            Now select a second subject to combine
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SUBJECTS.map((subject, index) => {
          const Icon = subject.icon;
          const isSelected = selectedSubjects.includes(subject.id);
          const isSecondary = selectedSubjects.length > 0 && !isSelected;
          return (
            <motion.button
              key={subject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => handleClick(subject)}
              className={cn(
                "group relative flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-sm",
                isSecondary && "hover:border-primary hover:bg-primary/5"
              )}
            >
              <button
                onClick={(e) => handleCaseToggle(e, subject.id)}
                className={cn(
                  "absolute top-3 right-3 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground opacity-0 group-hover:opacity-100 hover:border-primary hover:text-primary"
                )}
                title={isSelected ? "Deselect" : "Combine into a case"}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <Icon className={cn("w-7 h-7 mb-3", isSelected ? "text-primary" : "text-muted-foreground")} />
              <h3 className={cn("font-serif text-base font-bold mb-1", isSelected ? "text-primary" : "text-foreground")}>{subject.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{subject.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}