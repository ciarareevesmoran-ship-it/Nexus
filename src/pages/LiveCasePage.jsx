import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LIVE_CASES } from '@/lib/subjects';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen, StickyNote } from 'lucide-react';
import { motion } from 'framer-motion';
import BookmarkButton from '../components/learning/BookmarkButton';
import NotesPanel from '../components/learning/NotesPanel';
import { logCaseExplored } from '@/lib/userTracking';
import { useAuth } from '@/lib/AuthContext';

const LIVE_CASE_DETAILS = {
  arctic: {
    why: 'The Arctic is warming nearly four times faster than the global average. This isn\'t just an environmental crisis — it\'s reshaping geopolitics, indigenous livelihoods, and global economics.',
    overview: 'This case explores the Arctic through two disciplinary lenses: social science and geology. You\'ll examine how melting permafrost affects ecosystems and infrastructure, how indigenous communities are adapting, and how Arctic sovereignty is becoming a flashpoint in international relations.',
    modules: [
      { title: 'The Geology of the Arctic', description: 'Permafrost, glaciation, and the physical transformation of the Arctic landscape.' },
      { title: 'Arctic Societies', description: 'Indigenous peoples, resource-dependent communities, and the social fabric of the North.' },
      { title: 'Climate Feedback Loops', description: 'How geological changes trigger social consequences — and vice versa.' },
      { title: 'Geopolitics of the Arctic', description: 'Sovereignty claims, shipping routes, and the race for resources beneath the ice.' },
      { title: 'Futures & Scenarios', description: 'What the Arctic might look like in 2050 — and what that means for the rest of us.' },
    ],
  },
  'israel-palestine': {
    why: 'The Israeli-Palestinian conflict is one of the most enduring and complex geopolitical disputes of the modern era. Understanding it requires both historical depth and political analysis.',
    overview: 'This case combines history and political science to examine the roots of the conflict, the evolution of national identities, the role of international law, and the prospects for resolution.',
    modules: [
      { title: 'Historical Roots', description: 'From the Ottoman Empire to the British Mandate — the origins of the conflict.' },
      { title: 'National Identities', description: 'How Israeli and Palestinian national identities were shaped by history and politics.' },
      { title: 'Wars & Negotiations', description: 'Key conflicts, peace processes, and turning points since 1948.' },
      { title: 'International Law & Diplomacy', description: 'The role of the UN, international courts, and global powers.' },
      { title: 'Present & Future', description: 'Current realities on the ground and possible paths forward.' },
    ],
  },
  'green-transition': {
    why: 'The shift from fossil fuels to renewable energy is the defining economic and scientific challenge of our time. It requires understanding both chemistry and economics.',
    overview: 'This case examines the green transition through the dual lens of chemistry and economics. You\'ll learn about battery technology, carbon capture, energy markets, and the policy frameworks driving change.',
    modules: [
      { title: 'Energy Chemistry', description: 'How solar cells, batteries, and hydrogen fuel cells actually work.' },
      { title: 'Fossil Fuel Economics', description: 'Why the world still depends on oil and gas — and the economics of transition.' },
      { title: 'Innovation & Technology', description: 'Breakthroughs in materials science, energy storage, and carbon capture.' },
      { title: 'Policy & Markets', description: 'Carbon pricing, subsidies, and the role of government in accelerating change.' },
      { title: 'The Road Ahead', description: 'Scenarios for 2030 and beyond — what needs to happen, and what might go wrong.' },
    ],
  },
};

export default function LiveCasePage() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [notesOpen, setNotesOpen] = useState(false);

  const liveCase = LIVE_CASES.find(c => c.id === caseId);
  const details = LIVE_CASE_DETAILS[caseId];

  useEffect(() => {
    if (liveCase && user) {
      logCaseExplored({ caseId: liveCase.id, caseName: liveCase.title }).catch(() => {});
    }
  }, [liveCase, user]);

  if (!liveCase || !details) {
    return <div className="p-10 text-center text-muted-foreground">Case not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to dashboard
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setNotesOpen(!notesOpen)}
            className="h-9 px-3 flex items-center gap-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors text-xs"
          >
            <StickyNote className="w-4 h-4" />
            Notes
          </button>
          <BookmarkButton
            variant="icon"
            bookmark={{
              lessonId: liveCase.id,
              lessonName: liveCase.title,
              contextType: 'case',
              url: `/live-case/${liveCase.id}`,
            }}
          />
        </div>
      </div>

      {notesOpen && (
        <div className="mb-8 rounded-xl border border-border bg-card overflow-hidden">
          <NotesPanel
            contextType="case"
            contextId={liveCase.id}
            contextName={liveCase.title}
          />
        </div>
      )}

      <div className="h-48 md:h-64 rounded-xl overflow-hidden mb-6">
        <img src={liveCase.image} alt={liveCase.title} className="w-full h-full object-cover" />
      </div>

      <div className="flex gap-1.5 mb-3">
        {liveCase.subjects.map((s) => (
          <span key={s} className="text-xs font-semibold uppercase tracking-wider text-[#6B1F2A] bg-[#F2E0E3] px-2.5 py-1 rounded-full">
            {s}
          </span>
        ))}
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">{liveCase.title}</h1>

      <div className="p-5 rounded-xl bg-[#FAF0F2] border-l-4 border-[#8B2A3A] mb-6">
        <p className="text-sm font-serif font-bold text-[#8B2A3A] mb-1">Why this matters</p>
        <p className="text-sm text-foreground/80 leading-relaxed">{details.why}</p>
      </div>

      <p className="text-base text-muted-foreground leading-relaxed mb-10">{details.overview}</p>

      <h2 className="font-serif text-xl font-bold mb-4 text-foreground">Learning Path</h2>
      <div className="space-y-3 mb-10">
        {details.modules.map((mod, index) => (
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