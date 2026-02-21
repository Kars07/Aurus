import React, { createContext, useContext, useState, useEffect } from 'react';
import { upcomingAppointments } from '../data/appointments';

const AppointmentsContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentsContext);
};

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('auris_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse appointments history", e);
        setAppointments(upcomingAppointments); // Fallback to initial data
      }
    } else {
        // Initialize with default mock data if empty
        setAppointments(upcomingAppointments);
        localStorage.setItem('auris_appointments', JSON.stringify(upcomingAppointments));
    }
  }, []);

  const addAppointment = (newAppointment) => {
    const appointmentToAdd = {
      ...newAppointment,
      id: Date.now(), // Generate a unique ID
    };
    
    setAppointments(prev => {
      const updated = [...prev, appointmentToAdd];
      // Sort chronologically (basic sort for demo)
      updated.sort((a, b) => new Date(`1970/01/01 ${a.time}`) - new Date(`1970/01/01 ${b.time}`));
      localStorage.setItem('auris_appointments', JSON.stringify(updated));
      return updated;
    });
  };

  const removeAppointment = (id) => {
    setAppointments(prev => {
        const updated = prev.filter(app => app.id !== id);
        localStorage.setItem('auris_appointments', JSON.stringify(updated));
        return updated;
    });
  };

  const clearAppointments = () => {
    setAppointments([]);
    localStorage.removeItem('auris_appointments');
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, removeAppointment, clearAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};
