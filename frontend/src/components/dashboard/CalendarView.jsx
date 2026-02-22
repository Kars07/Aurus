import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useAppointments } from "../../context/AppointmentsContext";

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Map appointment day strings to JS getDay() offsets (Mon=0 ... Sun=6)
const DAY_STRING_TO_NUM = {
  'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3,
  'Friday': 4, 'Saturday': 5, 'Sunday': 6
};

const CalendarView = () => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const { appointments } = useAppointments();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  // Build calendar grid for the current view month
  const calendarDates = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    // getDay() returns 0=Sun, convert to Mon=0
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [viewYear, viewMonth]);

  // Map appointments to dates in this month
  const appointmentsByDate = useMemo(() => {
    const map = {};
    appointments.forEach(app => {
      const dayNum = DAY_STRING_TO_NUM[app.day];
      if (dayNum === undefined) return;

      // Find all dates in this month that fall on this weekday
      for (let d = 1; d <= new Date(viewYear, viewMonth + 1, 0).getDate(); d++) {
        const date = new Date(viewYear, viewMonth, d);
        let dow = date.getDay() - 1;
        if (dow < 0) dow = 6;
        if (dow === dayNum) {
          if (!map[d]) map[d] = [];
          map[d].push(app);
        }
      }
    });
    return map;
  }, [appointments, viewYear, viewMonth]);

  // Use a second map for the selected month to ensure we can show selected date's appointments
  // even if it's different from the currently viewed month, but here we'll just show appointments
  // if the selected date matches the view month/year, or we can compute appointments for the selected date on the fly.
  const selectedDateAppointments = useMemo(() => {
    const apps = [];
    if (!selectedDate) return apps;
    const dateObj = new Date(selectedYear, selectedMonth, selectedDate);
    let dow = dateObj.getDay() - 1;
    if (dow < 0) dow = 6;

    appointments.forEach(app => {
      const dayNum = DAY_STRING_TO_NUM[app.day];
      if (dayNum === dow) {
        apps.push(app);
      }
    });
    return apps;
  }, [appointments, selectedYear, selectedMonth, selectedDate]);

  const todayDate = today.getDate();
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setSelectedMonth(viewMonth);
    setSelectedYear(viewYear);
  };

  return (
    <div className="bg-[#F6FAFF] rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </h3>
        <div className="flex space-x-1">
          <button onClick={prevMonth} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={nextMonth} className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_LABELS.map((day, i) => (
          <div key={i} className="text-center text-xs font-semibold text-gray-400 uppercase py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDates.map((date, index) => {
          const isToday = isCurrentMonth && date === todayDate;
          const isSelected = date === selectedDate && viewMonth === selectedMonth && viewYear === selectedYear;
          const hasAppointments = date && appointmentsByDate[date] && appointmentsByDate[date].length > 0;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(date)}
              className={clsx(
                "relative text-center py-2 rounded-xl transition-colors min-h-[2.5rem] flex flex-col items-center justify-start",
                !date && "opacity-0",
                date && "cursor-pointer",
                isSelected ? "bg-cyan-500 text-white font-bold shadow-sm" :
                  isToday ? "bg-slate-200 text-slate-800 font-bold" :
                    date ? "text-gray-700 hover:bg-gray-100" : ""
              )}
            >
              {date && (
                <>
                  <span className="text-sm font-semibold">{date}</span>
                  {hasAppointments && (
                    <div className="flex gap-0.5 mt-1">
                      {appointmentsByDate[date].slice(0, 3).map((_, i) => (
                        <div key={i} className={clsx(
                          "w-1.5 h-1.5 rounded-full",
                          isSelected ? "bg-white" : "bg-[#06b6d4]"
                        )} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Date Appointments */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
          Appointments for {MONTH_NAMES[selectedMonth]} {selectedDate}, {selectedYear}
        </p>

        {selectedDateAppointments.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {selectedDateAppointments.map((app, i) => (
              <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className={clsx("w-2 h-full min-h-[40px] rounded-full shrink-0", app.color || "bg-cyan-500")} />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{app.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {app.time}
                    </span>
                    <span className="text-xs font-medium text-slate-500 capitalize">
                      {app.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm font-medium text-slate-400">No appointments scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
