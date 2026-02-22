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
import './App.css'
import { HistoryProvider } from './context/HistoryContext';
import { AppointmentsProvider } from './context/AppointmentsContext';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F6FAFF] text-slate-800">
      <AegisOverlay />

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
            <Route path="/" element={<DashboardMainContent />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/ai-support" element={<AISupportPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>

      {/* Right Sidebar (fixed width) - only show on Dashboard */}
      {isDashboard && (
        <div className="w-80 lg:w-80 xl:w-80 2xl:w-96 flex-shrink-0 border-l border-slate-200 hidden xl:block bg-white shadow-lg">
          <RightSidebar />
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <HistoryProvider>
      <AppointmentsProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppointmentsProvider>
    </HistoryProvider>
  );
}

export default App;