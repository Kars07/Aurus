import React, { createContext, useContext, useState, useEffect } from 'react';
import { doctorPatients } from '../data/doctorData';
import { useAuth } from './AuthContext';

const DoctorContext = createContext();
export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const { token, isDoctor } = useAuth();

  useEffect(() => {
    // 1. Load base patient profiles (with mock metadata + messages)
    let basePatients;
    const savedPatients = localStorage.getItem('auris_doctor_patients');
    if (savedPatients) {
      try { basePatients = JSON.parse(savedPatients); }
      catch { basePatients = doctorPatients; }
    } else {
      basePatients = doctorPatients;
    }

    // 2. Fetch real AI-generated reports from MongoDB across *all* patients
    const fetchRealReports = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/reports', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error('Failed to fetch DB reports');
        const data = await res.json();
        
        const realReports = [];
        data.reports.forEach((entry, i) => {
          if (!entry.data) return;
          
          const patientUser = entry.userId || {};
          const bio = patientUser.bioData || {};
          
          realReports.push({
            id: `real_${entry._id || i}`,
            name: patientUser.name || 'Unknown Patient',
            age: bio.age ? `${bio.age}` : '—',
            avatar: `/patient-${(i % 3) + 1}.jpg`, // Rotate demo avatars
            condition: bio.primaryCondition || 'Logged via Auris App',
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
              raw: entry.data,
            },
            messages: [],
            _isRealReport: true,
          });
        });
        
        // Real reports go first, then mock patients
        const merged = [...realReports, ...basePatients];
        setPatients(merged);

      } catch (err) {
        console.error("Doctor UI failed to fetch mongo reports:", err);
        setPatients(basePatients); // fallback
      }
    };

    if (isDoctor && token) {
      fetchRealReports();
    } else {
      setPatients(basePatients);
    }
  }, [token, isDoctor]);

  const save = (updated) => {
    setPatients(updated);
    // Only persist the non-real-report entries locally
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
