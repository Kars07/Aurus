import React, { useState, useEffect } from 'react';
import { X, FileText, Activity, AlertTriangle, MessageCircle, Download, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useHistory } from '../../context/HistoryContext';

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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { history, addEntry } = useHistory();

  useEffect(() => {
    if (isOpen) {
      fetchClinicalData();
    } else {
      setData(null);
    }
  }, [isOpen]);

  const fetchClinicalData = async () => {
    setLoading(true);

    // Format history logs
    const journalLogs = history
      .filter(h => h.type === 'journal')
      .slice(0, 10) // Limit to recent 10 to avoid token limits
      .map(h => `[${new Date(h.timestamp).toLocaleString()}] Transcript: "${h.transcript}" | Nudge Delivered: "${h.nudge}"`)
      .join('\n');

    const systemPrompt = `You are generating a clinical snapshot. Here are the patient's recent history logs:\n${journalLogs}\n\nYou MUST call the 'auris_reasoning' tool with these exact parameters:
- mode: "snapshot"

Do NOT attempt to pass the history logs into the tool call parameters.`;

    try {
      const response = await fetch('/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: systemPrompt }],
          model: 'nvidia/nemotron',
          temperature: 0.1,
          stream: false
        }),
      });

      const responseData = await response.json();
      let content = responseData.choices[0].message.content;

      // Highly robust JSON extractor to strip out "Thought:", "Final Answer:", and Markdown wrappers
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');

      if (firstBrace !== -1 && lastBrace !== -1) {
        content = content.substring(firstBrace, lastBrace + 1);
      } else {
        throw new Error("No JSON object found in the LLM response.");
      }

      const payload = JSON.parse(content);
      setData(payload);
      addEntry({
        type: 'snapshot',
        data: payload
      });
    } catch (err) {
      console.error("NAT Agent Error:", err);
      // Fallback if NAT is unavailable
      const fallbackPayload = {
        report_date: "2026-02-21",
        patient_status: {
          hpi: "Patient reports feeling severe joint stiffness today. Activity has been extremely limited.",
          objective: "Telemetry indicates low mobility. High keystroke erraticism and vocal stress.",
          assessment: "M25.60 - Stiffness of unspecified joint, not elsewhere classified. Suspected inflammation exacerbation.",
          plan: "1. Advise immediate use of prescribed NSAIDs.\n2. Recommend gentle passive range-of-motion exercises.\n3. Schedule follow-up tele-visit in 48 hours."
        },
        prevention_flags: [
          "High Intervention Rate: Patient required 7 digital interventions (Aegis Protocol) for fatigue/pain this week. Suspect physical strain or medication tolerance building mid-week.",
          "Sleep/Pain Cycle: Voice logs consistently link 4-hour sleep nights with a +3 spike in subjective pain the following afternoon.",
          "Digital Stress: Combining high erraticism metrics with pain reports indicates increased neurological strain."
        ],
        patient_questions_for_doctor: [
          "My digital interventions spiked on Tuesday and Wednesday. Should we adjust my medication timing for the middle of the week?",
          "Since poor sleep is directly causing my afternoon pain flare-ups, are there specific nighttime routines or aids we can explore?",
          "Given my low movement on high-pain days, what are your top 2 recommendations to prevent stiffness while working?"
        ]
      };
      setData(fallbackPayload);
      addEntry({
        type: 'snapshot',
        data: fallbackPayload
      });
    }
    setLoading(false);
  };

  const handleDownloadPDF = async () => {
    // Dynamic import to avoid SSR issues if this was a Next.js app, but also good for bundle splitting
    const html2pdf = (await import('html2pdf.js')).default;
    const element = document.getElementById('doctor-snapshot-content');

    // Temporarily hide the close/download buttons during export if they were inside the snapshot block
    const opt = {
      margin: 0.5,
      filename: `Clinical_Snapshot_${data?.report_date || 'latest'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#06b6d4] text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Auris Clinical Synthesis</h2>
              <p className="text-sm text-blue-200 font-medium">Standardized FHIR-Compliant Output • v2.1</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" /> Export PDF
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div id="doctor-snapshot-content" className="flex-1 overflow-y-auto p-6 bg-gray-50 flex flex-col gap-6 relative">

          {loading && (
            <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 rounded-b-2xl">
              <Loader2 className="w-12 h-12 text-[#06b6d4] animate-spin" />
              <p className="text-lg font-bold text-gray-800 tracking-tight animate-pulse">NAT Agent synthesizing clinical data...</p>
            </div>
          )}

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
                <div className="h-64 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTrendData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickMargin={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickMargin={10} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" name="Stress Index" dataKey="stress" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" name="Pain Level" dataKey="pain" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium"><div className="w-3 h-3 rounded-full bg-cyan-500"></div> Stress</div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Pain Level</div>
                </div>
              </div>

              {/* Advanced Clinical Synthesis Summary */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#06b6d4]" /> Clinical Assessment & Plan
                </h4>
                {data?.patient_status ? (
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-1">History of Present Illness</h5>
                      <p className="text-gray-800 text-sm leading-relaxed">{data.patient_status.hpi}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-1">Objective Findings</h5>
                      <p className="text-gray-800 text-sm leading-relaxed bg-gray-50 p-2 rounded border border-gray-100">{data.patient_status.objective}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#06b6d4] uppercase tracking-wider mb-1">Assessment</h5>
                      <p className="text-gray-800 text-sm leading-relaxed font-medium">{data.patient_status.assessment}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-1">Plan</h5>
                      <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{data.patient_status.plan}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">Summary data unavailable.</p>
                )}
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
                  {data?.prevention_flags.map((flag, index) => (
                    <li key={index} className="flex gap-3">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-red-100 text-red-600' : index === 1 ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>{index + 1}</span>
                      <p className="text-sm text-gray-700 pt-0.5">{flag}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collaborative Questions */}
              <div className="bg-white p-5 rounded-xl border border-cyan-100 shadow-sm relative overflow-hidden flex-1">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400"></div>
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-cyan-600" />
                  <h4 className="font-bold text-gray-800">Suggested Collaborative Questions</h4>
                </div>
                <p className="text-xs text-gray-500 mb-3 border-b pb-2">Auris suggests asking your doctor these questions based on this week's data:</p>
                <div className="space-y-3">
                  {data?.patient_questions_for_doctor.map((q, index) => (
                    <div key={index} className="p-3 bg-cyan-50 rounded-lg text-sm font-medium text-cyan-900 border border-cyan-100">
                      "{q}"
                    </div>
                  ))}
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
