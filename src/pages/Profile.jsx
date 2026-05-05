import { useEffect, useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { useAuth } from '@/lib/AuthContext';
import { SUBJECTS } from '@/lib/subjects';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, BarChart3, Crown, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import BookmarksSection from '../components/profile/BookmarksSection';
import MyNotesSection from '../components/profile/MyNotesSection';
import { toast } from '@/components/ui/use-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [goals, setGoals] = useState('');
  const [editingGoals, setEditingGoals] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      const [profileRes, progressRes] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('user_progress').select('*').eq('user_id', user.id).maybeSingle(),
      ]);
      if (profileRes.error) {
        console.error('user_profiles SELECT error:', profileRes.error);
        setLoadError(profileRes.error.message || 'Could not load your profile.');
        setLoading(false);
        return;
      }
      if (progressRes.error) {
        console.error('user_progress SELECT error:', progressRes.error);
      }
      if (profileRes.data) {
        setProfile(profileRes.data);
        setGoals(profileRes.data.learning_goals || '');
      }
      if (progressRes.data) setProgress(progressRes.data);
      setLoading(false);
    };
    loadData();
  }, [user]);

  const lessonsCompleted = progress?.lessons_completed || 0;
  const casesExploredCount = (progress?.cases_explored || []).length;
  const hoursStudied = Math.round((lessonsCompleted * 15) / 60 * 10) / 10;

  const toggleInterest = async (subjectId) => {
    if (!profile) return;
    const interests = profile.interests || [];
    const newInterests = interests.includes(subjectId)
      ? interests.filter(i => i !== subjectId)
      : [...interests, subjectId];
    const { error } = await supabase
      .from('user_profiles')
      .update({ interests: newInterests })
      .eq('id', profile.id)
      .eq('user_id', user.id);
    if (error) {
      toast({ title: 'Could not update interests', description: error.message, variant: 'destructive' });
      return;
    }
    setProfile(prev => ({ ...prev, interests: newInterests }));
  };

  const saveGoals = async () => {
    if (!profile) return;
    const { error } = await supabase
      .from('user_profiles')
      .update({ learning_goals: goals })
      .eq('id', profile.id)
      .eq('user_id', user.id);
    if (error) {
      toast({ title: 'Could not save goals', description: error.message, variant: 'destructive' });
      return;
    }
    setProfile(prev => ({ ...prev, learning_goals: goals }));
    setEditingGoals(false);
  };

  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Learner';

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
          We couldn't load your profile: {loadError}
        </p>
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-12">Profile</h1>

      <div className="space-y-12">
        {/* User Info */}
        <div className="p-8 md:p-10 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#7B2235] flex items-center justify-center ring-4 ring-[#F2E0E3]">
              <span className="font-serif text-3xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">{name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2E0E3] text-[#6B1F2A] text-xs font-semibold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              {profile?.plan === 'premium' ? 'Premium' : 'Free'} Plan
            </span>
          </div>
        </div>

        {/* Interests */}
        <div className="p-8 md:p-10 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2.5 mb-6">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-2xl font-bold text-foreground">Your Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((subject) => {
              const isSelected = profile?.interests?.includes(subject.id);
              return (
                <button
                  key={subject.id}
                  onClick={() => toggleInterest(subject.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
                    isSelected
                      ? "bg-[#F2E0E3] text-[#6B1F2A] border-[#F2E0E3]"
                      : "bg-background text-foreground/70 border-[#E5DDD0] hover:border-primary/40"
                  )}
                >
                  {subject.name}
                  {isSelected && <X className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Goals */}
        <div className="p-8 md:p-10 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-2xl font-bold text-foreground">Learning Goals</h3>
            </div>
            {!editingGoals && (
              <Button variant="ghost" size="sm" onClick={() => setEditingGoals(true)}>Edit</Button>
            )}
          </div>
          {editingGoals ? (
            <div className="space-y-3">
              <textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full h-24 p-3 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="What do you want to learn and why?"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={saveGoals}>Save</Button>
                <Button variant="ghost" size="sm" onClick={() => { setEditingGoals(false); setGoals(profile?.learning_goals || ''); }}>Cancel</Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profile?.learning_goals || 'No learning goals set yet. Tap edit to add some.'}
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="p-8 md:p-10 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2.5 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-2xl font-bold text-foreground">Learning Progress</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-5 rounded-lg bg-[#FAF0F2]">
              <p className="font-serif text-4xl md:text-5xl font-bold text-[#7B2235] leading-none">{lessonsCompleted}</p>
              <p className="text-xs text-muted-foreground mt-2">Lessons completed</p>
            </div>
            <div className="text-center p-5 rounded-lg bg-[#FAF0F2]">
              <p className="font-serif text-4xl md:text-5xl font-bold text-[#7B2235] leading-none">{hoursStudied}</p>
              <p className="text-xs text-muted-foreground mt-2">Hours studied</p>
            </div>
            <div className="text-center p-5 rounded-lg bg-[#FAF0F2]">
              <p className="font-serif text-4xl md:text-5xl font-bold text-[#7B2235] leading-none">{casesExploredCount}</p>
              <p className="text-xs text-muted-foreground mt-2">Cases explored</p>
            </div>
          </div>
        </div>

        <BookmarksSection />
        <MyNotesSection />

        <div className="pt-4">
          <Button variant="ghost" className="text-muted-foreground" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}
