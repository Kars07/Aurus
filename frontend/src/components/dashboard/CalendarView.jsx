import { LuBicepsFlexed } from "react-icons/lu";
import { LiaTeethOpenSolid } from "react-icons/lia";
import { calendarData } from "../../data/appointments";
import clsx from "clsx";

const CalendarView = () => {
  const { days, dates, appointments, featuredAppointments } = calendarData;

  return (
    <div className="bg-[#F6FAFF] rounded-2xl p-6 healthcare-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">October 2021</h3>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            ←
          </button>
          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
            →
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Tuesday Column Highlight Overlay */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-7">
          <div className="col-start-2 col-span-1 bg-[#dde2f9] rounded-2xl opacity-50 -ml-1" />
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6 relative z-10">
          {/* Header Row */}
          {days.map((day, index) => (
            <div key={`header-${index}`} className="text-center py-2">
              <div className="text-xs font-semibold text-gray-500 uppercase">
                {day}
              </div>
            </div>
          ))}

          {/* Calendar Dates */}
          {dates.flat().map((date, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "text-center flex flex-col items-center justify-start",
                  !date ? "text-gray-300" : "text-gray-700"
                )}
              >
                {date ? (
                  <>
                    <div className="text-lg font-bold text-gray-800 mb-2">
                      {date}
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      {appointments[date] &&
                        appointments[date].slice(0, 3).map((time, i) => {
                          const isSelected =
                            (date === 26 && time === "09:00") ||
                            (date === 28 && time === "11:00") ||
                            (date === 30 && time === "12:00") ||
                            (date === 31 && time === "09:00");
                          const isAltSelected =
                            date === 26 &&
                            (time === "08:00" || time === "10:00");

                          return (
                            <div
                              key={i}
                              className={`text-xs px-3 py-2 rounded-2xl text-center border-0 font-medium mb-3 ${
                                isSelected
                                  ? "bg-[#3835AC] text-white"
                                  : isAltSelected
                                  ? " text-gray-600"
                                  : "bg-[#F6FAFF] text-gray-600"
                              }`}
                            >
                              {time}
                            </div>
                          );
                        })}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="flex flex-cols-auto-fit gap-8 w-fit">
        {featuredAppointments.map((appointment, index) => (
          <div
            key={index}
            className={`${appointment.bgColor} ${appointment.textColor} font-semibold rounded-3xl p-4 transition-transform hover:scale-105 w-fit`}
          >
            <div className="flex items-center justify-between mb-2 gap-2">
              <h4 className="font-bold">{appointment.title}</h4>
              {appointment.title === "Dentist" ? (
                <LiaTeethOpenSolid className="w-5 h-5 shrink-0" />
              ) : (
                <LuBicepsFlexed className="w-5 h-5 shrink-0" />
              )}
            </div>
            <p className="text-sm opacity-90">{appointment.time}</p>
            <p className="text-xs opacity-75">{appointment.doctor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
