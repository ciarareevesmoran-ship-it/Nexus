import { supabase } from '@/api/supabaseClient';
import { toast } from '@/components/ui/use-toast';

async function getUserId() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}

function notifyError(title, error) {
  console.error(`${title}:`, error);
  toast({ title, description: error?.message, variant: 'destructive' });
}

// ─── PROGRESS ───────────────────────────────────────────────

export async function getOrCreateProgress() {
  const userId = await getUserId();
  if (!userId) return null;

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    notifyError('Could not load progress', error);
    return null;
  }
  if (data) return data;

  const { data: created, error: insertError } = await supabase
    .from('user_progress')
    .insert({
      user_id: userId,
      lessons_completed: 0,
      completed_lessons: [],
      quiz_scores: [],
      cases_explored: [],
      last_updated: new Date().toISOString(),
    })
    .select()
    .single();

  if (insertError) {
    notifyError('Could not create progress record', insertError);
    return null;
  }
  return created;
}

export async function logLessonCompleted({ lessonId, lessonName, subjectId, topicId }) {
  const progress = await getOrCreateProgress();
  if (!progress) return null;

  const already = (progress.completed_lessons || []).some(l => l.lessonId === lessonId);
  if (already) return progress;

  const completed_lessons = [
    ...(progress.completed_lessons || []),
    { lessonId, lessonName, subjectId, topicId, completedAt: new Date().toISOString() },
  ];

  const { data, error } = await supabase
    .from('user_progress')
    .update({
      lessons_completed: (progress.lessons_completed || 0) + 1,
      completed_lessons,
      last_updated: new Date().toISOString(),
    })
    .eq('id', progress.id)
    .select()
    .single();

  if (error) {
    notifyError('Could not save lesson progress', error);
    return null;
  }
  return data;
}

export async function logQuizScore({ quizName, score, total }) {
  const progress = await getOrCreateProgress();
  if (!progress) return null;

  const quiz_scores = [
    ...(progress.quiz_scores || []),
    { quizName, score, total, date: new Date().toISOString() },
  ];

  const { data, error } = await supabase
    .from('user_progress')
    .update({ quiz_scores, last_updated: new Date().toISOString() })
    .eq('id', progress.id)
    .select()
    .single();

  if (error) {
    notifyError('Could not save quiz score', error);
    return null;
  }
  return data;
}

export async function logCaseExplored({ caseId, caseName }) {
  const progress = await getOrCreateProgress();
  if (!progress) return null;

  const already = (progress.cases_explored || []).some(c => c.caseId === caseId);
  if (already) return progress;

  const cases_explored = [
    ...(progress.cases_explored || []),
    { caseId, caseName, openedAt: new Date().toISOString() },
  ];

  const { data, error } = await supabase
    .from('user_progress')
    .update({ cases_explored, last_updated: new Date().toISOString() })
    .eq('id', progress.id)
    .select()
    .single();

  if (error) {
    notifyError('Could not save case progress', error);
    return null;
  }
  return data;
}

// ─── BOOKMARKS ──────────────────────────────────────────────

export async function findBookmark(url) {
  const userId = await getUserId();
  if (!userId) return null;

  const { data, error } = await supabase
    .from('user_bookmarks')
    .select('*')
    .eq('user_id', userId)
    .eq('url', url)
    .maybeSingle();

  if (error) {
    notifyError('Could not check bookmark', error);
    return null;
  }
  return data || null;
}

export async function toggleBookmark(bookmark) {
  const userId = await getUserId();
  if (!userId) return null;

  const existing = await findBookmark(bookmark.url);

  if (existing) {
    const { error } = await supabase
      .from('user_bookmarks')
      .delete()
      .eq('id', existing.id)
      .eq('user_id', userId);
    if (error) {
      notifyError('Could not remove bookmark', error);
      return existing;
    }
    return null;
  }

  const { data, error } = await supabase
    .from('user_bookmarks')
    .insert({
      user_id: userId,
      url: bookmark.url,
      subject_id: bookmark.subjectId,
      subject_name: bookmark.subjectName,
      topic_id: bookmark.topicId,
      topic_name: bookmark.topicName,
      lesson_id: bookmark.lessonId,
      lesson_name: bookmark.lessonName,
      context_type: bookmark.contextType,
    })
    .select()
    .single();

  if (error) {
    notifyError('Could not save bookmark', error);
    return null;
  }
  return data;
}

// ─── RESUME (last visited lesson per subject) ───────────────

const LAST_LESSON_KEY = 'nexus_last_lesson_by_subject';

export function setLastLessonForSubject(subjectId, lesson) {
  try {
    const raw = localStorage.getItem(LAST_LESSON_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[subjectId] = { ...lesson, visitedAt: new Date().toISOString() };
    localStorage.setItem(LAST_LESSON_KEY, JSON.stringify(data));
  } catch (e) { /* ignore */ }
}

export function getLastLessonForSubject(subjectId) {
  try {
    const raw = localStorage.getItem(LAST_LESSON_KEY);
    if (!raw) return null;
    return JSON.parse(raw)[subjectId] || null;
  } catch (e) {
    return null;
  }
}
