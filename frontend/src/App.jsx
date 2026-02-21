import Header from './components/layout/Header'
import Sidebar from './components/layout/LeftSidebar'
import DashboardMainContent from './components/layout/DashboardMainContent'
import AegisOverlay from './components/dashboard/AegisOverlay'
import ChatPage from './components/dashboard/ChatPage'
import AISupportPage from './components/dashboard/AISupportPage'
import './App.css'
import { HistoryProvider } from './context/HistoryContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppContent = () => {

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
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HistoryProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HistoryProvider>
  );
}

export default App;