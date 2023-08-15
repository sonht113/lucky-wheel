import { Dayjs } from 'dayjs'
export const getTimeSpinLuckyWheel = (timeStartSpin: Dayjs, timeStopSpin: Dayjs) => {
  return timeStopSpin.diff(timeStartSpin, 'milliseconds')
}
