import { useState, useEffect } from "react";

const appointmentsMock = [
  { id: 1, type: "Dentist", doctor: "Dr. Cameron Williamson", time: "09:00", duration: "2h", date: "2021-10-26" },
  { id: 2, type: "Physiotherapy", doctor: "Dr. Kevin Djones", time: "11:00", duration: "1h", date: "2021-10-28" },
  { id: 3, type: "Ophthalmologist", time: "14:00", date: "2021-10-28" },
  { id: 4, type: "Cardiologist", time: "12:00", date: "2021-10-30" },
  { id: 5, type: "Neurologist", time: "16:00", date: "2021-10-30" }
];

export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(appointmentsMock);
  }, []);

  return { appointments };
};
