import { Stethoscope, Eye, Heart, Brain } from 'lucide-react'

export const upcomingAppointments = [
  {
    id: 1,
    title: 'Health checkup complete',
    time: '11:00 AM',
    day: 'Thursday',
    type: 'checkup',
    icon: Stethoscope,
    color: 'bg-pink-500'
  },
  {
    id: 2,
    title: 'Ophthalmologist',
    time: '14:00 PM',
    day: 'Thursday',
    type: 'specialist',
    icon: Eye,
    color: 'bg-orange-500'
  },
  {
    id: 3,
    title: 'Cardiologist',
    time: '12:00 AM',
    day: 'Saturday',
    type: 'specialist',
    icon: Heart,
    color: 'bg-red-500'
  },
  {
    id: 4,
    title: 'Neurologist',
    time: '16:00 PM',
    day: 'Saturday',
    type: 'specialist',
    icon: Brain,
    color: 'bg-purple-500'
  }
]

export const calendarData = {
  days: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
  dates: [
    [null, null, null, null, null, null, null],
    [25, 26, 27, 28, 29, 30, 31],
  ],
  appointments: {
      25: ['10:00', '11:00', '12:00'],
      26: ['08:00', '09:00', '10:00'],
      27: ['12:00', '—', '13:00'],
      28: ['10:00', '11:00', '—'],
      29: ['15:00', '14:00', '16:00'],
      30: ['12:00', '14:00', '15:00'],
      31: ['09:00', '10:00', '11:00']
    },
  featuredAppointments: [
    {
      title: 'Dentist',
      time: '09:00-11:00',
      doctor: 'Dr Cameron Williamson',
      bgColor: 'bg-[#3835AC]',
      textColor: 'text-white'
    },
    {
      title: 'Physiotherapy Appointment',
      time: '11:00-12:00',
      doctor: 'Dr Kevin Djosesp',
      bgColor: 'bg-[#dde2f9]',
      textColor: 'text-black'
    }
  ]
}