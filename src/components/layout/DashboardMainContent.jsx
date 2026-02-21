import AnatomySection from '../dashboard/AnatomySection'
import HealthStatusCards from '../dashboard/HealthStatusCard'
import ActivityFeed from '../dashboard/ActivityFeed'

const DashboardMainContent = () => {
  return (
    <main className="min-h-full bg-white p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          This Week ▼
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex flex-col gap-4">
        {/* Top: Anatomy + HealthStatus + Controls */}
        <div className="grid grid-cols-12 gap-4">
          {/* Anatomy Section */}
          <div className="col-span-8">
            <AnatomySection />
          </div>

          {/* Health Status */}
          <div className="col-span-4 flex flex-col gap-2">
            <HealthStatusCards />

            {/* Details button */}
            <div className="flex justify-end">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Details →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: Activity Feed */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <ActivityFeed />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardMainContent
