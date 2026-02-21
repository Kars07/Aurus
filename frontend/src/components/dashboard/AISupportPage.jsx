import React from 'react';
import { Bot } from 'lucide-react';
import JournalingInput from './JournalingInput';
import HealthDetective from './HealthDetective';
import { Clock, Mic, Sparkles, AlertCircle, Trash2, ShieldAlert } from "lucide-react";
import { useHistory } from '../../context/HistoryContext';

const AISupportPage = () => {
  const { history, clearHistory } = useHistory();

  const renderHistoryItem = (item) => {
    const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (item.type === 'journal') {
      return (
        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-3 animate-in fade-in slide-in-from-right-2">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{time}</span>
          </div>
          <p className="text-sm text-slate-800 font-medium mb-3 italic">"{item.transcript}"</p>
          <div className="bg-cyan-50 border-l-2 border-cyan-400 p-2 rounded-r">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3 h-3 text-cyan-600" />
              <span className="text-xs font-bold text-cyan-800">Nudge</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{item.nudge}</p>
          </div>
        </div>
      );
    }
    
    if (item.type === 'snapshot') {
      return (
        <div key={item.id} className="bg-indigo-50 p-4 rounded-xl shadow-sm border border-indigo-100 mb-3 animate-in fade-in slide-in-from-right-2">
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
    <main className="flex-1 overflow-y-auto min-h-full bg-transparent text-slate-800 flex flex-col">
      <div className="max-w-7xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan-50 rounded-xl">
              <Bot className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black font-display text-slate-900 tracking-tight mb-1">AI Support</h1>
              <p className="text-slate-500 font-medium">Daily Journaling & Health Detective</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area: Journal & Detective */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <JournalingInput />
            <HealthDetective />
          </div>

          {/* Timeline Section */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full max-h-[80vh]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#3835AC]" />
                  <h3 className="font-bold text-slate-800 text-lg">Today's Timeline</h3>
                </div>
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-red-500"
                    title="Clear History"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                {history.length === 0 ? (
                  <div className="text-center py-10 px-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                    <p className="text-slate-500 font-medium">No activity yet today.</p>
                    <p className="text-sm text-slate-400 mt-2">Logs and briefs will appear here.</p>
                  </div>
                ) : (
                  history.map(renderHistoryItem)
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
};

export default AISupportPage;
