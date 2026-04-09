import { useNavigate } from 'react-router-dom';
import { Video, Headphones, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const FORMATS = [
  { id: 'video', label: 'Video', icon: Video, description: 'Watch a visual explanation with diagrams and narration.' },
  { id: 'audio', label: 'Audio', icon: Headphones, description: 'Listen while commuting, working out, or relaxing.' },
  { id: 'text', label: 'Text', icon: FileText, description: 'Read at your own pace with rich illustrations.' },
];

export default function FormatSelector({ subtopic, subjectId, topicId, onClose }) {
  const navigate = useNavigate();

  const handleSelect = (formatId) => {
    navigate(`/learn/${subjectId}/${topicId}/${subtopic.id}?format=${formatId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-background rounded-2xl border border-border shadow-xl max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-serif text-xl font-bold">How would you like to learn this?</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-6">{subtopic.name}</p>

        <div className="space-y-3">
          {FORMATS.map((format) => {
            const Icon = format.icon;
            return (
              <button
                key={format.id}
                onClick={() => handleSelect(format.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{format.label}</h3>
                  <p className="text-sm text-muted-foreground">{format.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}