import LiveCasesSection from '../components/dashboard/LiveCasesSection';

export default function LiveCasesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 md:py-10">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Live Cases</h1>
      <p className="text-muted-foreground mb-8">Real-world events explored through multiple academic lenses.</p>
      <LiveCasesSection />
    </div>
  );
}