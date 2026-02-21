import { useState } from 'react';
import { Plus, ShieldAlert, Clock, Mic, Sparkles, AlertCircle, Trash2 } from "lucide-react";
import CalendarView from '../dashboard/CalendarView'
import UpcomingSchedule from '../dashboard/UpcomingSchedule'
import AdvocateModal from '../dashboard/AdvocateModal';
import { useHistory } from '../../context/HistoryContext';

const RightSidebar = () => {
  const [isAdvocateOpen, setIsAdvocateOpen] = useState(false);
  const { history, clearHistory } = useHistory();

  const renderHistoryItem = (item) => {
    const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (item.type === 'journal') {
      return (
        <div key={item.id} className="bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-700 mb-3 animate-in fade-in slide-in-from-right-2">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{time}</span>
          </div>
          <p className="text-sm text-slate-200 font-medium mb-3 italic">"{item.transcript}"</p>
          <div className="bg-cyan-900/30 border-l-2 border-cyan-400 p-2 rounded-r">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-300">Nudge</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{item.nudge}</p>
          </div>
        </div>
      );
    }
    
    if (item.type === 'snapshot') {
      return (
        <div key={item.id} className="bg-indigo-900/20 p-4 rounded-xl shadow-sm border border-indigo-500/30 mb-3 animate-in fade-in slide-in-from-right-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Advocate Brief</span>
            </div>
            <span className="text-xs font-semibold text-slate-500">{time}</span>
          </div>
          <p className="text-sm text-slate-300 font-medium mb-2">{item.data?.advocate_brief || "Brief unavailable."}</p>
          {item.data?.demanded_tests?.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-rose-300 font-semibold bg-rose-900/30 px-2 py-1 rounded w-fit">
              <AlertCircle className="w-3 h-3" />
              {item.data.demanded_tests.length} Tests Demanded
            </div>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <>
      <aside className="h-full bg-[#0F1423] border-l border-slate-800 flex flex-col w-full text-slate-200">
        {/* Header section with profile */}
        <div className="px-6 py-4 flex items-center justify-end space-x-4 flex-shrink-0 border-b border-slate-800/50 mb-4">
          <div className="w-10 h-10 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold flex items-center justify-center pt-1" style={{ fontSize: '1.25rem' }}>👤</span>
          </div>
          <div className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
            <Plus className="w-5 h-5 text-indigo-400" />
          </div>
        </div>

        {/* Doctor Snapshot Generator Button */}
        <div className="px-5 pb-5 flex-shrink-0">
          <button 
            onClick={() => setIsAdvocateOpen(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-indigo-500/25 translate-y-0 hover:-translate-y-0.5"
          >
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            Prepare Advocate Brief
          </button>
        </div>

        {/* Main Scrolling Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-5 pb-6">
          
          {/* Timeline / History Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white">Today's Timeline</h3>
              </div>
              {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="p-1.5 hover:bg-slate-800 rounded-lg transition-colors text-slate-500 hover:text-rose-400"
                  title="Clear History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex flex-col">
              {history.length === 0 ? (
                <div className="text-center py-6 px-4 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
                  <p className="text-sm text-slate-400 font-medium">No activity yet today.</p>
                  <p className="text-xs text-slate-500 mt-1">Logs and briefs will appear here.</p>
                </div>
              ) : (
                history.map(renderHistoryItem)
              )}
            </div>
          </div>

        </div>
      </aside>

      <AdvocateModal isOpen={isAdvocateOpen} onClose={() => setIsAdvocateOpen(false)} />
    </>
  )
}

export default RightSidebar;