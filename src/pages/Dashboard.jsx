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

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
      <WelcomeHeader />
      <SubjectGrid />
      <LiveCasesSection />
    </div>
  );
}
