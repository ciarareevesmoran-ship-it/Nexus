import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import SubjectPage from './pages/SubjectPage';
import TopicPage from './pages/TopicPage';
import LearningContent from './pages/LearningContent';
import CaseBuilder from './pages/CaseBuilder';
import LiveCasePage from './pages/LiveCasePage';
import Profile from './pages/Profile';
import MyLearning from './pages/MyLearning';
import CasesPage from './pages/CasesPage';
import LiveCasesPage from './pages/LiveCasesPage';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subject/:subjectId" element={<SubjectPage />} />
        <Route path="/subject/:subjectId/topic/:topicId" element={<TopicPage />} />
        <Route path="/case-builder" element={<CaseBuilder />} />
        <Route path="/live-case/:caseId" element={<LiveCasePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/cases" element={<CasesPage />} />
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
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App