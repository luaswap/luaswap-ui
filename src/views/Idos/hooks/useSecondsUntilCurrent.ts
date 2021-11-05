import { useEffect, useState } from 'react'
import { timestampAndCurrentDifference } from 'utils/formatTime'
import useInterval from './useInterval'

/**
 * Counting how many seconds left until specific seconds
 */
const useSecondsUntilCurrent = (seconds) => {
  const [numberOfSeconds, setNumberOfSeconds] = useState(seconds)

  useEffect(() => {
    setNumberOfSeconds(seconds)
  }, [seconds])

  useInterval(() => {
    const newSeconds = numberOfSeconds - 1
    if (newSeconds >= 0) {
      setNumberOfSeconds(newSeconds)
    }
  }, 1000)
  return numberOfSeconds
}

/**
 * Counting how many seconds left until specific timestamp
 */
export const useSecondsUtilTimestamp = (timestamp) => {
  const [numberOfSeconds, setNumberOfSeconds] = useState(timestampAndCurrentDifference(timestamp))

  useEffect(() => {
    setNumberOfSeconds(timestampAndCurrentDifference(timestamp))
  }, [timestamp])

  useInterval(() => {
    const newSeconds = numberOfSeconds - 1
    if (newSeconds >= 0) {
      setNumberOfSeconds(newSeconds)
    }
  }, 1000)
  return numberOfSeconds
}

export default useSecondsUntilCurrent
