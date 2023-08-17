import { Dayjs } from 'dayjs'

export const getTimeDifference = (timeStartSpin: Dayjs, timeStopSpin: Dayjs) => {
  return timeStopSpin.diff(timeStartSpin, 'seconds')
}
