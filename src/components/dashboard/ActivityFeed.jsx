import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { activityData } from '../../data/mockData'

const ActivityFeed = () => {
  return (
    <div className="bg-[#F6FAFF] rounded-2xl p-6 healthcare-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Activity</h3>
        <p className="text-sm text-gray-500 mb-6">3 appointments on this week</p>
      </div>
      
      {/* Line Chart using Recharts */}
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={activityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ActivityFeed
