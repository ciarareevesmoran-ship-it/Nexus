import { useState } from 'react';
import { Brain, Lightbulb, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOOLS = [
  { id: 'quiz', label: 'Quiz', icon: Brain, description: 'Test your understanding' },
  { id: 'flashcards', label: 'Flashcards', icon: Lightbulb, description: 'Review key concepts' },
  { id: 'mindmap', label: 'Mind Map', icon: GitBranch, description: 'Visualise connections' },
];

function QuizPanel({ subtopic }) {
  return (
    <div className="p-4 space-y-4">
      <div className="p-4 rounded-lg bg-background border border-border">
        <p className="text-sm font-medium mb-2">Question 1 of 3</p>
        <p className="text-sm text-foreground mb-3">What is the primary driving force behind {subtopic.name.toLowerCase()}?</p>
        <div className="space-y-2">
          {['Gravitational energy', 'Solar radiation', 'Internal heat', 'Chemical reactions'].map((opt, i) => (
            <button key={i} className="w-full text-left text-sm px-3 py-2 rounded-lg border border-border hover:bg-primary/5 hover:border-primary/30 transition-all">
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlashcardsPanel({ subtopic }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="p-4">
      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full aspect-[3/2] rounded-xl border-2 border-border bg-background flex items-center justify-center p-6 hover:shadow-sm transition-all"
      >
        <p className="text-sm text-center">
          {flipped
            ? `The study of ${subtopic.name.toLowerCase()} involves understanding how natural processes shape our world over geological time scales.`
            : `What is ${subtopic.name}?`
          }
        </p>
      </button>
      <p className="text-xs text-muted-foreground text-center mt-3">Tap to flip • Card 1 of 5</p>
    </div>
  );
}

function MindMapPanel({ subtopic }) {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center gap-2">
        <div className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium">{subtopic.name}</div>
        <div className="w-px h-4 bg-border" />
        <div className="flex gap-3">
          {['Concepts', 'Processes', 'Examples'].map((node) => (
            <div key={node} className="flex flex-col items-center gap-1">
              <div className="w-px h-3 bg-border" />
              <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{node}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LearningToolsPanel({ subtopic }) {
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="py-4">
      <h3 className="font-serif text-sm font-bold px-4 mb-3 text-foreground">Learning Tools</h3>
      <div className="px-3 space-y-1">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(isActive ? null : tool.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
                isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <div>
                <p className="font-medium">{tool.label}</p>
                <p className="text-xs text-muted-foreground">{tool.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {activeTool === 'quiz' && <QuizPanel subtopic={subtopic} />}
      {activeTool === 'flashcards' && <FlashcardsPanel subtopic={subtopic} />}
      {activeTool === 'mindmap' && <MindMapPanel subtopic={subtopic} />}
    </div>
  );
}