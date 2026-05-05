import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SUBJECTS, SUBJECT_TOPICS, getSubtopics } from '@/lib/subjects';
import { ChevronLeft, PanelLeftClose, PanelLeftOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LearningToolsPanel from '../components/learning/LearningToolsPanel';
import ContentDisplay from '../components/learning/ContentDisplay';
import AiTutor from '../components/ai-tutor/AiTutor';
import BookmarkButton from '../components/learning/BookmarkButton';
import learningContent from '@/data/learningContent.json';
import { logLessonCompleted, setLastLessonForSubject } from '@/lib/userTracking';
import { useAuth } from '@/lib/AuthContext';

function buildLessonUrl(subjectId, topicId, subtopicId, format, isFullCourse, completed) {
  const params = new URLSearchParams();
  params.set('format', format);
  if (isFullCourse) params.set('course', 'full');
  if (completed) params.set('completed', completed);
  return `/learn/${subjectId}/${topicId}/${subtopicId}?${params.toString()}`;
}

function TopicCompletionScreen({ subject, topic, subtopics, nextTopic, onContinue }) {
  const summaryItems = subtopics
    .map((s) => {
      const entry = learningContent[s.id];
      const takeaways = Array.isArray(entry?.key_takeaways) ? entry.key_takeaways : [];
      return { name: s.name, description: s.description, takeaways };
    });

  const flatTakeaways = summaryItems.flatMap((s) => s.takeaways).filter(Boolean);

  return (
    <>
      <div className="flex-1 px-6 md:px-10 py-10 md:py-14">
        <div className="mx-auto" style={{ maxWidth: 700, fontFamily: 'Inter, system-ui, sans-serif' }}>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              Topic complete
            </span>
            <span className="text-xs text-muted-foreground">{subject.name}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Well done! You've just completed {topic.name}
          </h1>
          <p className="text-foreground/80 mb-10" style={{ fontSize: '17px', lineHeight: 1.7 }}>
            Here's a summary of what you've learned.
          </p>

          {flatTakeaways.length > 0 ? (
            <ul className="space-y-3 mb-10">
              {flatTakeaways.map((t, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-foreground"
                  style={{ fontSize: '17px', lineHeight: 1.7 }}
                >
                  <span className="text-[#7B2235] font-bold shrink-0">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-3 mb-10">
              {summaryItems.map((s, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-foreground"
                  style={{ fontSize: '17px', lineHeight: 1.7 }}
                >
                  <span className="text-[#7B2235] font-bold shrink-0">•</span>
                  <span>
                    <span className="font-semibold">{s.name}</span>
                    {s.description ? <span className="text-foreground/80"> — {s.description}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {nextTopic && (
        <div className="flex items-stretch shrink-0" style={{ background: '#671D2C' }}>
          <div className="flex-1" />
          <button
            onClick={onContinue}
            className="flex-1 flex flex-col items-end px-6 py-4 text-white hover:brightness-110 transition-all text-right"
          >
            <span className="text-xs opacity-70 mb-0.5">Next →</span>
            <span className="font-serif font-bold text-sm leading-snug">Continue to {nextTopic.name}</span>
          </button>
        </div>
      )}
    </>
  );
}

function SubjectCompletionScreen({ subject, onContinue }) {
  return (
    <div className="px-6 md:px-10 py-10 md:py-14">
      <div className="mx-auto" style={{ maxWidth: 700, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            Subject complete
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-7 h-7 text-[#7B2235]" />
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Congratulations! You have completed {subject.name}
          </h1>
        </div>
        <p className="text-foreground/80 mb-10" style={{ fontSize: '17px', lineHeight: 1.7 }}>
          Explore the subject further by combining it with others and creating your own case.
        </p>

        <Button
          onClick={onContinue}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-6 rounded-xl"
        >
          Go to Case Builder
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function SectionEndScreen({ subject, onHome, onMyLearning }) {
  return (
    <div className="px-6 md:px-10 py-10 md:py-14">
      <div className="mx-auto" style={{ maxWidth: 700, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            Section explored
          </span>
          <span className="text-xs text-muted-foreground">{subject.name}</span>
        </div>

        <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Nice work
        </h1>
        <p className="text-foreground/80 mb-10" style={{ fontSize: '17px', lineHeight: 1.7 }}>
          You've explored part of this subject. Return to your homepage to continue learning,
          or track your progress under "My Learning".
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onHome}
            variant="outline"
            className="font-semibold px-6 py-6 rounded-xl"
          >
            Back to homepage
          </Button>
          <Button
            onClick={onMyLearning}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-6 rounded-xl"
          >
            Go to My Learning
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LearningContent() {
  const { subjectId, topicId, subtopicId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [toolsOpen, setToolsOpen] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const format = urlParams.get('format') || 'text';
  const isFullCourse = urlParams.get('course') === 'full';
  const completed = urlParams.get('completed');

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const topics = SUBJECT_TOPICS[subjectId] || [];
  const topic = topics.find(t => t.id === topicId);
  const topicIndex = topics.findIndex(t => t.id === topicId);
  const subtopics = getSubtopics(topicId);
  const subtopic = subtopics.find(s => s.id === subtopicId);
  const subtopicIndex = subtopics.findIndex(s => s.id === subtopicId);

  const isLastInTopic = subtopicIndex >= 0 && subtopicIndex === subtopics.length - 1;
  const isLastTopic = topicIndex >= 0 && topicIndex === topics.length - 1;
  const isFirstTopic = topicIndex === 0;

  // Previous section — crosses topic boundaries in full course mode
  const prevTarget = (() => {
    if (subtopicIndex > 0) {
      return { topicId, subtopic: subtopics[subtopicIndex - 1] };
    }
    if (isFullCourse && !isFirstTopic) {
      const prevTopic = topics[topicIndex - 1];
      const prevSubs = getSubtopics(prevTopic.id);
      const last = prevSubs[prevSubs.length - 1];
      return last ? { topicId: prevTopic.id, subtopic: last } : null;
    }
    return null;
  })();

  // Next section — within topic, then completion screens at boundaries
  const nextTopic = !isLastTopic && topicIndex >= 0 ? topics[topicIndex + 1] : null;
  const nextWithinTopic = !isLastInTopic && subtopicIndex >= 0
    ? { topicId, subtopic: subtopics[subtopicIndex + 1] }
    : null;

  const lessonUrl = subject && topic && subtopic
    ? `/learn/${subjectId}/${topicId}/${subtopicId}`
    : null;

  useEffect(() => {
    if (!subject || !topic || !subtopic) return;
    if (completed) return;
    setLastLessonForSubject(subjectId, {
      lessonId: subtopicId,
      lessonName: subtopic.name,
      topicId,
      topicName: topic.name,
      url: `${lessonUrl}?format=${format}${isFullCourse ? '&course=full' : ''}`,
    });
    if (!user) return;
    logLessonCompleted({
      lessonId: subtopicId,
      lessonName: subtopic.name,
      subjectId,
      topicId,
    }).catch(() => {});
  }, [subjectId, topicId, subtopicId, user, completed]);

  if (!subject || !topic || !subtopic) {
    return <div className="p-10 text-center text-muted-foreground">Content not found.</div>;
  }

  const goToTopicOverview = () => navigate(`/subject/${subjectId}/topic/${topicId}`);

  const goPrev = () => {
    if (!prevTarget) return;
    navigate(buildLessonUrl(subjectId, prevTarget.topicId, prevTarget.subtopic.id, format, isFullCourse, null));
  };

  const goNext = () => {
    if (nextWithinTopic) {
      navigate(buildLessonUrl(subjectId, nextWithinTopic.topicId, nextWithinTopic.subtopic.id, format, isFullCourse, null));
      return;
    }
    // At end of topic — show completion screen
    if (isFullCourse) {
      const which = isLastTopic ? 'subject' : 'topic';
      navigate(buildLessonUrl(subjectId, topicId, subtopicId, format, isFullCourse, which));
      return;
    }
    navigate(buildLessonUrl(subjectId, topicId, subtopicId, format, isFullCourse, 'section'));
  };

  const handleContinueToNextTopic = () => {
    if (!nextTopic) return;
    const nextSubs = getSubtopics(nextTopic.id);
    const first = nextSubs[0];
    if (!first) return;
    navigate(buildLessonUrl(subjectId, nextTopic.id, first.id, format, true, null));
  };

  const showingCompletion = Boolean(completed);

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-background shrink-0">
        <button
          onClick={goToTopicOverview}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Back to topic overview"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-sm overflow-hidden">
          <span className="text-muted-foreground truncate">{subject.name}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground truncate">{topic.name}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground truncate">{subtopic.name}</span>
        </div>
        <div className="ml-auto shrink-0 flex items-center gap-1">
          {!showingCompletion && (
            <BookmarkButton
              variant="icon"
              bookmark={{
                subjectId,
                subjectName: subject.name,
                topicId,
                topicName: topic.name,
                lessonId: subtopicId,
                lessonName: subtopic.name,
                contextType: 'lesson',
                url: `${lessonUrl}?format=${format}${isFullCourse ? '&course=full' : ''}`,
              }}
            />
          )}
          {!showingCompletion && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setToolsOpen(!toolsOpen)}
              className="hidden md:flex items-center gap-2 text-muted-foreground"
            >
              {toolsOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
              <span className="text-xs">Learning Tools</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main content + tools panel side by side */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tools panel — 42% width, scrollable, pushes content */}
        {toolsOpen && !showingCompletion && (
          <div className="hidden md:flex flex-col w-[42%] shrink-0 border-r border-border bg-card overflow-y-auto">
            <LearningToolsPanel
              subtopic={subtopic}
              onClose={() => setToolsOpen(false)}
              noteContext={{
                contextType: 'subject',
                contextId: subjectId,
                contextName: subject.name,
              }}
            />
          </div>
        )}

        {/* Reading area — fills remaining space */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {completed === 'topic' ? (
            <TopicCompletionScreen
              subject={subject}
              topic={topic}
              subtopics={subtopics}
              nextTopic={nextTopic}
              onContinue={handleContinueToNextTopic}
            />
          ) : completed === 'subject' ? (
            <SubjectCompletionScreen
              subject={subject}
              onContinue={() => navigate('/case-builder')}
            />
          ) : completed === 'section' ? (
            <SectionEndScreen
              subject={subject}
              onHome={() => navigate('/')}
              onMyLearning={() => navigate('/my-learning')}
            />
          ) : (
            <>
              <div className="flex-1">
                <ContentDisplay subtopic={subtopic} topic={topic} subject={subject} format={format} />
              </div>

              {/* Bottom chapter navigation — stays within the reading column */}
              <div className="flex items-stretch shrink-0" style={{ background: '#671D2C' }}>
                {prevTarget ? (
                  <button
                    onClick={goPrev}
                    className="flex-1 flex flex-col items-start px-6 py-4 text-white hover:brightness-110 transition-all text-left"
                  >
                    <span className="text-xs opacity-70 mb-0.5">← Previous</span>
                    <span className="font-serif font-bold text-sm leading-snug">{prevTarget.subtopic.name}</span>
                  </button>
                ) : <div className="flex-1" />}

                <div className="w-px bg-white/20 self-stretch" />

                <button
                  onClick={goNext}
                  className="flex-1 flex flex-col items-end px-6 py-4 text-white hover:brightness-110 transition-all text-right"
                >
                  <span className="text-xs opacity-70 mb-0.5">Next →</span>
                  <span className="font-serif font-bold text-sm leading-snug">
                    {nextWithinTopic
                      ? nextWithinTopic.subtopic.name
                      : isFullCourse
                        ? (isLastTopic ? `Finish ${subject.name}` : `Complete ${topic.name}`)
                        : 'Finish section'}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* AI Tutor — context-aware with current subtopic */}
      {!showingCompletion && <AiTutor subtopicName={subtopic.name} buttonBottom="bottom-20" />}
    </div>
  );
}
