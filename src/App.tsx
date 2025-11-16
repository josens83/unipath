import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/common/Navbar';

// Eager-loaded pages (critical for initial load)
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Lazy-loaded pages (code splitting for better performance)
const StudentDashboard = lazy(() => import('./pages/StudentDashboard').then(m => ({ default: m.StudentDashboard })));
const ParentDashboard = lazy(() => import('./pages/ParentDashboard').then(m => ({ default: m.ParentDashboard })));
const TutorDashboard = lazy(() => import('./pages/TutorDashboard').then(m => ({ default: m.TutorDashboard })));
const TutoringSearch = lazy(() => import('./pages/TutoringSearch').then(m => ({ default: m.TutoringSearch })));
const AIConsulting = lazy(() => import('./pages/AIConsulting').then(m => ({ default: m.AIConsulting })));
const Community = lazy(() => import('./pages/Community').then(m => ({ default: m.Community })));
const MyPage = lazy(() => import('./pages/MyPage').then(m => ({ default: m.MyPage })));
const Pricing = lazy(() => import('./pages/Pricing').then(m => ({ default: m.Pricing })));
const Schedule = lazy(() => import('./pages/Schedule').then(m => ({ default: m.Schedule })));
const VideoClassroom = lazy(() => import('./pages/VideoClassroom').then(m => ({ default: m.VideoClassroom })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">로딩 중...</p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

// Dashboard Router based on user role
const DashboardRouter = () => {
  const { user } = useAuth();

  if (user?.role === 'parent') {
    return <ParentDashboard />;
  }

  if (user?.role === 'tutor') {
    return <TutorDashboard />;
  }

  return <StudentDashboard />;
};

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutoring"
            element={
              <ProtectedRoute>
                <TutoringSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutoring/search"
            element={
              <ProtectedRoute>
                <TutoringSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutoring/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutoring/classroom"
            element={
              <ProtectedRoute>
                <VideoClassroom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consulting"
            element={
              <ProtectedRoute>
                <AIConsulting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consulting/ai-analysis"
            element={
              <ProtectedRoute>
                <AIConsulting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
