import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SUBJECTS, SUBJECT_TOPICS, getSubtopics } from '@/lib/subjects';
import { ChevronLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LearningToolsPanel from '../components/learning/LearningToolsPanel';
import ContentDisplay from '../components/learning/ContentDisplay';

export default function LearningContent() {
  const { subjectId, topicId, subtopicId } = useParams();
  const navigate = useNavigate();
  const [toolsOpen, setToolsOpen] = useState(true);

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
      <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-background">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{subject.name}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{topic.name}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">{subtopic.name}</span>
        </div>
        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setToolsOpen(!toolsOpen)}
            className="hidden md:flex items-center gap-2 text-muted-foreground"
          >
            {toolsOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            <span className="text-xs">Tools</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {toolsOpen && (
          <div className="hidden md:block w-72 border-r border-border bg-card overflow-y-auto shrink-0">
            <LearningToolsPanel subtopic={subtopic} />
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <ContentDisplay subtopic={subtopic} topic={topic} subject={subject} format={format} />
        </div>
      </div>
    </div>
  );
}