import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SUBJECTS } from '@/lib/subjects';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SubjectGrid() {
  const navigate = useNavigate();
  const [caseMode, setCaseMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleClick = (subject) => {
    if (caseMode && selectedSubject) {
      if (subject.id !== selectedSubject) {
        navigate(`/case-builder?s1=${selectedSubject}&s2=${subject.id}`);
        setCaseMode(false);
        setSelectedSubject(null);
      }
      return;
    }
    navigate(`/subject/${subject.id}`);
  };

  const handleCaseToggle = (e, subjectId) => {
    e.stopPropagation();
    if (selectedSubject === subjectId) {
      setCaseMode(false);
      setSelectedSubject(null);
    } else {
      setCaseMode(true);
      setSelectedSubject(subjectId);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl font-bold text-foreground">Subjects</h2>
        {caseMode && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full"
          >
            Select a second subject to create a case
          </motion.span>
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SUBJECTS.map((subject, index) => {
          const Icon = subject.icon;
          const isSelected = selectedSubject === subject.id;
          const isSecondary = caseMode && !isSelected;
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
                title="Combine into a case"
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