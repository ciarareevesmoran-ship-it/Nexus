import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SUBJECTS, SUBJECT_TOPICS, getSubtopics } from '@/lib/subjects';
import { ChevronLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LearningToolsPanel from '../components/learning/LearningToolsPanel';
import ContentDisplay from '../components/learning/ContentDisplay';
import AiTutor from '../components/ai-tutor/AiTutor';

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
        <div className="ml-auto shrink-0">
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

      {/* Main content + optional tools overlay */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Reading area */}
        <div className="flex-1 overflow-y-auto">
          <ContentDisplay subtopic={subtopic} topic={topic} subject={subject} format={format} />
        </div>

        {/* Tools panel — 42% width overlay anchored to the left of the content area */}
        {toolsOpen && (
          <div className="hidden md:flex absolute top-0 left-0 bottom-0 w-[42%] bg-card border-r border-border shadow-xl z-30 overflow-y-auto flex-col">
            <LearningToolsPanel subtopic={subtopic} onClose={() => setToolsOpen(false)} />
          </div>
        )}
      </div>

      {/* AI Tutor — context-aware with current subtopic */}
      <AiTutor subtopicName={subtopic.name} />
    </div>
  );
}