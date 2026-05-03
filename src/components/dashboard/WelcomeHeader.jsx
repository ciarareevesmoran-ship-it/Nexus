import { useAuth } from '@/lib/AuthContext';

export default function WelcomeHeader() {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name?.split(' ')[0]
    || user?.email?.split('@')[0]
    || 'Learner';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-14 md:mb-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-5">
        {today}
      </p>
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
        {greeting},
        <br />
        <span className="italic font-medium text-primary">{name}.</span>
      </h1>
      <p className="text-muted-foreground mt-6 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
        Every great thinker started with a single question.
        What will yours be today?
      </p>
    </div>
  );
}
