import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function WelcomeHeader() {
  const [name, setName] = useState('');

  useEffect(() => {
    base44.auth.me().then(user => setName(user.full_name?.split(' ')[0] || 'Learner'));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="mb-8">
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {greeting}, {name}
      </h1>
      <p className="text-muted-foreground mt-1.5 text-base">
        Every great thinker started with a single question. What will yours be today?
      </p>
    </div>
  );
}