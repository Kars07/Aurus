import { Plus, ShieldAlert, Clock, Mic, Sparkles, AlertCircle, Trash2 } from "lucide-react";
import CalendarView from '../dashboard/CalendarView'
import UpcomingSchedule from '../dashboard/UpcomingSchedule'
import { Link } from "react-router-dom";

const RightSidebar = () => {
  return (
    <aside className="h-full bg-white border-l border-slate-200 flex flex-col w-full text-slate-800">
      {/* Header section with profile */}
      <div className="px-6 py-4 flex items-center justify-end space-x-4 flex-shrink-0 border-b border-slate-100 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-200">
          <img src="patient-1.jpg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <Link to="/appointments" className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center cursor-pointer transition-colors">
          <Plus className="w-5 h-5 text-[#3835AC]" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-6">
        <CalendarView />
        <div className="mt-8">
            <UpcomingSchedule />
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar;
