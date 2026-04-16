import { useParams, useNavigate, Link } from 'react-router-dom';
import { SUBJECTS, SUBJECT_TOPICS } from '@/lib/subjects';
import { ChevronLeft, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FullCoursePage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const topics = SUBJECT_TOPICS[subjectId] || [];

  if (!subject) {
    return <div className="p-10 text-center text-muted-foreground">Subject not found.</div>;
  }

  const Icon = subject.icon;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 md:py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to {subject.name}
      </button>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-sm font-medium text-primary uppercase tracking-wider">{subject.name}</span>
      </div>

      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Full Structured Course</h1>
      <p className="text-muted-foreground mb-10">
        A complete ground-up curriculum covering all core topics in order.
      </p>

      <div className="space-y-3">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <Link
              to={`/subject/${subjectId}/topic/${topic.id}`}
              className="group flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{topic.description}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}