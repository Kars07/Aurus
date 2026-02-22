import React, { createContext, useContext, useState, useEffect } from 'react';
import { doctorPatients } from '../data/doctorData';

const DoctorContext = createContext();
export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Load base patient profiles (with mock metadata + messages)
    let basePatients;
    const savedPatients = localStorage.getItem('auris_doctor_patients');
    if (savedPatients) {
      try { basePatients = JSON.parse(savedPatients); }
      catch { basePatients = doctorPatients; }
    } else {
      basePatients = doctorPatients;
    }

    // Load real AI-generated reports from auris_history
    const realReports = [];
    const savedHistory = localStorage.getItem('auris_history');
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        history
          .filter(e => e.type === 'snapshot' && e.data)
          .forEach((entry, i) => {
            realReports.push({
              id: `real_${entry.id || i}`,
              name: 'Your Patient',           // The user is patient
              age: '—',
              avatar: '/patient-1.jpg',
              condition: 'Logged via Auris App',
              conditionTag: 'AI Report',
              conditionColor: 'bg-cyan-100 text-cyan-700',
              reportDate: entry.timestamp
                ? new Date(entry.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                : 'Recent',
              reportStatus: 'unread',
              riskLevel: 'See Report',
              riskColor: 'bg-cyan-100 text-cyan-700',
              report: {
                hpi:        entry.data?.patient_status?.hpi        || entry.data?.hpi || '—',
                assessment: entry.data?.prevention_flags           || [],
                plan:       (entry.data?.patient_status?.plan || '').split('\n').filter(Boolean),
                suggestedQuestions: entry.data?.patient_questions_for_doctor || [],
                aurisInsight: entry.data?.patient_status?.assessment || entry.data?.assessment || 'AI-generated clinical summary.',
                // raw data in case portal wants to render extra fields
                raw: entry.data,
              },
              messages: [],
              _isRealReport: true,
            });
          });
      } catch (e) {
        console.error('Failed to parse auris_history', e);
      }
    }

    // Real reports go first (newest first), then mock patients
    const merged = [...realReports, ...basePatients];
    setPatients(merged);

    // Persist mock patients (not real reports, they live in auris_history already)
    localStorage.setItem('auris_doctor_patients', JSON.stringify(basePatients));
  }, []);

  const save = (updated) => {
    setPatients(updated);
    // Only persist the non-real-report entries
    const toSave = updated.filter(p => !p._isRealReport);
    localStorage.setItem('auris_doctor_patients', JSON.stringify(toSave));
  };

  const sendMessage = (patientId, text) => {
    const updated = patients.map(p => {
      if (p.id !== patientId) return p;
      const newMsg = {
        id: Date.now(),
        from: 'doctor',
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      };
      return { ...p, messages: [...(p.messages || []), newMsg] };
    });
    save(updated);
  };

  const markReportRead = (patientId) => {
    const updated = patients.map(p =>
      p.id === patientId ? { ...p, reportStatus: 'read' } : p
    );
    save(updated);
  };

  return (
    <DoctorContext.Provider value={{ patients, sendMessage, markReportRead }}>
      {children}
    </DoctorContext.Provider>
  );
};
