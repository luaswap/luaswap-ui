import { useEffect, useState } from 'react'
import { timestampAndCurrentDifference } from 'utils/formatTime'
import useInterval from './useInterval'

/**
 * Counting how many seconds left until specific timestamp
 */
const useSecondsUntilCurrent = (timestamp) => {
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
