import { useState } from 'react';
import { Plus, FileText } from "lucide-react";
import CalendarView from '../dashboard/CalendarView'
import UpcomingSchedule from '../dashboard/UpcomingSchedule'
import DoctorSnapshotModal from '../dashboard/DoctorSnapshotModal';

const RightSidebar = () => {
  const [isSnapshotOpen, setIsSnapshotOpen] = useState(false);

  return (
    <>
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

        {/* Doctor Snapshot Generator Button */}
        <div className="px-4 pb-4 flex-shrink-0">
          <button 
            onClick={() => setIsSnapshotOpen(true)}
            className="w-full bg-[#3835AC] hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg translate-y-0 hover:-translate-y-0.5"
          >
            <FileText className="w-5 h-5" />
            Generate Doctor Snapshot
          </button>
        </div>

        {/* Calender + Upcoming Schedule */}
        <div className="p-4 flex-grow overflow-hidden flex flex-col">
          <div className="flex-grow overflow-auto scrollbar-hide">
            <CalendarView />
            <UpcomingSchedule />
          </div>
        </div>
      </aside>

      <DoctorSnapshotModal isOpen={isSnapshotOpen} onClose={() => setIsSnapshotOpen(false)} />
    </>
  )
}

export default RightSidebar