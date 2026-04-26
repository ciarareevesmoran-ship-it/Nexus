import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { SUBJECTS } from '@/lib/subjects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, BarChart3, Crown, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState('');
  const [editingGoals, setEditingGoals] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [me, profiles] = await Promise.all([
        base44.auth.me(),
        base44.entities.UserProfile.list(),
      ]);
      setUser(me);
      if (profiles.length > 0) {
        setProfile(profiles[0]);
        setGoals(profiles[0].learning_goals || '');
      }
      setLoading(false);
    };
    loadData();
  }, []);

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
    <div className="max-w-3xl mx-auto px-6 py-8 md:py-10">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Profile</h1>

      <div className="space-y-6">
        {/* User Info */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-serif text-xl font-bold text-primary">
                {user?.full_name?.charAt(0) || 'N'}
              </span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">{user?.full_name || 'Learner'}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Crown className={cn("w-4 h-4", profile?.plan === 'premium' ? "text-primary" : "text-muted-foreground")} />
            <span className="text-sm font-medium capitalize">{profile?.plan || 'Free'} Plan</span>
          </div>
        </div>

        {/* Interests */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-lg font-bold text-foreground">Your Interests</h3>
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
                      : "bg-background text-muted-foreground border-border hover:border-primary/30"
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
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-lg font-bold text-foreground">Learning Goals</h3>
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
            <p className="text-sm text-muted-foreground">
              {profile?.learning_goals || 'No learning goals set yet. Tap edit to add some.'}
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-lg font-bold text-foreground">Learning Progress</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground mt-1">Lessons completed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground mt-1">Hours studied</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground mt-1">Cases explored</p>
            </div>
          </div>
        </div>

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
  );
}