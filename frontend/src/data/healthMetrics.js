import {STATUS_COLORS} from '../utils/constants'

export const healthMetrics = [
  {
    id: 1,
    metric: 'Wheelchair Rolls',
    status: STATUS_COLORS.Healthy,
    progress: 85, // 85% of daily goal
    lastCheckup: 'Today',
    formattedDate: 'Active'
  },
  {
    id: 2,
    metric: 'Sleep Quality',
    status: STATUS_COLORS.Moderate,
    progress: 40, // 4 hours
    lastCheckup: 'Last Night',
    formattedDate: 'Poor'
  },
  {
    id: 3,
    metric: 'Pain Level',
    status: STATUS_COLORS.Critical,
    progress: 80, // 8/10 pain
    lastCheckup: 'Current',
    formattedDate: 'High'
  }
];