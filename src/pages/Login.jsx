import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Loader2, MailCheck } from 'lucide-react';
import { supabase } from '@/api/supabaseClient';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('signin'); // signin | signup | forgot | sent
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'forgot') {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) { setError(error.message); setLoading(false); return; }
      setMode('sent');
      setLoading(false);
      return;
    }

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name.trim() || undefined } },
      });
      if (error) { setError(error.message); setLoading(false); return; }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
    }

    setLoading(false);
  };

  const switchMode = (next) => { setMode(next); setError(''); };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <div className="mb-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-serif text-4xl font-bold text-foreground">Nexus</h1>
          {mode !== 'sent' && (
            <p className="text-sm text-muted-foreground mt-2">
              {mode === 'signin' && 'Welcome back.'}
              {mode === 'signup' && 'Create your account.'}
              {mode === 'forgot' && 'Reset your password.'}
            </p>
          )}
        </div>

        {mode === 'sent' ? (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <MailCheck className="w-6 h-6 text-primary" />
            </div>
            <h2 className="font-serif text-xl font-bold text-foreground">Check your email</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We sent a password reset link to{' '}
              <span className="font-medium text-foreground">{email}</span>.
            </p>
            <button type="button" onClick={() => switchMode('signin')} className="text-sm text-primary hover:underline">
              Back to sign in
            </button>
          </div>
        ) : (
          <>
            {(mode === 'signin' || mode === 'signup') && (
              <>
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.706 17.64 9.2z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {mode !== 'forgot' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder="Minimum 6 characters"
                    className={inputClass}
                  />
                </div>
              )}

              {error && <p className="text-sm text-destructive">{error}</p>}

              {mode === 'signin' && (
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button type="submit" className="w-full rounded-xl py-5 mt-2" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Send reset link' : 'Sign in'}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === 'signin' && (
                <>Don't have an account?{' '}
                  <button type="button" onClick={() => switchMode('signup')} className="text-primary font-medium hover:underline">Create one</button>
                </>
              )}
              {mode === 'signup' && (
                <>Already have an account?{' '}
                  <button type="button" onClick={() => switchMode('signin')} className="text-primary font-medium hover:underline">Sign in</button>
                </>
              )}
              {mode === 'forgot' && (
                <button type="button" onClick={() => switchMode('signin')} className="text-primary font-medium hover:underline">Back to sign in</button>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
