const MINUTE_IN_SECONDS = 60
const HOUR_IN_SECONDS = 3600
export interface TimePeriodType {
  hours: number
  minutes: number
  seconds: number
}
/**
 * Format number of seconds into year, month, day, hour, minute, seconds
 *
 * @param seconds
 */
const getTimePeriods = (seconds: number): TimePeriodType => {
  let delta = Math.abs(seconds)
  const timeLeft = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }

  if (delta >= HOUR_IN_SECONDS) {
    timeLeft.hours = Math.floor(delta / HOUR_IN_SECONDS)
    delta -= timeLeft.hours * HOUR_IN_SECONDS
  }

  if (delta >= MINUTE_IN_SECONDS) {
    timeLeft.minutes = Math.floor(delta / MINUTE_IN_SECONDS)
    delta -= timeLeft.minutes * MINUTE_IN_SECONDS
  }

  timeLeft.seconds = delta

  return timeLeft
}

export default getTimePeriods
