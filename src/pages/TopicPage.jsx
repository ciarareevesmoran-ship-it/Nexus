import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SUBJECTS, SUBJECT_TOPICS, getSubtopics } from '@/lib/subjects';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import FormatSelector from '../components/learning/FormatSelector';
import { motion } from 'framer-motion';

export default function TopicPage() {
  const { subjectId, topicId } = useParams();
  const navigate = useNavigate();
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const topics = SUBJECT_TOPICS[subjectId] || [];
  const topic = topics.find(t => t.id === topicId);
  const subtopics = getSubtopics(topicId);

  if (!subject || !topic) {
    return <div className="p-10 text-center text-muted-foreground">Topic not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to {subject.name}
      </button>

      <h1 className="font-serif text-3xl font-bold text-foreground mb-1">{topic.name}</h1>
      <p className="text-muted-foreground mb-8">{topic.description}</p>

      <div className="space-y-2">
        {subtopics.map((subtopic, index) => (
          <motion.button
            key={subtopic.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedSubtopic(subtopic)}
            className="group w-full flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all text-left"
          >
            <div>
              <h3 className="font-serif text-base font-bold text-foreground group-hover:text-primary transition-colors">{subtopic.name}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{subtopic.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
          </motion.button>
        ))}
      </div>

      {selectedSubtopic && (
        <FormatSelector
          subtopic={selectedSubtopic}
          subjectId={subjectId}
          topicId={topicId}
          onClose={() => setSelectedSubtopic(null)}
        />
      )}
    </div>
  );
}