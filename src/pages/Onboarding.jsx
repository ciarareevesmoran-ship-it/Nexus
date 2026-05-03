import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, Check, Sparkles, Crown } from 'lucide-react';
import { SUBJECTS } from '@/lib/subjects';
import { cn } from '@/lib/utils';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function StepWelcome({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-8">
        <GraduationCap className="w-8 h-8 text-primary-foreground" />
      </div>
      <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
        Welcome to Nexus
      </h1>
      <p className="text-lg text-muted-foreground max-w-md leading-relaxed mb-2">
        Learn any subject, in any format, on your own terms.
      </p>
      <p className="text-sm text-muted-foreground max-w-sm mb-10">
        Nexus gives you structured courses, cross-disciplinary cases, and an AI tutor that adapts to you. No prerequisites. No rigid schedules.
      </p>
      <Button size="lg" onClick={onNext} className="px-10 py-6 text-base rounded-xl">
        Get started
      </Button>
    </motion.div>
  );
}

function StepInterests({ selected, onToggle, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <div className="max-w-2xl w-full">
        <h2 className="font-serif text-3xl font-bold text-center mb-2">What interests you?</h2>
        <p className="text-muted-foreground text-center mb-8">Select the subjects you'd like to explore. You can always change these later.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {SUBJECTS.map((subject) => {
            const isSelected = selected.includes(subject.id);
            const Icon = subject.icon;
            return (
              <button
                key={subject.id}
                onClick={() => onToggle(subject.id)}
                className={cn(
                  "relative flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
                <Icon className={cn("w-7 h-7", isSelected ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-sm font-medium", isSelected ? "text-primary" : "text-foreground")}>{subject.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={onNext} disabled={selected.length === 0} className="px-10 py-6 text-base rounded-xl">
            Continue
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function StepPlan({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-screen px-6"
    >
      <h2 className="font-serif text-3xl font-bold text-center mb-2">Choose your plan</h2>
      <p className="text-muted-foreground text-center mb-10">Start free or unlock the full Nexus experience.</p>

      <div className="grid md:grid-cols-2 gap-5 max-w-2xl w-full">
        <div className="flex flex-col p-6 rounded-xl border-2 border-border bg-card">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-serif text-xl font-bold">Free</h3>
          </div>
          <p className="text-2xl font-bold mb-4">0 kr<span className="text-sm font-normal text-muted-foreground">/month</span></p>
          <ul className="space-y-2 mb-6 flex-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Core subjects</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Text format</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Basic AI tutor</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Live Cases (view only)</li>
          </ul>
          <Button variant="outline" size="lg" onClick={() => onSelect('free')} className="rounded-xl">
            Start free
          </Button>
        </div>

        <div className="flex flex-col p-6 rounded-xl border-2 border-primary bg-primary/5 relative">
          <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Recommended
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-xl font-bold">Premium</h3>
          </div>
          <p className="text-2xl font-bold mb-4">79 kr<span className="text-sm font-normal text-muted-foreground">/month</span></p>
          <ul className="space-y-2 mb-6 flex-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> All subjects unlocked</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Video, Audio & Text</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Full Case builder</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Advanced AI tutor</li>
            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Personalised quizzes</li>
          </ul>
          <Button size="lg" onClick={() => onSelect('premium')} className="rounded-xl">
            Start Premium
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Onboarding() {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const toggleInterest = (id) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handlePlanSelect = async (plan) => {
    await supabase.from('user_profiles').insert({
      user_id: user.id,
      interests,
      plan,
      onboarding_completed: true,
      learning_goals: '',
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {[0, 1, 2].map((i) => (
          <div key={i} className={cn("h-1.5 rounded-full transition-all duration-300", i === step ? "w-8 bg-primary" : "w-4 bg-border")} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {step === 0 && <StepWelcome key="welcome" onNext={() => setStep(1)} />}
        {step === 1 && <StepInterests key="interests" selected={interests} onToggle={toggleInterest} onNext={() => setStep(2)} />}
        {step === 2 && <StepPlan key="plan" onSelect={handlePlanSelect} />}
      </AnimatePresence>
    </div>
  );
}
