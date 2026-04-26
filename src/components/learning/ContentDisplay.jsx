import { Video, Headphones, FileText } from 'lucide-react';

function VideoContent({ subtopic, topic }) {
  return (
    <div className="space-y-8">
      <div className="aspect-video rounded-xl bg-muted flex flex-col items-center justify-center border border-border">
        <Video className="w-12 h-12 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">Video: {subtopic.name}</p>
        <p className="text-xs text-muted-foreground mt-1">12:34</p>
      </div>
      <TextBody subtopic={subtopic} topic={topic} />
    </div>
  );
}

function AudioContent({ subtopic, topic }) {
  return (
    <div className="space-y-8">
      <div className="p-6 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-4">
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
      <TextBody subtopic={subtopic} topic={topic} />
    </div>
  );
}

function TextBody({ subtopic, topic }) {
  return (
    <div className="prose prose-slate max-w-none">
      <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Understanding {subtopic.name}</h2>
      <p className="text-base leading-relaxed text-foreground/80 mb-4">
        {subtopic.name} is one of the foundational concepts within {topic.name}. To understand it fully, 
        we need to consider both the underlying mechanisms and the broader context in which these processes operate.
      </p>
      <p className="text-base leading-relaxed text-foreground/80 mb-4">
        At its core, this topic examines how natural and human systems interact with each other over time. 
        The processes involved are both cyclical and cumulative — meaning that small changes can compound 
        into significant transformations over extended periods.
      </p>
      <h3 className="font-serif text-xl font-bold text-foreground mt-8 mb-3">Key Principles</h3>
      <p className="text-base leading-relaxed text-foreground/80 mb-4">
        The first principle to grasp is that of equilibrium. Natural systems tend toward balance, 
        but this balance is dynamic rather than static. External forces — whether geological, 
        climatic, or human — constantly push systems away from equilibrium, triggering adaptive responses.
      </p>
      <div className="my-6 p-5 rounded-xl bg-[#FAF0F2] border-l-4 border-[#8B2A3A]">
        <p className="text-sm font-serif font-bold text-[#8B2A3A] mb-1">Key Concept</p>
        <p className="text-sm text-foreground/80">
          Dynamic equilibrium: A state in which a system remains stable overall, even as its internal 
          components are constantly changing. Think of a river — the water is always moving, but the 
          riverbed maintains its shape (until a major flood reshapes it).
        </p>
      </div>
      <h3 className="font-serif text-xl font-bold text-foreground mt-8 mb-3">Historical Context</h3>
      <p className="text-base leading-relaxed text-foreground/80 mb-4">
        Our understanding of {subtopic.name.toLowerCase()} has evolved dramatically over the past two centuries. 
        Early naturalists observed surface phenomena without grasping the deeper mechanisms at play. 
        It was only with advances in technology and cross-disciplinary research that a more complete 
        picture began to emerge.
      </p>
      <p className="text-base leading-relaxed text-foreground/80 mb-4">
        Today, this field draws on insights from physics, chemistry, biology, and data science. 
        The modern approach is inherently interdisciplinary — a reminder that the boundaries between 
        subjects are often more a matter of academic convenience than natural division.
      </p>
      <h3 className="font-serif text-xl font-bold text-foreground mt-8 mb-3">Practical Applications</h3>
      <p className="text-base leading-relaxed text-foreground/80 mb-4">
        Understanding these concepts isn't just academic. They have direct relevance to climate adaptation, 
        urban planning, resource management, and policy design. By grasping how systems behave, 
        we become better equipped to anticipate change and respond thoughtfully.
      </p>
    </div>
  );
}

export default function ContentDisplay({ subtopic, topic, subject, format }) {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-8 md:py-10">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
          {format === 'video' ? 'Video' : format === 'audio' ? 'Audio' : 'Text'}
        </span>
        <span className="text-xs text-muted-foreground">{subject.name} → {topic.name}</span>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">{subtopic.name}</h1>

      {format === 'video' && <VideoContent subtopic={subtopic} topic={topic} />}
      {format === 'audio' && <AudioContent subtopic={subtopic} topic={topic} />}
      {format === 'text' && <TextBody subtopic={subtopic} topic={topic} />}
    </div>
  );
}