import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const DoctorContext = createContext();
export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const { token, isDoctor } = useAuth();

  const fetchRealReports = async () => {
    try {
      const res = await fetch('https://auris-w1og.onrender.com/api/reports', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to fetch DB reports');
      const data = await res.json();

      const realReports = [];
      const reportPromises = data.reports.map(async (entry, i) => {
        if (!entry.data) return null;

        const patientUser = entry.userId || {};
        const bio = patientUser.bioData || {};

        // Fetch messages for this patient
        let messages = [];
        try {
          if (patientUser._id) {
            const mRes = await fetch(`https://auris-w1og.onrender.com/api/messages/${patientUser._id}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const mData = await mRes.json();
            // Map backend messages to UI structure
            messages = (mData.messages || []).map(m => ({
              id: m._id,
              from: m.senderId === patientUser._id ? 'patient' : 'doctor',
              text: m.text,
              time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              date: new Date(m.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
              read: true // Assuming read for simplicity here
            }));
          }
        } catch (e) { console.error("Could not fetch messages for patient:", e) }

        return {
          id: `real_${entry._id || i}`,
          patientId: patientUser._id, // Needed for sending messages later
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
            hpi: entry.data?.patient_status?.hpi || entry.data?.hpi || entry.data?.clinical_history || '—',
            assessment: entry.data?.prevention_flags || entry.data?.demanded_tests || entry.data?.risk_factors || [],
            plan: (entry.data?.patient_status?.plan || entry.data?.script || entry.data?.recommended_actions || '').split('\n').filter(Boolean),
            suggestedQuestions: entry.data?.patient_questions_for_doctor || [],
            aurisInsight: entry.data?.patient_status?.assessment || entry.data?.assessment || entry.data?.advocate_brief || entry.data?.flare_analysis || 'AI-generated clinical summary.',
            raw: entry.data,
          },
          messages,
          _isRealReport: true,
        };
      });

      const resolved = await Promise.all(reportPromises);
      setPatients(resolved.filter(Boolean));

    } catch (err) {
      console.error("Doctor UI failed to fetch mongo reports:", err);
      setPatients([]); // No fallback mock data
    }
  };

  useEffect(() => {
    if (isDoctor && token) {
      fetchRealReports();
    } else {
      setPatients([]); // Clear if not doctor
    }
  }, [token, isDoctor]);

  const sendMessage = async (patientId, text, recordId) => {
    try {
      if (!patientId || patientId.startsWith('real_')) {
        console.error("Critical: Tried sending a message without a valid patient DB ID", patientId);
        return;
      }

      const res = await fetch('https://auris-w1og.onrender.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: patientId,
          text
        })
      });

      if (res.ok) {
        // Refresh completely to grab new chat state
        // Alternatively could optimistically append, but refreshing ensures sync.
        fetchRealReports();
      }
    } catch (e) {
      console.error("Failed to post message", e);
    }
  };

  const markReportRead = (reportId) => {
    const updated = patients.map(p =>
      p.id === reportId ? { ...p, reportStatus: 'read' } : p
    );
    setPatients(updated);
  };

  return (
    <DoctorContext.Provider value={{ patients, sendMessage, markReportRead }}>
      {children}
    </DoctorContext.Provider>
  );
};
