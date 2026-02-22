import { useState } from 'react';
import Header from './components/layout/Header'
import Sidebar from './components/layout/LeftSidebar'
import DashboardMainContent from './components/layout/DashboardMainContent'
import AegisOverlay from './components/dashboard/AegisOverlay'
import ChatPage from './components/dashboard/ChatPage'
import AISupportPage from './components/dashboard/AISupportPage'
import AppointmentsPage from './components/dashboard/AppointmentsPage'
import StatisticsPage from './components/dashboard/StatisticsPage'
import CalendarPage from './components/dashboard/CalendarPage'
import SettingsPage from './components/dashboard/SettingsPage'
import RightSidebar from './components/layout/RightSidebar'
import LoginPage from './components/auth/LoginPage'
import SignupPage from './components/auth/SignupPage'
import OnboardingPage from './components/auth/OnboardingPage'
import DeviceConnectionModal from './components/dashboard/DeviceConnectionModal'
import { ProtectedRoute, PatientRoute, GuestRoute } from './components/auth/RouteGuards'
import './App.css'
import { HistoryProvider } from './context/HistoryContext';
import { AppointmentsProvider } from './context/AppointmentsContext';
import { AuthProvider } from './context/AuthContext';
import { DoctorProvider } from './context/DoctorContext';
import DoctorPortal from './components/doctor/DoctorPortal';
import DoctorChat from './components/dashboard/DoctorChat';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

// Pages that should show the app shell (sidebar + header)
const SHELL_PATHS = ['/', '/chat', '/ai-support', '/appointments', '/statistics', '/doctor', '/doctor-chat'];

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthPage = ['/login', '/signup', '/onboarding'].includes(location.pathname);

  // Track device modal state based on navigation from onboarding
  const [showDeviceModal, setShowDeviceModal] = useState(false);

  useEffect(() => {
    if (location.state?.showDeviceModal) {
      setShowDeviceModal(true);
      // Clean up the location state so it doesn't trigger again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F6FAFF] text-slate-800">
      <AegisOverlay />

      {showDeviceModal && (
        <DeviceConnectionModal onComplete={() => setShowDeviceModal(false)} />
      )}

      {/* Auth pages: full-screen, no sidebar */}
      {isAuthPage ? (
        <div className={`flex-1 overflow-y-auto ${showDeviceModal ? 'blur-md pointer-events-none opacity-50 transition-all' : ''}`}>
          <Routes>
            <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
            <Route path="/signup" element={<GuestRoute><SignupPage /></GuestRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
          </Routes>
        </div>
      ) : (
        <div className={`flex flex-1 w-full h-full ${showDeviceModal ? 'blur-md pointer-events-none opacity-50 transition-all duration-500' : 'transition-all duration-500'}`}>
          {/* Mobile Sidebar Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Left Sidebar (Responsive) */}
          <div className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:flex-shrink-0 md:block
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <Sidebar onCloseMobileMenu={() => setIsMobileMenuOpen(false)} />
          </div>

          {/* Main Content Area (flexes to fill remaining space) */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
            <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <Routes>
                <Route path="/" element={<PatientRoute><DashboardMainContent /></PatientRoute>} />
                <Route path="/calendar" element={<PatientRoute><CalendarPage /></PatientRoute>} />
                <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                <Route path="/ai-support" element={<ProtectedRoute><AISupportPage /></ProtectedRoute>} />
                <Route path="/appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
                <Route path="/statistics" element={<ProtectedRoute><StatisticsPage /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                <Route path="/doctor-chat" element={<PatientRoute><DoctorChat /></PatientRoute>} />
                <Route path="/doctor" element={<ProtectedRoute><DoctorProvider><DoctorPortal /></DoctorProvider></ProtectedRoute>} />
                {/* Catch-all → login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          </div>

          {/* Right Sidebar - dashboard only */}
          {isDashboard && (
            <div className="w-80 lg:w-80 xl:w-80 2xl:w-96 flex-shrink-0 overflow-y-auto scrollbar-hide border-l border-slate-200 hidden xl:block bg-white shadow-lg">
              <RightSidebar />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <HistoryProvider>
        <AppointmentsProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </AppointmentsProvider>
      </HistoryProvider>
    </AuthProvider>
  );
}

export default App;