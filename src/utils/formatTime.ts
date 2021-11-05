import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import compareAsc from 'date-fns/compareAsc'
import differenceInSeconds from 'date-fns/differenceInSeconds'

export const getDateTypeValue = (timestamp): Date | null => {
  if (timestamp) {
    return fromUnixTime(timestamp)
  }

  return null
}

export const getUtcDateString = (timestamp): string | null => {
  if (timestamp) {
    const dateIsoFormatted = parseISO(fromUnixTime(timestamp).toISOString())
    const dateWithOffset = new Date(
      dateIsoFormatted.getUTCFullYear(),
      dateIsoFormatted.getUTCMonth(),
      dateIsoFormatted.getUTCDate(),
      dateIsoFormatted.getUTCHours(),
      dateIsoFormatted.getUTCMinutes(),
      dateIsoFormatted.getUTCSeconds(),
    )
    return `${format(dateWithOffset, 'MMM dd yyyy HH:mm:ss')} UTC`
  }

  return null
}

export const formatDateTime = (timestamp, formatType = 'yyyy-MM-dd'): string | null => {
  if (timestamp) {
    return format(fromUnixTime(timestamp), formatType)
  }

  return null
}

// If function return true: current date > timestamp
export const compareWithCurrentDateTime = (timestamp): boolean => {
  if (timestamp) {
    const result = compareAsc(new Date(), fromUnixTime(timestamp))

    if (result === 1) {
      return true
    }
  }

  return false
}

export const compareTwoTimestamp = (timestamp1, timestamp2): boolean => {
  if (timestamp1 && timestamp2) {
    const result = compareAsc(fromUnixTime(timestamp1), fromUnixTime(timestamp2))

    if (result === 1) {
      return true
    }

    return false
  }

  return false
}

export const differenceInSecond = (date1: Date, date2: Date): number => {
  if (date1 && date2) {
    return differenceInSeconds(date1, date2)
  }

  return null
}

export const timestampAndCurrentDifference = (timestamp) => {
  if (timestamp) {
    return differenceInSecond(getDateTypeValue(timestamp), new Date())
  }

  return null
}
