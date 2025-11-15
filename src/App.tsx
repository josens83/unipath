import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navbar } from './components/common/Navbar';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { ParentDashboard } from './pages/ParentDashboard';
import { TutoringSearch } from './pages/TutoringSearch';
import { AIConsulting } from './pages/AIConsulting';
import { Community } from './pages/Community';
import { MyPage } from './pages/MyPage';

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

  return <StudentDashboard />;
};

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

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
          path="/tutoring/classroom"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-4">화상수업 준비 중</h1>
                  <p className="text-gray-600">WebRTC 기반 화상수업 기능이 곧 추가됩니다.</p>
                </div>
              </div>
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
