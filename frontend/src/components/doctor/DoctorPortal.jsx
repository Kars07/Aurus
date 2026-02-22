import React, { useState, useRef, useEffect } from 'react';
import {
  Stethoscope, MessageSquare, FileText, Send, CheckCircle2,
  AlertCircle, AlertTriangle, ChevronRight, BrainCircuit, Sparkles,
  Clock, User
} from 'lucide-react';
import { useDoctor } from '../../context/DoctorContext';

// ────────────────────────────────────────────────────────────────────────────
// Patient Card (left sidebar)
// ────────────────────────────────────────────────────────────────────────────
const PatientCard = ({ patient, isSelected, onClick }) => {
  const msgs = patient.messages || [];
  const unread = patient.reportStatus === 'unread' || msgs.some(m => m.from === 'patient' && !m.read);
  const isAiReport = patient._isRealReport;
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-3 ${
        isSelected
          ? 'bg-[#3835AC] text-white shadow-lg shadow-indigo-200'
          : 'bg-white hover:bg-indigo-50 border border-slate-200'
      }`}
    >
      <img src={patient.avatar} alt={patient.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0 border-2 border-white/30" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <p className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>{patient.name}</p>
          {unread && <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 flex-shrink-0" />}
        </div>
        <p className={`text-xs truncate mt-0.5 ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>{patient.condition}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            isSelected ? 'bg-white/20 text-white' : patient.conditionColor
          }`}>{patient.conditionTag}</span>
          {isAiReport ? (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              isSelected ? 'bg-cyan-400/30 text-white' : 'bg-cyan-50 text-cyan-700'
            }`}>✦ Live AI Report</span>
          ) : (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              isSelected ? 'bg-white/20 text-white' : patient.riskColor
            }`}>{patient.riskLevel} Risk</span>
          )}
        </div>
      </div>
    </button>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Report Viewer
// ────────────────────────────────────────────────────────────────────────────
const ReportViewer = ({ patient }) => {
  const { markReportRead } = useDoctor();

  useEffect(() => {
    if (patient.reportStatus === 'unread') markReportRead(patient.id);
  }, [patient.id]);

  const { report } = patient;

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-1 scrollbar-hide">

      {/* Auris AI Banner */}
      <div className="bg-gradient-to-r from-[#3835AC] to-indigo-500 rounded-2xl p-5 text-white flex gap-4 items-start">
        <div className="p-2.5 bg-white/20 rounded-xl flex-shrink-0">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span className="text-xs font-bold text-cyan-200 uppercase tracking-widest">Auris AI Insight</span>
          </div>
          <p className="text-sm text-indigo-100 leading-relaxed">{report.aurisInsight}</p>
        </div>
      </div>

      {/* HPI */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">History of Present Illness</h3>
        <p className="text-slate-700 text-sm leading-relaxed">{report.hpi}</p>
      </section>

      {/* Objective (real reports only) */}
      {report.raw?.patient_status?.objective && (
        <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Objective / Telemetry</h3>
          <p className="text-slate-700 text-sm leading-relaxed">{report.raw.patient_status.objective}</p>
        </section>
      )}

      {/* Assessment */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Assessment</h3>
        <ul className="space-y-2.5">
          {report.assessment.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Plan */}
      <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Clinical Plan</h3>
        <ul className="space-y-2.5">
          {report.plan.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Suggested Questions */}
      <section className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
        <h3 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> AI-Suggested Questions
        </h3>
        <ul className="space-y-2">
          {report.suggestedQuestions.map((q, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-indigo-700">
              <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5 text-indigo-400" />
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Doctor Messenger
// ────────────────────────────────────────────────────────────────────────────
const DoctorMessenger = ({ patient }) => {
  const { sendMessage } = useDoctor();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [patient.messages]);

  const msgs = patient.messages || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(patient.id, input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide space-y-4 mb-4">
        {msgs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
            <MessageSquare className="w-10 h-10 mb-3 text-slate-300" />
            <p className="text-sm font-medium text-slate-400">No messages yet.<br/>Send one to start the conversation.</p>
          </div>
        ) : msgs.map((msg) => {
          const isDoctor = msg.from === 'doctor';
          return (
            <div key={msg.id} className={`flex gap-3 ${isDoctor ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {isDoctor
                ? <div className="w-8 h-8 rounded-full bg-[#3835AC] flex items-center justify-center flex-shrink-0">
                    <Stethoscope className="w-4 h-4 text-white" />
                  </div>
                : <img src={patient.avatar} alt={patient.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
              }
              <div className={`max-w-[75%] flex flex-col ${isDoctor ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  isDoctor
                    ? 'bg-[#3835AC] text-white rounded-tr-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{msg.time} · {msg.date}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-3 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`Message ${patient.name.split(' ')[0]}...`}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3835AC]/50 focus:border-[#3835AC] shadow-sm"
        />
        <button
          type="submit"
          className="px-4 py-3 bg-[#3835AC] text-white rounded-xl hover:bg-indigo-800 transition-colors shadow-sm flex items-center gap-2 font-bold text-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────────────────
// Main Doctor Portal Page
// ────────────────────────────────────────────────────────────────────────────
const DoctorPortal = () => {
  const { patients } = useDoctor();
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('report');

  const selectedPatient = patients.find(p => p.id === selectedId) || patients[0];

  const handleSelectPatient = (id) => {
    setSelectedId(id);
    setActiveTab('report');
  };

  const unreadCount = patients.filter(p => p.reportStatus === 'unread').length;

  return (
    <main className="flex-1 overflow-hidden min-h-full bg-[#F6FAFF] text-slate-800 flex flex-col">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <Stethoscope className="w-6 h-6 text-[#3835AC]" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Doctor Portal</h1>
            <p className="text-xs text-slate-400 font-medium">Dr. Chambers · Auris Clinical Network</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="text-xs font-bold bg-rose-500 text-white px-3 py-1.5 rounded-full">
              {unreadCount} Unread Report{unreadCount > 1 ? 's' : ''}
            </span>
          )}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-200">
            <img src="https://randomuser.me/api/portraits/men/40.jpg" alt="Doctor" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden gap-0">

        {/* Left: Patient List */}
        <div className="w-72 flex-shrink-0 bg-[#F6FAFF] border-r border-slate-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex-shrink-0">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Patient Reports ({patients.length})</p>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3">
            {patients.map(p => (
              <PatientCard
                key={p.id}
                patient={p}
                isSelected={selectedPatient?.id === p.id}
                onClick={() => handleSelectPatient(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Right: Detail Panel */}
        {selectedPatient && (
          <div className="flex-1 overflow-hidden flex flex-col bg-[#F6FAFF]">

            {/* Patient Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0 flex items-center gap-4">
              <img src={selectedPatient.avatar} alt={selectedPatient.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200" />
              <div className="flex-1">
                <h2 className="font-black text-slate-900 text-lg">{selectedPatient.name}</h2>
                <p className="text-sm text-slate-500">{selectedPatient.condition} · Age {selectedPatient.age}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${selectedPatient.riskColor}`}>
                  <AlertTriangle className="w-3 h-3 inline mr-1" />{selectedPatient.riskLevel} Risk
                </span>
                <span className="text-xs text-slate-400">
                  <Clock className="w-3 h-3 inline mr-1" />Report: {selectedPatient.reportDate}
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 pt-4 flex-shrink-0">
              <button
                onClick={() => setActiveTab('report')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === 'report'
                    ? 'bg-[#3835AC] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-50'
                }`}
              >
                <FileText className="w-4 h-4" /> AI Report
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all relative ${
                  activeTab === 'messages'
                    ? 'bg-[#3835AC] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-indigo-50'
                }`}
              >
                <MessageSquare className="w-4 h-4" /> Messages
                {selectedPatient.messages.length > 0 && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    activeTab === 'messages' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-[#3835AC]'
                  }`}>{selectedPatient.messages.length}</span>
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden px-6 py-4">
              {activeTab === 'report'
                ? <ReportViewer patient={selectedPatient} />
                : <DoctorMessenger patient={selectedPatient} />
              }
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DoctorPortal;
