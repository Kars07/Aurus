import Header from './components/layout/Header'
import Sidebar from './components/layout/LeftSidebar'
import DashboardMainContent from './components/layout/DashboardMainContent'
import AegisOverlay from './components/dashboard/AegisOverlay'
import ChatPage from './components/dashboard/ChatPage'
import AISupportPage from './components/dashboard/AISupportPage'
import AppointmentsPage from './components/dashboard/AppointmentsPage'
import StatisticsPage from './components/dashboard/StatisticsPage'
import RightSidebar from './components/layout/RightSidebar'
import './App.css'
import { HistoryProvider } from './context/HistoryContext';
import { AppointmentsProvider } from './context/AppointmentsContext';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F6FAFF] text-slate-800">
      <AegisOverlay />
      
      {/* Left Sidebar (fixed width) */}
      <div className="w-64 flex-shrink-0 overflow-y-auto scrollbar-hide border-r border-slate-200 hidden md:block bg-white">
        <Sidebar />
      </div>

      {/* Main Content Area (flexes to fill remaining space) */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Header />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Routes>
            <Route path="/" element={<DashboardMainContent />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/ai-support" element={<AISupportPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </div>
      </div>

      {/* Right Sidebar (fixed width) - only show on Dashboard */}
      {isDashboard && (
        <div className="w-80 lg:w-80 xl:w-80 2xl:w-96 flex-shrink-0 overflow-y-auto scrollbar-hide border-l border-slate-200 hidden xl:block bg-white shadow-lg">
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