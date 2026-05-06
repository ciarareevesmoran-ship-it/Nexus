import { useNavigate, useLocation } from 'react-router-dom';
import { SUBJECTS } from '@/lib/subjects';
import { getIntersectionThemes } from '@/data/caseIntersections';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen, Layers, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

function CaseBuilderLanding() {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Case Builder</h1>
      <p className="text-muted-foreground mb-10">
        Combine any two subjects into a single cross-disciplinary learning path.
      </p>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Layers className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-xl font-bold text-foreground mb-2">No cases yet</h2>
        <p className="text-sm text-muted-foreground max-w-xs mb-6">
          Head to the dashboard, hover over a subject, and click the circle icon to start combining subjects.
        </p>
        <Button className="rounded-xl" onClick={() => navigate('/')}>Go to dashboard</Button>
      </div>
    </div>
  );
}

function SubjectTag({ subject }) {
  const Icon = subject.icon;
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
      <Icon className="w-4 h-4 text-primary" />
      <span className="font-serif font-semibold text-sm text-foreground">{subject.name}</span>
    </div>
  );
}

// State A: theme picker — user picks what their case is built around
function ThemePicker({ subject1, subject2, themes, s1Id, s2Id }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to dashboard
      </button>

      <div className="flex items-center gap-3 mb-6">
        <SubjectTag subject={subject1} />
        <span className="font-serif text-xl text-primary font-bold">×</span>
        <SubjectTag subject={subject2} />
      </div>

      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
        {subject1.name} × {subject2.name}
      </h1>
      <p className="text-muted-foreground max-w-xl mb-10">
        Choose what to build your case around. Each theme focuses the course on a specific intersection between these two subjects.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themes.map((theme, index) => (
          <motion.button
            key={theme.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            onClick={() => navigate(`/case-builder?s1=${s1Id}&s2=${s2Id}&theme=${theme.id}`)}
            className="text-left p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 transition-all group"
          >
            <h3 className="font-serif font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
              {theme.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{theme.description}</p>
            <div className="flex gap-2 flex-wrap">
              {theme.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// State B: learning path for a selected theme
function LearningPath({ subject1, subject2, theme, s1Id, s2Id }) {
  const navigate = useNavigate();

  const firstLesson = theme.modules.find(m => m.subject && m.topic && m.subtopic);
  const startUrl = firstLesson
    ? `/learn/${firstLesson.subject}/${firstLesson.topic}/${firstLesson.subtopic}`
    : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <button
        onClick={() => navigate(`/case-builder?s1=${s1Id}&s2=${s2Id}`)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to themes
      </button>

      <div className="flex items-center gap-3 mb-4">
        <SubjectTag subject={subject1} />
        <span className="font-serif text-xl text-primary font-bold">×</span>
        <SubjectTag subject={subject2} />
      </div>

      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">{theme.title}</h1>
      <p className="text-muted-foreground max-w-xl mb-10">{theme.description}</p>

      <h2 className="font-serif text-xl font-bold mb-4 text-foreground">Learning Path</h2>
      <div className="space-y-3 mb-10">
        {theme.modules.map((mod, index) => {
          const isLinkable = mod.subject && mod.topic && mod.subtopic;
          const url = isLinkable ? `/learn/${mod.subject}/${mod.topic}/${mod.subtopic}` : null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => isLinkable && navigate(url)}
              className={`flex gap-4 p-5 rounded-xl border border-border bg-card transition-all ${
                isLinkable ? 'cursor-pointer hover:border-primary/40 hover:bg-primary/5' : 'opacity-60'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                {isLinkable ? (
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                ) : (
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-foreground">{mod.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{mod.description}</p>
                {!isLinkable && (
                  <span className="text-xs text-muted-foreground mt-1 inline-block">Coming soon</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {startUrl && (
        <Button size="lg" className="rounded-xl px-8" onClick={() => navigate(startUrl)}>
          <BookOpen className="w-4 h-4 mr-2" />
          Start learning
        </Button>
      )}
    </div>
  );
}

export default function CaseBuilder() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const s1Id = urlParams.get('s1');
  const s2Id = urlParams.get('s2');
  const themeId = urlParams.get('theme');

  const subject1 = SUBJECTS.find(s => s.id === s1Id);
  const subject2 = SUBJECTS.find(s => s.id === s2Id);

  if (!s1Id || !s2Id) return <CaseBuilderLanding />;
  if (!subject1 || !subject2) {
    return <div className="p-10 text-center text-muted-foreground">Select two subjects to build a case.</div>;
  }

  const themes = getIntersectionThemes(s1Id, s2Id);

  if (!themes) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
        <div className="flex items-center gap-3 mb-6">
          <SubjectTag subject={subject1} />
          <span className="font-serif text-xl text-primary font-bold">×</span>
          <SubjectTag subject={subject2} />
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
          {subject1.name} × {subject2.name}
        </h1>
        <p className="text-muted-foreground max-w-xl">
          Curated themes for this combination are coming soon.
        </p>
      </div>
    );
  }

  const selectedTheme = themeId ? themes.find(t => t.id === themeId) : null;

  if (selectedTheme) {
    return (
      <LearningPath
        subject1={subject1}
        subject2={subject2}
        theme={selectedTheme}
        s1Id={s1Id}
        s2Id={s2Id}
      />
    );
  }

  return (
    <ThemePicker
      subject1={subject1}
      subject2={subject2}
      themes={themes}
      s1Id={s1Id}
      s2Id={s2Id}
    />
  );
}
