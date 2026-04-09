import { useNavigate } from 'react-router-dom';
import { SUBJECTS } from '@/lib/subjects';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CaseBuilder() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const s1Id = urlParams.get('s1');
  const s2Id = urlParams.get('s2');

  const subject1 = SUBJECTS.find(s => s.id === s1Id);
  const subject2 = SUBJECTS.find(s => s.id === s2Id);

  if (!subject1 || !subject2) {
    return <div className="p-10 text-center text-muted-foreground">Select two subjects to build a case.</div>;
  }

  const Icon1 = subject1.icon;
  const Icon2 = subject2.icon;

  const modules = [
    { title: `Foundations of ${subject1.name}`, description: `Core principles and frameworks from ${subject1.name.toLowerCase()} that underpin this case.` },
    { title: `Foundations of ${subject2.name}`, description: `Key concepts from ${subject2.name.toLowerCase()} that connect to the first subject.` },
    { title: 'Points of Intersection', description: `Where ${subject1.name.toLowerCase()} and ${subject2.name.toLowerCase()} overlap — shared questions, tensions, and insights.` },
    { title: 'Case Analysis', description: 'A deep dive into real-world examples where both fields converge.' },
    { title: 'Synthesis & Reflection', description: 'Connecting the dots — what we learn when we think across disciplines.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        Back to dashboard
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <Icon1 className="w-5 h-5 text-primary" />
          <span className="font-serif font-bold text-foreground">{subject1.name}</span>
        </div>
        <span className="font-serif text-2xl text-primary font-bold">×</span>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <Icon2 className="w-5 h-5 text-primary" />
          <span className="font-serif font-bold text-foreground">{subject2.name}</span>
        </div>
      </div>

      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
        {subject1.name} × {subject2.name}
      </h1>
      <p className="text-muted-foreground max-w-xl mb-10">
        This cross-disciplinary case weaves together concepts from both {subject1.name.toLowerCase()} and {subject2.name.toLowerCase()}, helping you see patterns and insights that neither field reveals on its own.
      </p>

      <h2 className="font-serif text-xl font-bold mb-4 text-foreground">Learning Path</h2>
      <div className="space-y-3 mb-10">
        {modules.map((mod, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex gap-4 p-5 rounded-xl border border-border bg-card"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-sm font-bold text-primary">{index + 1}</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-foreground">{mod.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{mod.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Button size="lg" className="rounded-xl px-8">
        <BookOpen className="w-4 h-4 mr-2" />
        Start learning
      </Button>
    </div>
  );
}