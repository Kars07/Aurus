import SimpleAppointmentCard from './SimpleAppointmentCard'
import { upcomingAppointments } from '../../data/appointments'

const UpcomingSchedule = () => {
  // Group appointments by day
  const groupedAppointments = upcomingAppointments.reduce((acc, appointment) => {
    if (!acc[appointment.day]) {
      acc[appointment.day] = []
    }
    acc[appointment.day].push(appointment)
    return acc
  }, {})

  return (
    <div className="bg-[#F6FAFF] rounded-2xl p-6 healthcare-card">
      <h3 className="text-xl font-bold text-gray-800 mb-6">The Upcoming Schedule</h3>
      
      <div className="space-y-6">
        {Object.entries(groupedAppointments).map(([day, appointments]) => (
          <div key={day}>
            <p className="text-lg font-medium text-gray-600 mb-3">On {day}</p>
<div className="grid grid-flow-row auto-cols-max grid-cols-2 gap-6 w-fit">
              {appointments.map((appointment) => (
                <SimpleAppointmentCard 
                  key={appointment.id}
                  title={appointment.title}
                  time={appointment.time}
                  icon={appointment.icon}
                  color={appointment.color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpcomingSchedule