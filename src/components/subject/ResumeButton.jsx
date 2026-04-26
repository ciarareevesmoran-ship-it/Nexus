import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { getLastLessonForSubject } from '@/lib/userTracking';

export default function ResumeButton({ subjectId }) {
  const [last, setLast] = useState(null);

  useEffect(() => {
    setLast(getLastLessonForSubject(subjectId));
  }, [subjectId]);

  if (!last || !last.url) return null;

  return (
    <Link
      to={last.url}
      className="mt-6 flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Pick up where you left off?</p>
          <p className="font-serif font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {last.lessonName}
          </p>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all shrink-0" />
    </Link>
  );
}