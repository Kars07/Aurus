import { useState } from 'react';
import { Plus, FileText, Clock, Mic, Sparkles, AlertCircle, Trash2 } from "lucide-react";
import CalendarView from '../dashboard/CalendarView'
import UpcomingSchedule from '../dashboard/UpcomingSchedule'
import DoctorSnapshotModal from '../dashboard/DoctorSnapshotModal';
import { useHistory } from '../../context/HistoryContext';

const RightSidebar = () => {
  const [isSnapshotOpen, setIsSnapshotOpen] = useState(false);
  const { history, clearHistory } = useHistory();

  const renderHistoryItem = (item) => {
    const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (item.type === 'journal') {
      return (
        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3 animate-in fade-in slide-in-from-right-2">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{time}</span>
          </div>
          <p className="text-sm text-gray-800 font-medium mb-3 italic">"{item.transcript}"</p>
          <div className="bg-cyan-50 border-l-2 border-cyan-400 p-2 rounded-r">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3 h-3 text-cyan-600" />
              <span className="text-xs font-bold text-cyan-800">Nudge</span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{item.nudge}</p>
          </div>
        </div>
      );
    }
    
    if (item.type === 'snapshot') {
      return (
        <div key={item.id} className="bg-[#3835AC]/5 p-4 rounded-xl shadow-sm border border-[#3835AC]/20 mb-3 animate-in fade-in slide-in-from-right-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#3835AC]" />
              <span className="text-xs font-bold text-[#3835AC] uppercase tracking-wider">Clinical Snapshot</span>
            </div>
            <span className="text-xs font-semibold text-gray-500">{time}</span>
          </div>
          <p className="text-sm text-gray-800 font-medium mb-2">{item.data?.patient_status?.assessment || "Assessment unavailable."}</p>
          {item.data?.prevention_flags?.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-semibold bg-amber-50 px-2 py-1 rounded w-fit">
              <AlertCircle className="w-3 h-3" />
              {item.data.prevention_flags.length} Flags Generated
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      <aside className="h-full bg-[#F6FAFF] flex flex-col w-full">
        {/* Header section with profile */}
        <div className="px-6 py-4 flex items-center justify-end space-x-4 flex-shrink-0">
          <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold flex items-center justify-center pt-1" style={{ fontSize: '1.25rem' }}>🧑‍🦽</span>
          </div>
          <div className="w-10 h-10 bg-[#3835AC] rounded-full flex items-center justify-center cursor-pointer">
            <Plus className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Doctor Snapshot Generator Button */}
        <div className="px-5 pb-5 flex-shrink-0">
          <button 
            onClick={() => setIsSnapshotOpen(true)}
            className="w-full bg-[#3835AC] hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg translate-y-0 hover:-translate-y-0.5"
          >
            <FileText className="w-5 h-5" />
            Generate Doctor Snapshot
          </button>
        </div>

        {/* Main Scrolling Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-6">
          
          {/* Timeline / History Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-800">Today's Timeline</h3>
              </div>
              {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                  title="Clear History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex flex-col">
              {history.length === 0 ? (
                <div className="text-center py-6 px-4 bg-gray-50 rounded-xl border border-gray-100 border-dashed">
                  <p className="text-sm text-gray-500 font-medium">No activity yet today.</p>
                  <p className="text-xs text-gray-400 mt-1">Logs and snapshots will appear here.</p>
                </div>
              ) : (
                history.map(renderHistoryItem)
              )}
            </div>
          </div>

          <div className="space-y-6">
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