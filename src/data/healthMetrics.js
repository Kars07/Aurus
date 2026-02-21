import { formatDate } from '../utils/dateHelper'
import {STATUS_COLORS} from '../utils/constants'
export const healthMetrics = [
  {
    id: 1,
    organ: 'Lungs',
    status: STATUS_COLORS.Critical,
    progress: 50,
    lastCheckup: '2021-10-16',
    formattedDate: formatDate('2021-10-16', 'short')
  },
  {
    id: 2,
    organ: 'Teeth',
    status: STATUS_COLORS.Healthy,
    progress: 90,
    lastCheckup: '2021-10-16',
    formattedDate: formatDate('2021-10-16', 'short')
  },
  {
    id: 3,
    organ: 'Bone',
    status: STATUS_COLORS.Moderate,
    progress: 35,
    lastCheckup: '2021-10-16',
    formattedDate: formatDate('2021-10-16', 'short')
  }
];