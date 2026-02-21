import Header from './components/layout/Header'
import Sidebar from './components/layout/LeftSidebar'
import RightSidebar from './components/layout/RightSidebar'
import DashboardMainContent from './components/layout/DashboardMainContent'
import AegisOverlay from './components/dashboard/AegisOverlay'
import './App.css'
import { HistoryProvider } from './context/HistoryContext';

const App = () => {
  return (
    <HistoryProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#0B0F19] text-slate-200">
        <AegisOverlay />
        
        {/* Left Sidebar (fixed width) */}
        <div className="w-64 flex-shrink-0 overflow-y-auto scrollbar-hide border-r border-slate-800 hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content Area (flexes to fill remaining space) */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
          <Header />
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <DashboardMainContent />
          </div>
        </div>

        {/* Right Sidebar (fixed width) */}
        <div className="w-80 lg:w-96 flex-shrink-0 overflow-y-auto scrollbar-hide border-l border-slate-800 hidden xl:block shadow-2xl">
          <RightSidebar />
        </div>
      </div>
    </HistoryProvider>
  );
}

export default App;