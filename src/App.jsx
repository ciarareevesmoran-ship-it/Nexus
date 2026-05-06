import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import AppLayout from './components/layout/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import SubjectPage from './pages/SubjectPage';
import TopicPage from './pages/TopicPage';
import LearningContent from './pages/LearningContent';
import CaseBuilder from './pages/CaseBuilder';
import LiveCasePage from './pages/LiveCasePage';
import Profile from './pages/Profile';
import MyLearning from './pages/MyLearning';
import LiveCasesPage from './pages/LiveCasesPage';
import FullCoursePage from './pages/FullCoursePage';
import ResetPassword from './pages/ResetPassword';

const AuthenticatedApp = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subject/:subjectId" element={<SubjectPage />} />
        <Route path="/subject/:subjectId/full-course" element={<FullCoursePage />} />
        <Route path="/subject/:subjectId/topic/:topicId" element={<TopicPage />} />
        <Route path="/case-builder" element={<CaseBuilder />} />
        <Route path="/live-case/:caseId" element={<LiveCasePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/cases" element={<Navigate to="/case-builder" replace />} />
        <Route path="/live-cases" element={<LiveCasesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
      <Route path="/learn/:subjectId/:topicId/:subtopicId" element={<LearningContent />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/*" element={<AuthenticatedApp />} />
          </Routes>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
