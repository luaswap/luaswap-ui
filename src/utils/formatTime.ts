import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'
import compareAsc from 'date-fns/compareAsc'

export const getDateTypeValue = (timestamp): Date | null => {
  if (timestamp) {
    return fromUnixTime(timestamp)
  }

  return null
}

export const formatDateTime = (timestamp, formatType = 'yyyy-MM-dd'): string | null => {
  if (timestamp) {
    return format(fromUnixTime(timestamp), formatType)
  }

  return null
}

// If function return true: current date < timestamp
export const compareWithCurrentDateTime = (timestamp): boolean => {
  if (timestamp) {
    const result = compareAsc(fromUnixTime(timestamp), new Date())

    if (result === 1) {
      return true
    }
  }

  return false
}
