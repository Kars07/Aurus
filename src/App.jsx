import Header from './components/layout/Header'
import LeftSidebar from './components/layout/LeftSidebar'
import RightSidebar from './components/layout/RightSidebar'
import DashboardMainContent from './components/layout/DashboardMainContent'
import './App.css'

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Sidebar with scrolling */}
      <div className="overflow-auto scrollbar-hide">
        <LeftSidebar />
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
  )
}

export default App