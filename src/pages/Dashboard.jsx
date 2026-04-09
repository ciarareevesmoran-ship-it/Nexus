import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import SubjectGrid from '../components/dashboard/SubjectGrid';
import LiveCasesSection from '../components/dashboard/LiveCasesSection';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkOnboarding = async () => {
      const profiles = await base44.entities.UserProfile.list();
      if (profiles.length === 0) {
        navigate('/onboarding');
        return;
      }
      setHasProfile(true);
      setLoading(false);
    };
    checkOnboarding();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 md:py-10">
      <WelcomeHeader />
      <SubjectGrid />
      <LiveCasesSection />
    </div>
  );
}