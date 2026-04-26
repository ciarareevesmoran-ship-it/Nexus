import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SUBJECTS, SUBJECT_TOPICS, getSubtopics } from '@/lib/subjects';
import { ChevronLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LearningToolsPanel from '../components/learning/LearningToolsPanel';
import ContentDisplay from '../components/learning/ContentDisplay';
import AiTutor from '../components/ai-tutor/AiTutor';
import BookmarkButton from '../components/learning/BookmarkButton';
import { logLessonCompleted, setLastLessonForSubject } from '@/lib/userTracking';

export default function LearningContent() {
  const { subjectId, topicId, subtopicId } = useParams();
  const navigate = useNavigate();
  const [toolsOpen, setToolsOpen] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const format = urlParams.get('format') || 'text';

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const topics = SUBJECT_TOPICS[subjectId] || [];
  const topic = topics.find(t => t.id === topicId);
  const subtopics = getSubtopics(topicId);
  const subtopic = subtopics.find(s => s.id === subtopicId);
  const subtopicIndex = subtopics.findIndex(s => s.id === subtopicId);
  const prevSubtopic = subtopicIndex > 0 ? subtopics[subtopicIndex - 1] : null;
  const nextSubtopic = subtopicIndex < subtopics.length - 1 ? subtopics[subtopicIndex + 1] : null;

  const lessonUrl = subject && topic && subtopic
    ? `/learn/${subjectId}/${topicId}/${subtopicId}`
    : null;

  useEffect(() => {
    if (!subject || !topic || !subtopic) return;
    setLastLessonForSubject(subjectId, {
      lessonId: subtopicId,
      lessonName: subtopic.name,
      topicId,
      topicName: topic.name,
      url: `${lessonUrl}?format=${format}`,
    });
    logLessonCompleted({
      lessonId: subtopicId,
      lessonName: subtopic.name,
      subjectId,
      topicId,
    }).catch(() => {});
  }, [subjectId, topicId, subtopicId]);

  if (!subject || !topic || !subtopic) {
    return <div className="p-10 text-center text-muted-foreground">Content not found.</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-background shrink-0">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm overflow-hidden">
          <span className="text-muted-foreground truncate">{subject.name}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground truncate">{topic.name}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground truncate">{subtopic.name}</span>
        </div>
        <div className="ml-auto shrink-0 flex items-center gap-1">
          <BookmarkButton
            variant="icon"
            bookmark={{
              subjectId,
              subjectName: subject.name,
              topicId,
              topicName: topic.name,
              lessonId: subtopicId,
              lessonName: subtopic.name,
              contextType: 'lesson',
              url: `${lessonUrl}?format=${format}`,
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setToolsOpen(!toolsOpen)}
            className="hidden md:flex items-center gap-2 text-muted-foreground"
          >
            {toolsOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            <span className="text-xs">Learning Tools</span>
          </Button>
        </div>
      </div>

      {/* Main content + tools panel side by side */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tools panel — 42% width, scrollable, pushes content */}
        {toolsOpen && (
          <div className="hidden md:flex flex-col w-[42%] shrink-0 border-r border-border bg-card overflow-y-auto">
            <LearningToolsPanel
              subtopic={subtopic}
              onClose={() => setToolsOpen(false)}
              noteContext={{
                contextType: 'subject',
                contextId: subjectId,
                contextName: subject.name,
              }}
            />
          </div>
        )}

        {/* Reading area — fills remaining space */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <div className="flex-1">
            <ContentDisplay subtopic={subtopic} topic={topic} subject={subject} format={format} />
          </div>

          {/* Bottom chapter navigation — stays within the reading column */}
          {(prevSubtopic || nextSubtopic) && (
            <div className="flex items-stretch shrink-0" style={{ background: '#671D2C' }}>
              {prevSubtopic ? (
                <button
                  onClick={() => navigate(`/learn/${subjectId}/${topicId}/${prevSubtopic.id}?format=${format}`)}
                  className="flex-1 flex flex-col items-start px-6 py-4 text-white hover:brightness-110 transition-all text-left"
                >
                  <span className="text-xs opacity-70 mb-0.5">← Previous</span>
                  <span className="font-serif font-bold text-sm leading-snug">{prevSubtopic.name}</span>
                </button>
              ) : <div className="flex-1" />}

              {prevSubtopic && nextSubtopic && (
                <div className="w-px bg-white/20 self-stretch" />
              )}

              {nextSubtopic ? (
                <button
                  onClick={() => navigate(`/learn/${subjectId}/${topicId}/${nextSubtopic.id}?format=${format}`)}
                  className="flex-1 flex flex-col items-end px-6 py-4 text-white hover:brightness-110 transition-all text-right"
                >
                  <span className="text-xs opacity-70 mb-0.5">Next →</span>
                  <span className="font-serif font-bold text-sm leading-snug">{nextSubtopic.name}</span>
                </button>
              ) : <div className="flex-1" />}
            </div>
          )}
        </div>
      </div>

      {/* AI Tutor — context-aware with current subtopic */}
      <AiTutor subtopicName={subtopic.name} buttonBottom="bottom-20" />
    </div>
  );
}