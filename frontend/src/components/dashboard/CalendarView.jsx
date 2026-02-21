import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { useAppointments } from "../../context/AppointmentsContext";

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

// Map appointment day strings to JS getDay() offsets (Mon=0 ... Sun=6)
const DAY_STRING_TO_NUM = {
  'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3,
  'Friday': 4, 'Saturday': 5, 'Sunday': 6
};

const CalendarView = () => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed

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
          map[d].push(app.time);
        }
      }
    });
    return map;
  }, [appointments, viewYear, viewMonth]);

  const todayDate = today.getDate();
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

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
          const hasAppointments = date && appointmentsByDate[date];

          return (
            <div
              key={index}
              className={clsx(
                "relative text-center py-2 rounded-xl transition-colors min-h-[2.5rem] flex flex-col items-center justify-start",
                !date && "opacity-0",
                date && "cursor-default",
                isToday && "bg-cyan-500 text-white font-bold shadow-sm",
                !isToday && date && "text-gray-700 hover:bg-gray-100"
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
                          isToday ? "bg-white" : "bg-[#3835AC]"
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

      {/* Upcoming today */}
      {isCurrentMonth && appointmentsByDate[todayDate] && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Today's Slots</p>
          <div className="flex flex-wrap gap-2">
            {appointmentsByDate[todayDate].map((time, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-cyan-500 text-white font-semibold">
                {time}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
