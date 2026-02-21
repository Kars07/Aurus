import React, { useState } from 'react';
import { CalendarRange, Plus, Clock, Activity, FileText, Video, Stethoscope, Trash2 } from 'lucide-react';
import { useAppointments } from '../../context/AppointmentsContext';
import SimpleAppointmentCard from './SimpleAppointmentCard';

const AppointmentsPage = () => {
  const { appointments, addAppointment, removeAppointment } = useAppointments();
  
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    time: '09:00 AM',
    day: 'Monday',
    type: 'checkup',
  });

  const iconMap = {
    checkup: Activity,
    specialist: Stethoscope,
    review: FileText,
    telehealth: Video,
  };

  const colorMap = {
    checkup: 'bg-cyan-500',
    specialist: 'bg-purple-500',
    review: 'bg-[#3835AC]',
    telehealth: 'bg-amber-500',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    addAppointment({
      ...formData,
      color: colorMap[formData.type]
    });
    
    setIsAdding(false);
    setFormData({ title: '', time: '09:00 AM', day: 'Monday', type: 'checkup' });
  };

  // Group by day for display
  const groupedAppointments = appointments.reduce((acc, appointment) => {
    if (!acc[appointment.day]) acc[appointment.day] = [];
    acc[appointment.day].push(appointment);
    return acc;
  }, {});

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <main className="flex-1 overflow-y-auto min-h-full bg-transparent text-slate-800 flex flex-col">
      <div className="max-w-5xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan-50 rounded-xl">
              <CalendarRange className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-3xl font-black font-display text-slate-900 tracking-tight mb-1">Schedule & Appointments</h1>
              <p className="text-slate-500 font-medium">Manage your upcoming healthcare pipeline</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="hidden md:flex flex-row gap-2 text-sm font-bold text-white transition-colors bg-[#3835AC] hover:bg-indigo-800 px-5 py-3 rounded-xl items-center shadow-sm"
          >
            <Plus className="w-4 h-4" />
            {isAdding ? 'Cancel' : 'New Appointment'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main List */}
          <div className="flex-1">
            {isAdding && (
               <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 animate-in fade-in slide-in-from-top-4">
                 <h2 className="text-xl font-bold text-slate-800 mb-4">Add New Appointment</h2>
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                        placeholder="e.g. Physical Therapy"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Day</label>
                        <select 
                          value={formData.day}
                          onChange={(e) => setFormData({...formData, day: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                        >
                          {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                        <select 
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                        >
                          {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Type Categories</label>
                        <div className="flex gap-4">
                          {Object.keys(iconMap).map(type => (
                            <label key={type} className="flex items-center space-x-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="type" 
                                value={type}
                                checked={formData.type === type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="text-[#3835AC] focus:ring-[#3835AC]" 
                              />
                              <span className="text-sm text-slate-700 capitalize">{type}</span>
                            </label>
                          ))}
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                      <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors">Cancel</button>
                      <button type="submit" className="px-6 py-2 bg-[#3835AC] text-white rounded-xl font-bold hover:bg-indigo-800 transition-colors shadow-sm">Save Appointment</button>
                    </div>
                 </form>
               </div>
            )}

            <div className="space-y-8">
              {appointments.length === 0 ? (
                 <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                    <CalendarRange className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-600">No upcoming appointments</h3>
                    <p className="text-slate-500">Your schedule is completely clear.</p>
                 </div>
              ) : (
                daysOfWeek.map(day => {
                  const dayAppointments = groupedAppointments[day];
                  if (!dayAppointments) return null;

                  return (
                    <div key={day} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800">{day}</h3>
                        <span className="text-xs font-semibold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">{dayAppointments.length} Events</span>
                      </div>
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dayAppointments.map(app => (
                          <div key={app.id} className="relative group">
                             <SimpleAppointmentCard 
                              title={app.title}
                              time={app.time}
                              type={app.type}
                              color={app.color || 'bg-slate-500'}
                            />
                            <button 
                              onClick={() => removeAppointment(app.id)}
                              className="absolute -top-2 -right-2 p-1.5 bg-white border border-rose-200 text-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-rose-50 hover:text-rose-600"
                              title="Delete Appointment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default AppointmentsPage;
