import { Plus } from "lucide-react";
import CalendarView from '../dashboard/CalendarView'
import UpcomingSchedule from '../dashboard/UpcomingSchedule'

const RightSidebar = () => {
  return (
    <aside className="h-full bg-[#F6FAFF] flex flex-col">
      {/* Header section with profile */}
      <div className="px-6 py-4 flex items-center justify-end space-x-4 flex-shrink-0">
        <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">👨‍🦱</span>
        </div>
        <div className="w-10 h-10 bg-[#3835AC] rounded-full flex items-center justify-center cursor-pointer">
          <Plus className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Calender + Upcoming Schedule */}
      <div className="p-4 flex-grow overflow-hidden flex flex-col">
        <div className="flex-grow overflow-auto scrollbar-hide">
          <CalendarView />
          <UpcomingSchedule />
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar