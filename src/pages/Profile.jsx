import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { SUBJECTS } from '@/lib/subjects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, BarChart3, Crown, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import BookmarksSection from '../components/profile/BookmarksSection';
import MyNotesSection from '../components/profile/MyNotesSection';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [goals, setGoals] = useState('');
  const [editingGoals, setEditingGoals] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [me, profiles, progressList] = await Promise.all([
        base44.auth.me(),
        base44.entities.UserProfile.list(),
        base44.entities.UserProgress.list(),
      ]);
      setUser(me);
      if (profiles.length > 0) {
        setProfile(profiles[0]);
        setGoals(profiles[0].learning_goals || '');
      }
      if (progressList.length > 0) setProgress(progressList[0]);
      setLoading(false);
    };
    loadData();
  }, []);

  const lessonsCompleted = progress?.lessonsCompleted || 0;
  const casesExploredCount = (progress?.casesExplored || []).length;
  const hoursStudied = Math.round((lessonsCompleted * 15) / 60 * 10) / 10;

  const toggleInterest = async (subjectId) => {
    if (!profile) return;
    const newInterests = profile.interests.includes(subjectId)
      ? profile.interests.filter(i => i !== subjectId)
      : [...profile.interests, subjectId];
    await base44.entities.UserProfile.update(profile.id, { interests: newInterests });
    setProfile(prev => ({ ...prev, interests: newInterests }));
  };

  const saveGoals = async () => {
    if (!profile) return;
    await base44.entities.UserProfile.update(profile.id, { learning_goals: goals });
    setProfile(prev => ({ ...prev, learning_goals: goals }));
    setEditingGoals(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 md:py-14">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-12">Profile</h1>

      <div className="space-y-12">
        {/* User Info — full width */}
        <div className="p-8 md:p-10 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#7B2235] flex items-center justify-center ring-4 ring-[#F2E0E3]">
              <span className="font-serif text-3xl font-bold text-white">
                {user?.full_name?.charAt(0) || 'N'}
              </span>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">{user?.full_name || 'Learner'}</h2>
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

        {/* Second row: Progress (left ~35%) | Interests + Goals stacked (right ~65%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-8 items-start">
          {/* Progress */}
          <div className="p-8 md:p-10 rounded-xl border border-border bg-card self-start">
            <div className="flex items-center gap-2.5 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-2xl font-bold text-foreground">Learning Progress</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center px-3 py-7 rounded-lg bg-[#FAF0F2]">
                <p className="font-serif text-5xl md:text-6xl font-bold text-[#7B2235] leading-none">{lessonsCompleted}</p>
                <p className="text-xs text-muted-foreground mt-3">Lessons completed</p>
              </div>
              <div className="text-center px-3 py-7 rounded-lg bg-[#FAF0F2]">
                <p className="font-serif text-5xl md:text-6xl font-bold text-[#7B2235] leading-none">{hoursStudied}</p>
                <p className="text-xs text-muted-foreground mt-3">Hours studied</p>
              </div>
              <div className="text-center px-3 py-7 rounded-lg bg-[#FAF0F2]">
                <p className="font-serif text-5xl md:text-6xl font-bold text-[#7B2235] leading-none">{casesExploredCount}</p>
                <p className="text-xs text-muted-foreground mt-3">Cases explored</p>
              </div>
            </div>
          </div>

          {/* Right column: Interests + Goals stacked */}
          <div className="space-y-8">
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
          </div>
        </div>

        {/* Third row: Bookmarks | My Notes (50/50) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <BookmarksSection />
          <MyNotesSection />
        </div>

        <div className="pt-4">
          <Button
            variant="ghost"
            className="text-muted-foreground"
            onClick={() => base44.auth.logout()}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}