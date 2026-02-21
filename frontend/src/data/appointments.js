export const upcomingAppointments = [
  {
    id: 1,
    title: 'Pain Management Follow-up',
    time: '11:00 AM',
    day: 'Thursday',
    type: 'checkup',
    color: 'bg-cyan-500'
  },
  {
    id: 2,
    title: 'Auris Data Review',
    time: '14:00 PM',
    day: 'Thursday',
    type: 'review',
    color: 'bg-[#3835AC]'
  },
  {
    id: 3,
    title: 'Telehealth PT Session',
    time: '12:00 PM',
    day: 'Saturday',
    type: 'telehealth',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Seating Clinic',
    time: '16:00 PM',
    day: 'Saturday',
    type: 'specialist',
    color: 'bg-amber-500'
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
      title: 'Dr. Evans Review',
      time: '09:00-11:00',
      doctor: 'Dr Cameron Williamson',
      bgColor: 'bg-[#3835AC]',
      textColor: 'text-white'
    },
    {
      title: 'Occupational Therapy',
      time: '11:00-12:00',
      doctor: 'Dr Kevin Djosesp',
      bgColor: 'bg-[#dde2f9]',
      textColor: 'text-black'
    }
  ]
}