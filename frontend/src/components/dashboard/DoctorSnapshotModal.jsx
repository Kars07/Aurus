import React from 'react';
import { X, FileText, Activity, AlertTriangle, MessageCircle, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockTrendData = [
  { day: 'Mon', stress: 3, pain: 4, interventions: 0 },
  { day: 'Tue', stress: 8, pain: 7, interventions: 2 },
  { day: 'Wed', stress: 9, pain: 8, interventions: 3 },
  { day: 'Thu', stress: 4, pain: 5, interventions: 1 },
  { day: 'Fri', stress: 6, pain: 6, interventions: 1 },
  { day: 'Sat', stress: 3, pain: 3, interventions: 0 },
  { day: 'Sun', stress: 2, pain: 2, interventions: 0 },
];

const DoctorSnapshotModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#3835AC] text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">EmpowerLink Clinical Synthesis</h2>
              <p className="text-sm text-blue-200 font-medium">Standardized FHIR-Compliant Output • v2.1</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col gap-6">
          
          {/* Patient Header Block */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Alex Chen</h3>
              <p className="text-gray-500 font-medium mt-1">DOB: 1992-04-12 | ID: #994-EML-22</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Reporting Period</p>
              <p className="text-lg font-bold text-gray-800">Oct 10 - Oct 16, 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Trend & Stats */}
            <div className="flex flex-col gap-6">
              
              {/* Graphical Trend */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-cyan-600" />
                  <h4 className="font-bold text-gray-800">7-Day Biomarker Trend</h4>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" name="Stress Index" dataKey="stress" stroke="#06b6d4" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                      <Line type="monotone" name="Pain Level" dataKey="pain" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium"><div className="w-3 h-3 rounded-full bg-cyan-500"></div> Stress</div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Pain Level</div>
                </div>
              </div>

              {/* Weekly Synthesis Summary */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Weekly Synthesis</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Patient exhibited a sharp increase in digital stress biomarkers (keystroke erraticism & flattened vocal cadence) peaking on Tuesday and Wednesday. The Aegis Protocol autonomously intervened <strong>7 times</strong> this week to prevent severe symptom crashes. Pain levels correlated strongly with high-stress days. Self-reported qualitative data highlights lower back stiffness and poor sleep quality preceding these flare-ups. Activity (wheelchair rolls) remains below the 85% goal on high-pain days.
                </p>
              </div>
            </div>

            {/* Right Column: Flags & Actions */}
            <div className="flex flex-col gap-6">
              
              {/* Clinical Prevention Flags */}
              <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h4 className="font-bold text-gray-800">Top 3 Clinical Prevention Flags</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">1</span>
                    <p className="text-sm text-gray-700"><strong>High Intervention Rate:</strong> Patient required 7 digital interventions (Aegis Protocol) for fatigue/pain this week. Suspect physical strain or medication tolerance building mid-week.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">2</span>
                    <p className="text-sm text-gray-700"><strong>Sleep/Pain Cycle:</strong> Voice logs consistently link 4-hour sleep nights with a +3 spike in subjective pain the following afternoon.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-sm">3</span>
                    <p className="text-sm text-gray-700"><strong>Risk of Pressure Sore:</strong> Combining low wheelchair mobilization metrics with high seated pain reports indicates increased risk.</p>
                  </li>
                </ul>
              </div>

              {/* Collaborative Questions */}
              <div className="bg-white p-5 rounded-xl border border-cyan-100 shadow-sm relative overflow-hidden flex-1">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400"></div>
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-cyan-600" />
                  <h4 className="font-bold text-gray-800">Suggested Collaborative Questions</h4>
                </div>
                <p className="text-xs text-gray-500 mb-3 border-b pb-2">EmpowerLink suggests asking your doctor these questions based on this week's data:</p>
                <div className="space-y-3">
                  <div className="p-3 bg-cyan-50 rounded-lg text-sm font-medium text-cyan-900 border border-cyan-100">
                    "My digital interventions spiked on Tuesday and Wednesday. Should we adjust my medication timing for the middle of the week?"
                  </div>
                  <div className="p-3 bg-cyan-50 rounded-lg text-sm font-medium text-cyan-900 border border-cyan-100">
                    "Since poor sleep is directly causing my afternoon pain flare-ups, are there specific nighttime routines or aids we can explore?"
                  </div>
                  <div className="p-3 bg-cyan-50 rounded-lg text-sm font-medium text-cyan-900 border border-cyan-100">
                    "Given my low movement on high-pain days, what are your top 2 recommendations to prevent pressure sores while working?"
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorSnapshotModal;
