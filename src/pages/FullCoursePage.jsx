import { useParams, Navigate } from 'react-router-dom';
import { SUBJECTS, SUBJECT_TOPICS, getSubtopics } from '@/lib/subjects';

export default function FullCoursePage() {
  const { subjectId } = useParams();

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const topics = SUBJECT_TOPICS[subjectId] || [];
  const firstTopic = topics[0];
  const firstSubtopic = firstTopic ? getSubtopics(firstTopic.id)[0] : null;

  if (!subject) {
    return <div className="p-10 text-center text-muted-foreground">Subject not found.</div>;
  }

  if (!firstTopic || !firstSubtopic) {
    return <Navigate to={`/subject/${subjectId}`} replace />;
  }

  return (
    <Navigate
      to={`/learn/${subjectId}/${firstTopic.id}/${firstSubtopic.id}?format=text&course=full`}
      replace
    />
  );
}
