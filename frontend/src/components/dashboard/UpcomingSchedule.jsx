import SimpleAppointmentCard from './SimpleAppointmentCard'
import { useAppointments } from '../../context/AppointmentsContext'

const UpcomingSchedule = () => {
  const { appointments } = useAppointments();

  // Group appointments by day
  const groupedAppointments = appointments.reduce((acc, appointment) => {
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
<div className="flex flex-col gap-4">
              {appointments.map((appointment) => (
                <SimpleAppointmentCard 
                  key={appointment.id}
                  title={appointment.title}
                  time={appointment.time}
                  type={appointment.type}
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