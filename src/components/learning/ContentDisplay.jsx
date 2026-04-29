import { useEffect, useState } from 'react';
import { Video, Headphones, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GeneratedContent from './GeneratedContent';

function VideoHeader({ subtopic }) {
  return (
    <div className="aspect-video rounded-xl bg-muted flex flex-col items-center justify-center border border-border mb-10 mx-auto" style={{ maxWidth: 700 }}>
      <Video className="w-12 h-12 text-muted-foreground mb-3" />
      <p className="text-sm text-muted-foreground">Video: {subtopic.name}</p>
      <p className="text-xs text-muted-foreground mt-1">12:34</p>
    </div>
  );
}

function AudioHeader({ subtopic }) {
  return (
    <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-4 mb-10 mx-auto" style={{ maxWidth: 700 }}>
      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shrink-0">
        <Headphones className="w-6 h-6 text-primary-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-serif font-bold text-foreground">{subtopic.name}</p>
        <p className="text-sm text-muted-foreground">Audio lesson • 18 min</p>
        <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-primary rounded-full" />
        </div>
      </div>
    </div>
  );
}

function PlaceholderText({ subtopic, topic }) {
  return (
    <div className="mx-auto" style={{ maxWidth: 700, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
        Understanding {subtopic.name}
      </h2>
      <p className="text-foreground/80 mb-4" style={{ fontSize: '17px', lineHeight: 1.7 }}>
        {subtopic.name} is one of the foundational concepts within {topic.name}. Detailed
        AI-generated content for this section hasn't been produced yet — once it is, it will
        appear here automatically.
      </p>
    </div>
  );
}

export default function ContentDisplay({ subtopic, topic, subject, format }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setContent(null);

    base44.entities.LearningContent
      .filter({ subject: subject.name, section_title: subtopic.name })
      .then((rows) => {
        if (cancelled) return;
        setContent(rows[0] || null);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [subject.name, subtopic.name]);

  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <div className="mx-auto" style={{ maxWidth: 700 }}>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {format === 'video' ? 'Video' : format === 'audio' ? 'Audio' : 'Text'}
          </span>
          <span className="text-xs text-muted-foreground">{subject.name} → {topic.name}</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-10 leading-tight">
          {subtopic.name}
        </h1>
      </div>

      {format === 'video' && <VideoHeader subtopic={subtopic} />}
      {format === 'audio' && <AudioHeader subtopic={subtopic} />}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : content ? (
        <GeneratedContent content={content} subject={subject.name} />
      ) : (
        <PlaceholderText subtopic={subtopic} topic={topic} />
      )}
    </div>
  );
}