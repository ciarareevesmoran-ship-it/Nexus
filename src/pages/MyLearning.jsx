import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function MyLearning() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">My Learning</h1>
      <p className="text-muted-foreground mb-10">Track your progress and continue where you left off.</p>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <BookOpen className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-xl font-bold text-foreground mb-2">No lessons yet</h2>
        <p className="text-sm text-muted-foreground max-w-xs mb-6">
          Start exploring a subject on the dashboard and your progress will appear here.
        </p>
        <Link to="/">
          <Button className="rounded-xl">Explore subjects</Button>
        </Link>
      </div>
    </div>
  );
}