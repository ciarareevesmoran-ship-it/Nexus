import { base44 } from '@/api/base44Client';

// ─── PROGRESS ───────────────────────────────────────────────

export async function getOrCreateProgress() {
  const list = await base44.entities.UserProgress.list();
  if (list.length > 0) return list[0];
  return await base44.entities.UserProgress.create({
    lessonsCompleted: 0,
    completedLessons: [],
    quizScores: [],
    casesExplored: [],
    lastUpdated: new Date().toISOString(),
  });
}

export async function logLessonCompleted({ lessonId, lessonName, subjectId, topicId }) {
  const progress = await getOrCreateProgress();
  const already = (progress.completedLessons || []).some(l => l.lessonId === lessonId);
  if (already) return progress;
  const completedLessons = [
    ...(progress.completedLessons || []),
    { lessonId, lessonName, subjectId, topicId, completedAt: new Date().toISOString() },
  ];
  return await base44.entities.UserProgress.update(progress.id, {
    lessonsCompleted: (progress.lessonsCompleted || 0) + 1,
    completedLessons,
    lastUpdated: new Date().toISOString(),
  });
}

export async function logQuizScore({ quizName, score, total }) {
  const progress = await getOrCreateProgress();
  const quizScores = [
    ...(progress.quizScores || []),
    { quizName, score, total, date: new Date().toISOString() },
  ];
  return await base44.entities.UserProgress.update(progress.id, {
    quizScores,
    lastUpdated: new Date().toISOString(),
  });
}

export async function logCaseExplored({ caseId, caseName }) {
  const progress = await getOrCreateProgress();
  const already = (progress.casesExplored || []).some(c => c.caseId === caseId);
  if (already) return progress;
  const casesExplored = [
    ...(progress.casesExplored || []),
    { caseId, caseName, openedAt: new Date().toISOString() },
  ];
  return await base44.entities.UserProgress.update(progress.id, {
    casesExplored,
    lastUpdated: new Date().toISOString(),
  });
}

// ─── BOOKMARKS ──────────────────────────────────────────────

export async function findBookmark(url) {
  const list = await base44.entities.UserBookmarks.filter({ url });
  return list[0] || null;
}

export async function toggleBookmark(bookmark) {
  const existing = await findBookmark(bookmark.url);
  if (existing) {
    await base44.entities.UserBookmarks.delete(existing.id);
    return null;
  }
  return await base44.entities.UserBookmarks.create(bookmark);
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
    const data = JSON.parse(raw);
    return data[subjectId] || null;
  } catch (e) {
    return null;
  }
}