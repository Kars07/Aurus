import Header from './components/layout/Header'
import LeftSidebar from './components/layout/LeftSidebar'
import RightSidebar from './components/layout/RightSidebar'
import DashboardMainContent from './components/layout/DashboardMainContent'
import AegisOverlay from './components/dashboard/AegisOverlay'
import './App.css'
import { HistoryProvider } from './context/HistoryContext';
import Sidebar from './components/layout/LeftSidebar'; // Assuming LeftSidebar is renamed or replaced by Sidebar

const App = () => {
  return (
    <HistoryProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <AegisOverlay />
        {/* Left Sidebar with scrolling */}
        <div className="overflow-auto scrollbar-hide">
          <Sidebar />
        </div>

        {/* Main content area with header and dashboard - 50% */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          
          {/* Dashboard main content with scrolling */}
          <div className="flex-1 overflow-auto scrollbar-hide">
            <DashboardMainContent />
          </div>
        </div>

        {/* Right sidebar - 50% width, full height covering header area */}
        <div className="flex-1 min-w-0 overflow-auto scrollbar-hide border-l border-gray-200">
          <RightSidebar />
        </div>
      </div>
    </HistoryProvider>
  );
}

export default App