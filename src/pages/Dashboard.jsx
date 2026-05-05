import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import SubjectGrid from '../components/dashboard/SubjectGrid';
import LiveCasesSection from '../components/dashboard/LiveCasesSection';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const checkOnboarding = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) {
        console.error('user_profiles SELECT error:', error);
        setLoadError(error.message || 'Could not load your profile.');
        setLoading(false);
        return;
      }
      if (!data) {
        navigate('/onboarding');
        return;
      }
      setLoading(false);
    };
    checkOnboarding();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Something went wrong</h2>
        <p className="text-sm text-muted-foreground mb-6">
          We couldn't load your dashboard: {loadError}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
      <WelcomeHeader />
      <SubjectGrid />
      <LiveCasesSection />
    </div>
  );
}
