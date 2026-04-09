import { Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CasesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 md:py-10">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Cases</h1>
      <p className="text-muted-foreground mb-10">Your cross-disciplinary cases combine two subjects into one learning path.</p>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <Layers className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-xl font-bold text-foreground mb-2">No cases created</h2>
        <p className="text-sm text-muted-foreground max-w-xs mb-6">
          Head to the dashboard, hover over a subject, and click the circle icon to start combining subjects.
        </p>
        <Link to="/">
          <Button className="rounded-xl">Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}