import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const loading_spinner = (
  <div className="min-h-screen flex items-center justify-center bg-[#F6FAFF]">
    <div className="w-10 h-10 border-4 border-[#3835AC] border-t-transparent rounded-full animate-spin" />
  </div>
);

// Redirect to /login if not authenticated
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return loading_spinner;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Redirect to /onboarding if patient hasn't completed it
export const PatientRoute = ({ children }) => {
  const { isAuthenticated, loading, user, isPatient } = useAuth();
  if (loading) return loading_spinner;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (isPatient && !user?.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return children;
};

// Redirect to / if already logged in (for login/signup pages)
export const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return loading_spinner;
  if (isAuthenticated) {
    if (user?.role === 'doctor') return <Navigate to="/doctor" replace />;
    if (!user?.onboardingComplete) return <Navigate to="/onboarding" replace />;
    return <Navigate to="/" replace />;
  }
  return children;
};
