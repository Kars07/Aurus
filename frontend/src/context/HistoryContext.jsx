import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const HistoryContext = createContext();

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const { token, isAuthenticated, isPatient } = useAuth();

  // Fetch history from MongoDB
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('https://auris-w1og.onrender.com/api/reports', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setHistory(data.reports);
        }
      } catch (err) {
        console.error("Failed to fetch reports from MongoDB", err);
      }
    };

    if (isAuthenticated && isPatient && token) {
      fetchHistory();
    } else if (!isAuthenticated) {
      setHistory([]);
    }
  }, [token, isAuthenticated, isPatient]);

  const addEntry = async (entry) => {
    // Optimistic UI update
    const tempEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => [tempEntry, ...prev]);

    // Save to MongoDB
    if (isAuthenticated && token) {
      try {
        const res = await fetch('https://auris-w1og.onrender.com/api/reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
             type: tempEntry.type || 'snapshot',
             data: tempEntry.data
          })
        });
        
        if (!res.ok) {
          throw new Error('Failed to save report to DB');
        }
        
        // Optionally fetch history again to get real Mongo _id
        const newReport = await res.json();
        setHistory(prev => prev.map(item => item.id === tempEntry.id ? newReport.report : item));

      } catch (e) {
        console.error("Failed to POST history to MongoDB", e);
      }
    }
  };

  const clearHistory = () => {
    setHistory([]);
    // Not actively deleting from DB for safety, just clearing UI state
  };

  return (
    <HistoryContext.Provider value={{ history, addEntry, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
