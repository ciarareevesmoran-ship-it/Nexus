import { useParams, Link } from 'react-router-dom';
import { SUBJECTS, SUBJECT_TOPICS, getSubtopics } from '@/lib/subjects';
import { ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import ResumeButton from '../components/subject/ResumeButton';

export default function SubjectPage() {
  const { subjectId } = useParams();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const topics = SUBJECT_TOPICS[subjectId] || [];

  if (!subject) {
    return <div className="p-10 text-center text-muted-foreground">Subject not found.</div>;
  }

  const Icon = subject.icon;

  const firstTopic = topics[0];
  const firstSubtopic = firstTopic ? getSubtopics(firstTopic.id)[0] : null;
  const fullCourseHref = firstTopic && firstSubtopic
    ? `/learn/${subjectId}/${firstTopic.id}/${firstSubtopic.id}?format=text&course=full`
    : `/subject/${subjectId}`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 md:py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground">{subject.name}</h1>
      </div>

      <Link to={fullCourseHref}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-xl bg-primary text-primary-foreground flex items-center justify-between group hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4">
            <BookOpen className="w-8 h-8 opacity-80" />
            <div>
              <h2 className="font-serif text-xl font-bold">Start from the ground up</h2>
              <p className="text-sm opacity-80 mt-0.5">A full structured course — perfect if you're new to {subject.name.toLowerCase()}.</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </Link>

      <h2 className="font-serif text-xl font-bold mb-4 text-foreground">Topics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="h-full"
          >
            <Link
              to={`/subject/${subjectId}/topic/${topic.id}`}
              className="group h-full flex flex-col items-start justify-between gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <div>
                <h3 className="font-serif text-base font-bold text-foreground group-hover:text-primary transition-colors">{topic.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all self-end shrink-0" />
            </Link>
          </motion.div>
        ))}
      </div>

      <ResumeButton subjectId={subjectId} />
    </div>
  );
}