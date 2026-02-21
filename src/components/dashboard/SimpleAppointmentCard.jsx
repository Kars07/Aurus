const SimpleAppointmentCard = ({ title, time, icon: Icon, color = "bg-indigo-600" }) => {
  return (
<div className="bg-[#dde2f9] rounded-3xl p-4 shadow-sm border border-[#dde2f9] inline-flex items-center justify-between gap-4 transition-transform hover:scale-105 healthcare-card w-fit">
      <div>
        <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
        <p className="font-semibold text-gray-500 text-xs mt-1">{time}</p>
      </div>
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center transition-colors`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
    </div>
  )
}

export default SimpleAppointmentCard